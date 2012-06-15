﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function()
{
	var doc = CKEDITOR.document;

	CKEDITOR.dialog.add( 'templates', function( editor )
		{
			// Constructs the HTML view of the specified templates data.
			function renderTemplatesList( container, templatesDefinitions )
			{
				// clear loading wait text.
				container.setHtml( '' );

				for ( var i = 0 ; i < templatesDefinitions.length ; i++ )
				{
					var definition = CKEDITOR.getTemplates( templatesDefinitions[ i ] ),
						imagesPath = definition.imagesPath,
						templates = definition.templates,
						count = templates.length;

					for ( var j = 0 ; j < count ; j++ )
					{
						var template = templates[ j ],
							item =  createTemplateItem( template, imagesPath );
						item.setAttribute( 'aria-posinset', j + 1 );
						item.setAttribute( 'aria-setsize', count );
						container.append( item );
					}
				}
			}

			function createTemplateItem( template, imagesPath )
			{
				var item = CKEDITOR.dom.element.createFromHtml(
						'<a href="javascript:void(0)" tabIndex="-1" role="option" >' +
							'<div class="cke_tpl_item"></div>' +
						'</a>' );

				// Build the inner HTML of our new item DIV.
				var html = '<table style="width:350px;" class="cke_tpl_preview"><tr>';

				if ( template.image && imagesPath )
					html += '<td class="cke_tpl_preview_img"><img src="' + CKEDITOR.getUrl( imagesPath + template.image ) + '"></td>';

				html += '<td style="white-space:normal;"><span class="cke_tpl_title">' + template.title + '</span><br/>';

				if ( template.description )
					html += '<span>' + template.description + '</span>';

				html += '</td></tr></table>';

				item.getFirst().setHtml( html );

				item.on( 'click', function() { insertTemplate( template.html ); } );

				return item;
			}

			/**
			 * Insert the specified template content into editor.
			 * @param {Number} index
			 */
			function insertTemplate( html )
			{
				var dialog = CKEDITOR.dialog.getCurrent(),
					isInsert = dialog.getValueOf( 'selectTpl', 'chkInsertOpt' );

				if ( isInsert )
				{
					// Everything should happen after the document is loaded (#4073).
					editor.on( 'contentDom', function( evt )
					{
						evt.removeListener();
						dialog.hide();

						// Place the cursor at the first editable place.
						var range = new CKEDITOR.dom.range( editor.document );
						range.moveToElementEditStart( editor.document.getBody() );
						range.select( true );
						setTimeout( function ()
						{
							editor.fire( 'saveSnapshot' );
						}, 0 );
					} );

					editor.fire( 'saveSnapshot' );
					editor.setData( html );
				}
				else
				{
					editor.insertHtml( html );
					dialog.hide();
				}
			}

			function keyNavigation( evt )
			{
				var target = evt.data.getTarget(),
					position = listContainer.getPosition( target );

				// Keyboard navigation for template list.
				if ( position > CKEDITOR.POSITION_CONTAINS )
				{
					var keystroke = evt.data.getKeystroke(),
						items = listContainer.getElementsByTag( 'a' ),
						focusItem;

					if ( items )
					{
						switch ( keystroke )
						{
							case 40 :					// ARROW-DOWN
								focusItem = target.getNext();
								break;

							case 38 :					// ARROW-UP
								focusItem = target.getPrevious();
								break;

							case 13 :					// ENTER
							case 32 :					// SPACE
								target.fire( 'click' );
						}

						if ( focusItem )
						{
							focusItem.focus();
							evt.data.preventDefault();
						}
					}
				}
			}

			// Load skin at first.
			CKEDITOR.skins.load( editor, 'templates' );

			var listContainer;

			return {
				title :editor.lang.templates.title,

				minWidth : CKEDITOR.env.ie ? 440 : 400,
				minHeight : 340,

				contents :
				[
					{
						id :'selectTpl',
						label : editor.lang.templates.title,
						elements :
						[
							{
								type : 'vbox',
								padding : 5,
								children :
								[
									{
										type : 'html',
										html :
											'<span>'  +
												editor.lang.templates.selectPromptMsg +
											'</span>'
									},
									{
										id : "templatesList",
										type : 'html',
										focus: function()
										{
											// Move focus to the first list item if available.
											try { this.getElement().getElementsByTag( 'a' ).getItem( 0 ).focus(); }
											catch( er ){}
										},
										html :
											'<div class="cke_tpl_list" tabIndex="-1" role="listbox" aria-labelledby="cke_tpl_list_label">' +
												'<div class="cke_tpl_loading"><span></span></div>' +
											'</div>' +
											'<span class="cke_voice_label" id="cke_tpl_list_label">' + editor.lang.common.options+ '</span>'
									},
									{
										id : 'chkInsertOpt',
										type : 'checkbox',
										label : editor.lang.templates.insertOption,
										'default' : editor.config.templates_replaceContent
									}
								]
							}
						]
					}
				],

				buttons : [ CKEDITOR.dialog.cancelButton ],

				onShow : function()
				{
					var templatesListField = this.getContentElement( 'selectTpl' , 'templatesList' );
					listContainer = templatesListField.getElement();

					CKEDITOR.loadTemplates( editor.config.templates_files, function()
						{
							var templates = editor.config.templates.split( ',' );

							if ( templates.length )
							{
								renderTemplatesList( listContainer, templates );
								templatesListField.focus();
							}
							else
							{
								listContainer.setHtml(
									'<div class="cke_tpl_empty">' +
										'<span>' + editor.lang.templates.emptyListMsg + '</span>' +
									'</div>' );
							}
						});

					this._.element.on( 'keydown', keyNavigation );
				},

				onHide : function ()
				{
					this._.element.removeListener( 'keydown', keyNavigation );
				}
			};
		});
})();
