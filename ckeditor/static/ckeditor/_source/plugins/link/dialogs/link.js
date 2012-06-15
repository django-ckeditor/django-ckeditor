﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.dialog.add( 'link', function( editor )
{
	// Handles the event when the "Target" selection box is changed.
	var targetChanged = function()
	{
		var dialog = this.getDialog(),
			popupFeatures = dialog.getContentElement( 'target', 'popupFeatures' ),
			targetName = dialog.getContentElement( 'target', 'linkTargetName' ),
			value = this.getValue();

		if ( !popupFeatures || !targetName )
			return;

		popupFeatures = popupFeatures.getElement();
		popupFeatures.hide();
		targetName.setValue( '' );

		switch ( value )
 		{
			case 'frame' :
				targetName.setLabel( editor.lang.link.targetFrameName );
				targetName.getElement().show();
				break;
			case 'popup' :
				popupFeatures.show();
				targetName.setLabel( editor.lang.link.targetPopupName );
				targetName.getElement().show();
				break;
			default :
				targetName.setValue( value );
				targetName.getElement().hide();
				break;
 		}

	};

	// Handles the event when the "Type" selection box is changed.
	var linkTypeChanged = function()
	{
		var dialog = this.getDialog(),
			partIds = [ 'urlOptions', 'anchorOptions', 'emailOptions' ],
			typeValue = this.getValue(),
			uploadTab = dialog.definition.getContents( 'upload' ),
			uploadInitiallyHidden = uploadTab && uploadTab.hidden;

		if ( typeValue == 'url' )
		{
			if ( editor.config.linkShowTargetTab )
				dialog.showPage( 'target' );
			if ( !uploadInitiallyHidden )
				dialog.showPage( 'upload' );
		}
		else
		{
			dialog.hidePage( 'target' );
			if ( !uploadInitiallyHidden )
				dialog.hidePage( 'upload' );
		}

		for ( var i = 0 ; i < partIds.length ; i++ )
		{
			var element = dialog.getContentElement( 'info', partIds[i] );
			if ( !element )
				continue;

			element = element.getElement().getParent().getParent();
			if ( partIds[i] == typeValue + 'Options' )
				element.show();
			else
				element.hide();
		}
	};

	// Loads the parameters in a selected link to the link dialog fields.
	var javascriptProtocolRegex = /^javascript:/,
		emailRegex = /^mailto:([^?]+)(?:\?(.+))?$/,
		emailSubjectRegex = /subject=([^;?:@&=$,\/]*)/,
		emailBodyRegex = /body=([^;?:@&=$,\/]*)/,
		anchorRegex = /^#(.*)$/,
		urlRegex = /^((?:http|https|ftp|news):\/\/)?(.*)$/,
		selectableTargets = /^(_(?:self|top|parent|blank))$/,
		encodedEmailLinkRegex = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,
		functionCallProtectedEmailLinkRegex = /^javascript:([^(]+)\(([^)]+)\)$/;

	var popupRegex =
		/\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/;
	var popupFeaturesRegex = /(?:^|,)([^=]+)=(\d+|yes|no)/gi;

	var parseLink = function( editor, element )
	{
		var href = element ? ( element.getAttribute( '_cke_saved_href' ) || element.getAttribute( 'href' ) ) : '',
		 	javascriptMatch,
			emailMatch,
			anchorMatch,
			urlMatch,
			retval = {};

		if ( ( javascriptMatch = href.match( javascriptProtocolRegex ) ) )
		{
			if ( emailProtection == 'encode' )
			{
				href = href.replace( encodedEmailLinkRegex,
						function ( match, protectedAddress, rest )
						{
							return 'mailto:' +
							       String.fromCharCode.apply( String, protectedAddress.split( ',' ) ) +
							       ( rest && unescapeSingleQuote( rest ) );
						});
			}
			// Protected email link as function call.
			else if ( emailProtection )
			{
				href.replace( functionCallProtectedEmailLinkRegex, function( match, funcName, funcArgs )
				{
					if ( funcName == compiledProtectionFunction.name )
					{
						retval.type = 'email';
						var email = retval.email = {};

						var paramRegex = /[^,\s]+/g,
							paramQuoteRegex = /(^')|('$)/g,
							paramsMatch = funcArgs.match( paramRegex ),
							paramsMatchLength = paramsMatch.length,
							paramName,
							paramVal;

						for ( var i = 0; i < paramsMatchLength; i++ )
						{
							paramVal = decodeURIComponent( unescapeSingleQuote( paramsMatch[ i ].replace( paramQuoteRegex, '' ) ) );
							paramName = compiledProtectionFunction.params[ i ].toLowerCase();
							email[ paramName ] = paramVal;
						}
						email.address = [ email.name, email.domain ].join( '@' );
					}
				} );
			}
		}

		if ( !retval.type )
		{
			if ( ( anchorMatch = href.match( anchorRegex ) ) )
			{
				retval.type = 'anchor';
				retval.anchor = {};
				retval.anchor.name = retval.anchor.id = anchorMatch[1];
			}
			// Protected email link as encoded string.
			else if ( ( emailMatch = href.match( emailRegex ) ) )
			{
				var subjectMatch = href.match( emailSubjectRegex ),
					bodyMatch = href.match( emailBodyRegex );

				retval.type = 'email';
				var email = ( retval.email = {} );
				email.address = emailMatch[ 1 ];
				subjectMatch && ( email.subject = decodeURIComponent( subjectMatch[ 1 ] ) );
				bodyMatch && ( email.body = decodeURIComponent( bodyMatch[ 1 ] ) );
			}
			// urlRegex matches empty strings, so need to check for href as well.
			else if (  href && ( urlMatch = href.match( urlRegex ) ) )
			{
				retval.type = 'url';
				retval.url = {};
				retval.url.protocol = urlMatch[1];
				retval.url.url = urlMatch[2];
			}
			else
				retval.type = 'url';
		}

		// Load target and popup settings.
		if ( element )
		{
			var target = element.getAttribute( 'target' );
			retval.target = {};
			retval.adv = {};

			// IE BUG: target attribute is an empty string instead of null in IE if it's not set.
			if ( !target )
			{
				var onclick = element.getAttribute( '_cke_pa_onclick' ) || element.getAttribute( 'onclick' ),
					onclickMatch = onclick && onclick.match( popupRegex );
				if ( onclickMatch )
				{
					retval.target.type = 'popup';
					retval.target.name = onclickMatch[1];

					var featureMatch;
					while ( ( featureMatch = popupFeaturesRegex.exec( onclickMatch[2] ) ) )
					{
						if ( featureMatch[2] == 'yes' || featureMatch[2] == '1' )
							retval.target[ featureMatch[1] ] = true;
						else if ( isFinite( featureMatch[2] ) )
							retval.target[ featureMatch[1] ] = featureMatch[2];
					}
				}
			}
			else
			{
				var targetMatch = target.match( selectableTargets );
				if ( targetMatch )
					retval.target.type = retval.target.name = target;
				else
				{
					retval.target.type = 'frame';
					retval.target.name = target;
				}
			}

			var me = this;
			var advAttr = function( inputName, attrName )
			{
				var value = element.getAttribute( attrName );
				if ( value !== null )
					retval.adv[ inputName ] = value || '';
			};
			advAttr( 'advId', 'id' );
			advAttr( 'advLangDir', 'dir' );
			advAttr( 'advAccessKey', 'accessKey' );
			advAttr( 'advName', 'name' );
			advAttr( 'advLangCode', 'lang' );
			advAttr( 'advTabIndex', 'tabindex' );
			advAttr( 'advTitle', 'title' );
			advAttr( 'advContentType', 'type' );
			advAttr( 'advCSSClasses', 'class' );
			advAttr( 'advCharset', 'charset' );
			advAttr( 'advStyles', 'style' );
		}

		// Find out whether we have any anchors in the editor.
		// Get all IMG elements in CK document.
		var elements = editor.document.getElementsByTag( 'img' ),
			realAnchors = new CKEDITOR.dom.nodeList( editor.document.$.anchors ),
			anchors = retval.anchors = [];

		for ( var i = 0; i < elements.count() ; i++ )
		{
			var item = elements.getItem( i );
			if ( item.getAttribute( '_cke_realelement' ) && item.getAttribute( '_cke_real_element_type' ) == 'anchor' )
			{
				anchors.push( editor.restoreRealElement( item ) );
			}
		}

		for ( i = 0 ; i < realAnchors.count() ; i++ )
			anchors.push( realAnchors.getItem( i ) );

		for ( i = 0 ; i < anchors.length ; i++ )
		{
			item = anchors[ i ];
			anchors[ i ] = { name : item.getAttribute( 'name' ), id : item.getAttribute( 'id' ) };
		}

		// Record down the selected element in the dialog.
		this._.selectedElement = element;

		return retval;
	};

	var setupParams = function( page, data )
	{
		if ( data[page] )
			this.setValue( data[page][this.id] || '' );
	};

	var setupPopupParams = function( data )
	{
		return setupParams.call( this, 'target', data );
	};

	var setupAdvParams = function( data )
	{
		return setupParams.call( this, 'adv', data );
	};

	var commitParams = function( page, data )
	{
		if ( !data[page] )
			data[page] = {};

		data[page][this.id] = this.getValue() || '';
	};

	var commitPopupParams = function( data )
	{
		return commitParams.call( this, 'target', data );
	};

	var commitAdvParams = function( data )
	{
		return commitParams.call( this, 'adv', data );
	};

	function unescapeSingleQuote( str )
	{
		return str.replace( /\\'/g, '\'' );
	}

	function escapeSingleQuote( str )
	{
		return str.replace( /'/g, '\\$&' );
	}

	var emailProtection = editor.config.emailProtection || '';

	// Compile the protection function pattern.
	if ( emailProtection && emailProtection != 'encode' )
	{
		var compiledProtectionFunction = {};

		emailProtection.replace( /^([^(]+)\(([^)]+)\)$/, function( match, funcName, params )
		{
			compiledProtectionFunction.name = funcName;
			compiledProtectionFunction.params = [];
			params.replace( /[^,\s]+/g, function( param )
			{
				compiledProtectionFunction.params.push( param );
			} );
		} );
	}

	function protectEmailLinkAsFunction( email )
	{
		var retval,
			name = compiledProtectionFunction.name,
			params = compiledProtectionFunction.params,
			paramName,
			paramValue;

		retval = [ name, '(' ];
		for ( var i = 0; i < params.length; i++ )
		{
			paramName = params[ i ].toLowerCase();
			paramValue = email[ paramName ];

			i > 0 && retval.push( ',' );
			retval.push( '\'',
						 paramValue ?
						 escapeSingleQuote( encodeURIComponent( email[ paramName ] ) )
						 : '',
						 '\'');
		}
		retval.push( ')' );
		return retval.join( '' );
	}

	function protectEmailAddressAsEncodedString( address )
	{
		var charCode,
			length = address.length,
			encodedChars = [];
		for ( var i = 0; i < length; i++ )
		{
			charCode = address.charCodeAt( i );
			encodedChars.push( charCode );
		}
		return 'String.fromCharCode(' + encodedChars.join( ',' ) + ')';
	}

	return {
		title : editor.lang.link.title,
		minWidth : 350,
		minHeight : 230,
		contents : [
			{
				id : 'info',
				label : editor.lang.link.info,
				title : editor.lang.link.info,
				elements :
				[
					{
						id : 'linkType',
						type : 'select',
						label : editor.lang.link.type,
						'default' : 'url',
						items :
						[
							[ editor.lang.link.toUrl, 'url' ],
							[ editor.lang.link.toAnchor, 'anchor' ],
							[ editor.lang.link.toEmail, 'email' ]
						],
						onChange : linkTypeChanged,
						setup : function( data )
						{
							if ( data.type )
								this.setValue( data.type );
						},
						commit : function( data )
						{
							data.type = this.getValue();
						}
					},
					{
						type : 'vbox',
						id : 'urlOptions',
						children :
						[
							{
								type : 'hbox',
								widths : [ '25%', '75%' ],
								children :
								[
									{
										id : 'protocol',
										type : 'select',
										label : editor.lang.common.protocol,
										'default' : 'http://',
										style : 'width : 100%;',
										items :
										[
											[ 'http://' ],
											[ 'https://' ],
											[ 'ftp://' ],
											[ 'news://' ],
											[ '<other>', '' ]
										],
										setup : function( data )
										{
											if ( data.url )
												this.setValue( data.url.protocol || '' );
										},
										commit : function( data )
										{
											if ( !data.url )
												data.url = {};

											data.url.protocol = this.getValue();
										}
									},
									{
										type : 'text',
										id : 'url',
										label : editor.lang.common.url,
										required: true,
										onLoad : function ()
										{
											this.allowOnChange = true;
										},
										onKeyUp : function()
										{
											this.allowOnChange = false;
											var	protocolCmb = this.getDialog().getContentElement( 'info', 'protocol' ),
												url = this.getValue(),
												urlOnChangeProtocol = /^(http|https|ftp|news):\/\/(?=.)/gi,
												urlOnChangeTestOther = /^((javascript:)|[#\/\.])/gi;

											var protocol = urlOnChangeProtocol.exec( url );
											if ( protocol )
											{
												this.setValue( url.substr( protocol[ 0 ].length ) );
												protocolCmb.setValue( protocol[ 0 ].toLowerCase() );
											}
											else if ( urlOnChangeTestOther.test( url ) )
												protocolCmb.setValue( '' );

											this.allowOnChange = true;
										},
										onChange : function()
										{
											if ( this.allowOnChange )		// Dont't call on dialog load.
												this.onKeyUp();
										},
										validate : function()
										{
											var dialog = this.getDialog();

											if ( dialog.getContentElement( 'info', 'linkType' ) &&
													dialog.getValueOf( 'info', 'linkType' ) != 'url' )
												return true;

											if ( this.getDialog().fakeObj )	// Edit Anchor.
												return true;

											var func = CKEDITOR.dialog.validate.notEmpty( editor.lang.link.noUrl );
											return func.apply( this );
										},
										setup : function( data )
										{
											this.allowOnChange = false;
											if ( data.url )
												this.setValue( data.url.url );
											this.allowOnChange = true;

										},
										commit : function( data )
										{
											// IE will not trigger the onChange event if the mouse has been used
											// to carry all the operations #4724
											this.onChange();

											if ( !data.url )
												data.url = {};

											data.url.url = this.getValue();
											this.allowOnChange = false;
										}
									}
								],
								setup : function( data )
								{
									if ( !this.getDialog().getContentElement( 'info', 'linkType' ) )
										this.getElement().show();
								}
							},
							{
								type : 'button',
								id : 'browse',
								hidden : 'true',
								filebrowser : 'info:url',
								label : editor.lang.common.browseServer
							}
						]
					},
					{
						type : 'vbox',
						id : 'anchorOptions',
						width : 260,
						align : 'center',
						padding : 0,
						children :
						[
							{
								type : 'fieldset',
								id : 'selectAnchorText',
								label : editor.lang.link.selectAnchor,
								setup : function( data )
								{
									if ( data.anchors.length > 0 )
										this.getElement().show();
									else
										this.getElement().hide();
								},
								children :
								[
									{
										type : 'hbox',
										id : 'selectAnchor',
										children :
										[
											{
												type : 'select',
												id : 'anchorName',
												'default' : '',
												label : editor.lang.link.anchorName,
												style : 'width: 100%;',
												items :
												[
													[ '' ]
												],
												setup : function( data )
												{
													this.clear();
													this.add( '' );
													for ( var i = 0 ; i < data.anchors.length ; i++ )
													{
														if ( data.anchors[i].name )
															this.add( data.anchors[i].name );
													}

													if ( data.anchor )
														this.setValue( data.anchor.name );

													var linkType = this.getDialog().getContentElement( 'info', 'linkType' );
													if ( linkType && linkType.getValue() == 'email' )
														this.focus();
												},
												commit : function( data )
												{
													if ( !data.anchor )
														data.anchor = {};

													data.anchor.name = this.getValue();
												}
											},
											{
												type : 'select',
												id : 'anchorId',
												'default' : '',
												label : editor.lang.link.anchorId,
												style : 'width: 100%;',
												items :
												[
													[ '' ]
												],
												setup : function( data )
												{
													this.clear();
													this.add( '' );
													for ( var i = 0 ; i < data.anchors.length ; i++ )
													{
														if ( data.anchors[i].id )
															this.add( data.anchors[i].id );
													}

													if ( data.anchor )
														this.setValue( data.anchor.id );
												},
												commit : function( data )
												{
													if ( !data.anchor )
														data.anchor = {};

													data.anchor.id = this.getValue();
												}
											}
										],
										setup : function( data )
										{
											if ( data.anchors.length > 0 )
												this.getElement().show();
											else
												this.getElement().hide();
										}
									}
								]
							},
							{
								type : 'html',
								id : 'noAnchors',
								style : 'text-align: center;',
								html : '<div role="label" tabIndex="-1">' + CKEDITOR.tools.htmlEncode( editor.lang.link.noAnchors ) + '</div>',
								// Focus the first element defined in above html.
								focus : true,
								setup : function( data )
								{
									if ( data.anchors.length < 1 )
										this.getElement().show();
									else
										this.getElement().hide();
								}
							}
						],
						setup : function( data )
						{
							if ( !this.getDialog().getContentElement( 'info', 'linkType' ) )
								this.getElement().hide();
						}
					},
					{
						type :  'vbox',
						id : 'emailOptions',
						padding : 1,
						children :
						[
							{
								type : 'text',
								id : 'emailAddress',
								label : editor.lang.link.emailAddress,
								required : true,
								validate : function()
								{
									var dialog = this.getDialog();

									if ( !dialog.getContentElement( 'info', 'linkType' ) ||
											dialog.getValueOf( 'info', 'linkType' ) != 'email' )
										return true;

									var func = CKEDITOR.dialog.validate.notEmpty( editor.lang.link.noEmail );
									return func.apply( this );
								},
								setup : function( data )
								{
									if ( data.email )
										this.setValue( data.email.address );

									var linkType = this.getDialog().getContentElement( 'info', 'linkType' );
									if ( linkType && linkType.getValue() == 'email' )
										this.select();
								},
								commit : function( data )
								{
									if ( !data.email )
										data.email = {};

									data.email.address = this.getValue();
								}
							},
							{
								type : 'text',
								id : 'emailSubject',
								label : editor.lang.link.emailSubject,
								setup : function( data )
								{
									if ( data.email )
										this.setValue( data.email.subject );
								},
								commit : function( data )
								{
									if ( !data.email )
										data.email = {};

									data.email.subject = this.getValue();
								}
							},
							{
								type : 'textarea',
								id : 'emailBody',
								label : editor.lang.link.emailBody,
								rows : 3,
								'default' : '',
								setup : function( data )
								{
									if ( data.email )
										this.setValue( data.email.body );
								},
								commit : function( data )
								{
									if ( !data.email )
										data.email = {};

									data.email.body = this.getValue();
								}
							}
						],
						setup : function( data )
						{
							if ( !this.getDialog().getContentElement( 'info', 'linkType' ) )
								this.getElement().hide();
						}
					}
				]
			},
			{
				id : 'target',
				label : editor.lang.link.target,
				title : editor.lang.link.target,
				elements :
				[
					{
						type : 'hbox',
						widths : [ '50%', '50%' ],
						children :
						[
							{
								type : 'select',
								id : 'linkTargetType',
								label : editor.lang.common.target,
								'default' : 'notSet',
								style : 'width : 100%;',
								'items' :
								[
									[ editor.lang.common.notSet, 'notSet' ],
									[ editor.lang.link.targetFrame, 'frame' ],
									[ editor.lang.link.targetPopup, 'popup' ],
									[ editor.lang.common.targetNew, '_blank' ],
									[ editor.lang.common.targetTop, '_top' ],
									[ editor.lang.common.targetSelf, '_self' ],
									[ editor.lang.common.targetParent, '_parent' ]
								],
								onChange : targetChanged,
								setup : function( data )
								{
									if ( data.target )
										this.setValue( data.target.type );
								},
								commit : function( data )
								{
									if ( !data.target )
										data.target = {};

									data.target.type = this.getValue();
								}
							},
							{
								type : 'text',
								id : 'linkTargetName',
								label : editor.lang.link.targetFrameName,
								'default' : '',
								setup : function( data )
								{
									if ( data.target )
										this.setValue( data.target.name );
								},
								commit : function( data )
								{
									if ( !data.target )
										data.target = {};

									data.target.name = this.getValue();
								}
							}
						]
					},
					{
						type : 'vbox',
						width : 260,
						align : 'center',
						padding : 2,
						id : 'popupFeatures',
						children :
						[
							{
								type : 'fieldset',
								label : editor.lang.link.popupFeatures,
								children :
								[
									{
										type : 'hbox',
										children :
										[
											{
												type : 'checkbox',
												id : 'resizable',
												label : editor.lang.link.popupResizable,
												setup : setupPopupParams,
												commit : commitPopupParams
											},
											{
												type : 'checkbox',
												id : 'status',
												label : editor.lang.link.popupStatusBar,
												setup : setupPopupParams,
												commit : commitPopupParams

											}
										]
									},
									{
										type : 'hbox',
										children :
										[
											{
												type : 'checkbox',
												id : 'location',
												label : editor.lang.link.popupLocationBar,
												setup : setupPopupParams,
												commit : commitPopupParams

											},
											{
												type : 'checkbox',
												id : 'toolbar',
												label : editor.lang.link.popupToolbar,
												setup : setupPopupParams,
												commit : commitPopupParams

											}
										]
									},
									{
										type : 'hbox',
										children :
										[
											{
												type : 'checkbox',
												id : 'menubar',
												label : editor.lang.link.popupMenuBar,
												setup : setupPopupParams,
												commit : commitPopupParams

											},
											{
												type : 'checkbox',
												id : 'fullscreen',
												label : editor.lang.link.popupFullScreen,
												setup : setupPopupParams,
												commit : commitPopupParams

											}
										]
									},
									{
										type : 'hbox',
										children :
										[
											{
												type : 'checkbox',
												id : 'scrollbars',
												label : editor.lang.link.popupScrollBars,
												setup : setupPopupParams,
												commit : commitPopupParams

											},
											{
												type : 'checkbox',
												id : 'dependent',
												label : editor.lang.link.popupDependent,
												setup : setupPopupParams,
												commit : commitPopupParams

											}
										]
									},
									{
										type : 'hbox',
										children :
										[
											{
												type :  'text',
												widths : [ '30%', '70%' ],
												labelLayout : 'horizontal',
												label : editor.lang.link.popupWidth,
												id : 'width',
												setup : setupPopupParams,
												commit : commitPopupParams

											},
											{
												type :  'text',
												labelLayout : 'horizontal',
												widths : [ '55%', '45%' ],
												label : editor.lang.link.popupLeft,
												id : 'left',
												setup : setupPopupParams,
												commit : commitPopupParams

											}
										]
									},
									{
										type : 'hbox',
										children :
										[
											{
												type :  'text',
												labelLayout : 'horizontal',
												widths : [ '30%', '70%' ],
												label : editor.lang.link.popupHeight,
												id : 'height',
												setup : setupPopupParams,
												commit : commitPopupParams

											},
											{
												type :  'text',
												labelLayout : 'horizontal',
												label : editor.lang.link.popupTop,
												widths : [ '55%', '45%' ],
												id : 'top',
												setup : setupPopupParams,
												commit : commitPopupParams

											}
										]
									}
								]
							}
						]
					}
				]
			},
			{
				id : 'upload',
				label : editor.lang.link.upload,
				title : editor.lang.link.upload,
				hidden : true,
				filebrowser : 'uploadButton',
				elements :
				[
					{
						type : 'file',
						id : 'upload',
						label : editor.lang.common.upload,
						style: 'height:40px',
						size : 29
					},
					{
						type : 'fileButton',
						id : 'uploadButton',
						label : editor.lang.common.uploadSubmit,
						filebrowser : 'info:url',
						'for' : [ 'upload', 'upload' ]
					}
				]
			},
			{
				id : 'advanced',
				label : editor.lang.link.advanced,
				title : editor.lang.link.advanced,
				elements :
				[
					{
						type : 'vbox',
						padding : 1,
						children :
						[
							{
								type : 'hbox',
								widths : [ '45%', '35%', '20%' ],
								children :
								[
									{
										type : 'text',
										id : 'advId',
										label : editor.lang.link.id,
										setup : setupAdvParams,
										commit : commitAdvParams
									},
									{
										type : 'select',
										id : 'advLangDir',
										label : editor.lang.link.langDir,
										'default' : '',
										style : 'width:110px',
										items :
										[
											[ editor.lang.common.notSet, '' ],
											[ editor.lang.link.langDirLTR, 'ltr' ],
											[ editor.lang.link.langDirRTL, 'rtl' ]
										],
										setup : setupAdvParams,
										commit : commitAdvParams
									},
									{
										type : 'text',
										id : 'advAccessKey',
										width : '80px',
										label : editor.lang.link.acccessKey,
										maxLength : 1,
										setup : setupAdvParams,
										commit : commitAdvParams

									}
								]
							},
							{
								type : 'hbox',
								widths : [ '45%', '35%', '20%' ],
								children :
								[
									{
										type : 'text',
										label : editor.lang.link.name,
										id : 'advName',
										setup : setupAdvParams,
										commit : commitAdvParams

									},
									{
										type : 'text',
										label : editor.lang.link.langCode,
										id : 'advLangCode',
										width : '110px',
										'default' : '',
										setup : setupAdvParams,
										commit : commitAdvParams

									},
									{
										type : 'text',
										label : editor.lang.link.tabIndex,
										id : 'advTabIndex',
										width : '80px',
										maxLength : 5,
										setup : setupAdvParams,
										commit : commitAdvParams

									}
								]
							}
						]
					},
					{
						type : 'vbox',
						padding : 1,
						children :
						[
							{
								type : 'hbox',
								widths : [ '45%', '55%' ],
								children :
								[
									{
										type : 'text',
										label : editor.lang.link.advisoryTitle,
										'default' : '',
										id : 'advTitle',
										setup : setupAdvParams,
										commit : commitAdvParams

									},
									{
										type : 'text',
										label : editor.lang.link.advisoryContentType,
										'default' : '',
										id : 'advContentType',
										setup : setupAdvParams,
										commit : commitAdvParams

									}
								]
							},
							{
								type : 'hbox',
								widths : [ '45%', '55%' ],
								children :
								[
									{
										type : 'text',
										label : editor.lang.link.cssClasses,
										'default' : '',
										id : 'advCSSClasses',
										setup : setupAdvParams,
										commit : commitAdvParams

									},
									{
										type : 'text',
										label : editor.lang.link.charset,
										'default' : '',
										id : 'advCharset',
										setup : setupAdvParams,
										commit : commitAdvParams

									}
								]
							},
							{
								type : 'hbox',
								children :
								[
									{
										type : 'text',
										label : editor.lang.link.styles,
										'default' : '',
										id : 'advStyles',
										setup : setupAdvParams,
										commit : commitAdvParams

									}
								]
							}
						]
					}
				]
			}
		],
		onShow : function()
		{
			this.fakeObj = false;

			var editor = this.getParentEditor(),
				selection = editor.getSelection(),
				ranges = selection.getRanges(),
				element = null,
				me = this;
			// Fill in all the relevant fields if there's already one link selected.
			if ( ranges.length == 1 )
			{

				var rangeRoot = ranges[0].getCommonAncestor( true );
				element = rangeRoot.getAscendant( 'a', true );
				if ( element && element.getAttribute( 'href' ) )
				{
					selection.selectElement( element );
				}
				else if ( ( element = rangeRoot.getAscendant( 'img', true ) ) &&
						 element.getAttribute( '_cke_real_element_type' ) &&
						 element.getAttribute( '_cke_real_element_type' ) == 'anchor' )
				{
					this.fakeObj = element;
					element = editor.restoreRealElement( this.fakeObj );
					selection.selectElement( this.fakeObj );
				}
				else
					element = null;
			}

			this.setupContent( parseLink.apply( this, [ editor, element ] ) );
		},
		onOk : function()
		{
			var attributes = { href : 'javascript:void(0)/*' + CKEDITOR.tools.getNextNumber() + '*/' },
				removeAttributes = [],
				data = { href : attributes.href },
				me = this,
				editor = this.getParentEditor();

			this.commitContent( data );

			// Compose the URL.
			switch ( data.type || 'url' )
			{
				case 'url':
					var protocol = ( data.url && data.url.protocol != undefined ) ? data.url.protocol : 'http://',
						url = ( data.url && data.url.url ) || '';
					attributes._cke_saved_href = ( url.indexOf( '/' ) === 0 ) ? url : protocol + url;
					break;
				case 'anchor':
					var name = ( data.anchor && data.anchor.name ),
						id = ( data.anchor && data.anchor.id );
					attributes._cke_saved_href = '#' + ( name || id || '' );
					break;
				case 'email':

					var linkHref,
						email = data.email,
						address = email.address;

					switch( emailProtection )
					{
						case '' :
						case 'encode' :
						{
							var subject = encodeURIComponent( email.subject || '' ),
								body = encodeURIComponent( email.body || '' );

							// Build the e-mail parameters first.
							var argList = [];
							subject && argList.push( 'subject=' + subject );
							body && argList.push( 'body=' + body );
							argList = argList.length ? '?' + argList.join( '&' ) : '';

							if ( emailProtection == 'encode' )
							{
								linkHref = [ 'javascript:void(location.href=\'mailto:\'+',
											 protectEmailAddressAsEncodedString( address ) ];
								// parameters are optional.
								argList && linkHref.push( '+\'', escapeSingleQuote( argList ), '\'' );

								linkHref.push( ')' );
							}
							else
								linkHref = [ 'mailto:', address, argList ];

							break;
						}
						default :
						{
							// Separating name and domain.
							var nameAndDomain = address.split( '@', 2 );
							email.name = nameAndDomain[ 0 ];
							email.domain = nameAndDomain[ 1 ];

							linkHref = [ 'javascript:', protectEmailLinkAsFunction( email ) ];
						}
					}

					attributes._cke_saved_href = linkHref.join( '' );
					break;
			}

			// Popups and target.
			if ( data.target )
			{
				if ( data.target.type == 'popup' )
				{
					var onclickList = [ 'window.open(this.href, \'',
							data.target.name || '', '\', \'' ];
					var featureList = [ 'resizable', 'status', 'location', 'toolbar', 'menubar', 'fullscreen',
							'scrollbars', 'dependent' ];
					var featureLength = featureList.length;
					var addFeature = function( featureName )
					{
						if ( data.target[ featureName ] )
							featureList.push( featureName + '=' + data.target[ featureName ] );
					};

					for ( var i = 0 ; i < featureLength ; i++ )
						featureList[i] = featureList[i] + ( data.target[ featureList[i] ] ? '=yes' : '=no' ) ;
					addFeature( 'width' );
					addFeature( 'left' );
					addFeature( 'height' );
					addFeature( 'top' );

					onclickList.push( featureList.join( ',' ), '\'); return false;' );
					attributes[ '_cke_pa_onclick' ] = onclickList.join( '' );
				}
				else
				{
					if ( data.target.type != 'notSet' && data.target.name )
						attributes.target = data.target.name;
					else
						removeAttributes.push( 'target' );

					removeAttributes.push( '_cke_pa_onclick', 'onclick' );
				}
			}

			// Advanced attributes.
			if ( data.adv )
			{
				var advAttr = function( inputName, attrName )
				{
					var value = data.adv[ inputName ];
					if ( value )
						attributes[attrName] = value;
					else
						removeAttributes.push( attrName );
				};

				if ( this._.selectedElement )
					advAttr( 'advId', 'id' );
				advAttr( 'advLangDir', 'dir' );
				advAttr( 'advAccessKey', 'accessKey' );
				advAttr( 'advName', 'name' );
				advAttr( 'advLangCode', 'lang' );
				advAttr( 'advTabIndex', 'tabindex' );
				advAttr( 'advTitle', 'title' );
				advAttr( 'advContentType', 'type' );
				advAttr( 'advCSSClasses', 'class' );
				advAttr( 'advCharset', 'charset' );
				advAttr( 'advStyles', 'style' );
			}

			if ( !this._.selectedElement )
			{
				// Create element if current selection is collapsed.
				var selection = editor.getSelection(),
					ranges = selection.getRanges();
				if ( ranges.length == 1 && ranges[0].collapsed )
				{
					var text = new CKEDITOR.dom.text( attributes._cke_saved_href, editor.document );
					ranges[0].insertNode( text );
					ranges[0].selectNodeContents( text );
					selection.selectRanges( ranges );
				}

				// Apply style.
				var style = new CKEDITOR.style( { element : 'a', attributes : attributes } );
				style.type = CKEDITOR.STYLE_INLINE;		// need to override... dunno why.
				style.apply( editor.document );

				// Id. Apply only to the first link.
				if ( data.adv && data.adv.advId )
				{
					var links = this.getParentEditor().document.$.getElementsByTagName( 'a' );
					for ( i = 0 ; i < links.length ; i++ )
					{
						if ( links[i].href == attributes.href )
						{
							links[i].id = data.adv.advId;
							break;
						}
					}
				}
			}
			else
			{
				// We're only editing an existing link, so just overwrite the attributes.
				var element = this._.selectedElement,
					href = element.getAttribute( '_cke_saved_href' ),
					textView = element.getHtml();

				// IE BUG: Setting the name attribute to an existing link doesn't work.
				// Must re-create the link from weired syntax to workaround.
				if ( CKEDITOR.env.ie && attributes.name != element.getAttribute( 'name' ) )
				{
					var newElement = new CKEDITOR.dom.element( '<a name="' + CKEDITOR.tools.htmlEncode( attributes.name ) + '">',
							editor.document );

					selection = editor.getSelection();

					element.moveChildren( newElement );
					element.copyAttributes( newElement, { name : 1 } );
					newElement.replace( element );
					element = newElement;

					selection.selectElement( element );
				}

				element.setAttributes( attributes );
				element.removeAttributes( removeAttributes );
				// Update text view when user changes protocol #4612.
				if (href == textView)
					element.setHtml( attributes._cke_saved_href );
				// Make the element display as an anchor if a name has been set.
				if ( element.getAttribute( 'name' ) )
					element.addClass( 'cke_anchor' );
				else
					element.removeClass( 'cke_anchor' );

				if ( this.fakeObj )
					editor.createFakeElement( element, 'cke_anchor', 'anchor' ).replace( this.fakeObj );

				delete this._.selectedElement;
			}
		},
		onLoad : function()
		{
			if ( !editor.config.linkShowAdvancedTab )
				this.hidePage( 'advanced' );		//Hide Advanded tab.

			if ( !editor.config.linkShowTargetTab )
				this.hidePage( 'target' );		//Hide Target tab.

		},
		// Inital focus on 'url' field if link is of type URL.
		onFocus : function()
		{
			var linkType = this.getContentElement( 'info', 'linkType' ),
					urlField;
			if ( linkType && linkType.getValue( ) == 'url' )
			{
				urlField = this.getContentElement( 'info', 'url' );
				urlField.select();
			}
		}
	};
});

/**
 * The e-mail address anti-spam protection option. The protection will be
 * applied when creating or modifying e-mail links through the editor interface.<br>
 * Two methods of protection can be choosed:
 * <ol>	<li>The e-mail parts (name, domain and any other query string) are
 *			assembled into a function call pattern. Such function must be
 *			provided by the developer in the pages that will use the contents.
 *		<li>Only the e-mail address is obfuscated into a special string that
 *			has no meaning for humans or spam bots, but which is properly
 *			rendered and accepted by the browser.</li></ol>
 * Both approaches require JavaScript to be enabled.
 * @name CKEDITOR.config.emailProtection
 * @since 3.1
 * @type String
 * @default '' (empty string = disabled)
 * @example
 * // href="mailto:tester@ckeditor.com?subject=subject&body=body"
 * config.emailProtection = '';
 * @example
 * // href="<a href=\"javascript:void(location.href=\'mailto:\'+String.fromCharCode(116,101,115,116,101,114,64,99,107,101,100,105,116,111,114,46,99,111,109)+\'?subject=subject&body=body\')\">e-mail</a>"
 * config.emailProtection = 'encode';
 * @example
 * // href="javascript:mt('tester','ckeditor.com','subject','body')"
 * config.emailProtection = 'mt(NAME,DOMAIN,SUBJECT,BODY)';
 */
