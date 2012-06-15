﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Spell Check As You Type (SCAYT).
 * Button name : Scayt.
 */

(function()
{
	var commandName 	= 'scaytcheck',
		openPage		= '',
		scayt_paused	= null;

	// Checks if a value exists in an array
	function in_array(needle, haystack)
	{
		var found = false, key;
		for (key in haystack)
		{
			if ((haystack[key] === needle) || ( haystack[key] == needle))
			{
				found = true;
				break;
			}
		}
		return found;
	}

	var onEngineLoad = function()
	{
		var editor = this;

		var createInstance = function()	// Create new instance every time Document is created.
		{
			// Initialise Scayt instance.
			var oParams = {};
			oParams.srcNodeRef = editor.document.getWindow().$.frameElement; 		// Get the iframe.
			// syntax : AppName.AppVersion@AppRevision
			oParams.assocApp  = "CKEDITOR." + CKEDITOR.version + "@" + CKEDITOR.revision;
			oParams.customerid = editor.config.scayt_customerid  || "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2";
			oParams.customDictionaryIds = editor.config.scayt_customDictionaryIds;
			oParams.userDictionaryName = editor.config.scayt_userDictionaryName;
			oParams.sLang = editor.config.scayt_sLang || "en_US";

			if ( CKEDITOR._scaytParams )
			{
				for ( var k in CKEDITOR._scaytParams )
				{
					oParams[ k ] = CKEDITOR._scaytParams[ k ];
				}
			}

			var scayt_control = new window.scayt( oParams );

			// Copy config.
			var	lastInstance = plugin.instances[ editor.name ];
			if ( lastInstance )
			{
				scayt_control.sLang = lastInstance.sLang;
				scayt_control.option( lastInstance.option() );
				scayt_control.paused = lastInstance.paused;
			}

			plugin.instances[ editor.name ] = scayt_control;

			//window.scayt.uiTags
			var menuGroup = 'scaytButton';
			var uiTabs = window.scayt.uiTags;
			var fTabs  = [];

			for (var i = 0,l=4; i<l; i++)
				fTabs.push( uiTabs[i] && plugin.uiTabs[i] );

			plugin.uiTabs = fTabs;
			try {
				scayt_control.setDisabled( scayt_paused === false );
			} catch (e) {}

			editor.fire( 'showScaytState' );
		};

		editor.on( 'contentDom', createInstance );
		editor.on( 'contentDomUnload', function()
			{
				// Remove scripts.
				var scripts = CKEDITOR.document.getElementsByTag( 'script' ),
					scaytIdRegex =  /^dojoIoScript(\d+)$/i,
					scaytSrcRegex =  /^https?:\/\/svc\.spellchecker\.net\/spellcheck\/script\/ssrv\.cgi/i;

				for ( var i=0; i < scripts.count(); i++ )
				{
					var script = scripts.getItem( i ),
						id = script.getId(),
						src = script.getAttribute( 'src' );

					if ( id && src && id.match( scaytIdRegex ) && src.match( scaytSrcRegex ))
						script.remove();
				}
			});

		editor.on( 'beforeCommandExec', function( ev )		// Disable SCAYT before Source command execution.
			{
				if ( (ev.data.name == 'source' ||  ev.data.name == 'newpage') && editor.mode == 'wysiwyg' )
				{
					var scayt_instanse = plugin.getScayt( editor );
					if ( scayt_instanse )
					{
						scayt_paused = scayt_instanse.paused = !scayt_instanse.disabled;
						scayt_instanse.destroy();
						delete plugin.instances[ editor.name ];
					}
				}
			});


		editor.on( 'destroy', function()
			{
				plugin.getScayt( editor ).destroy();
			});
		// Listen to data manipulation to reflect scayt markup.
		editor.on( 'afterSetData', function()
			{
				if ( plugin.isScaytEnabled( editor ) )
					plugin.getScayt( editor ).refresh();
			});

		// Reload spell-checking for current word after insertion completed.
		editor.on( 'insertElement', function()
			{
				var scayt_instance = plugin.getScayt( editor );
				if ( plugin.isScaytEnabled( editor ) )
				{
					// Unlock the selection before reload, SCAYT will take
					// care selection update.
					if ( CKEDITOR.env.ie )
						editor.getSelection().unlock( true );

					// Swallow any SCAYT engine errors.
					try{
						scayt_instance.refresh();
					}catch( er )
					{}
				}
			}, this, null, 50 );

		editor.on( 'insertHtml', function()
			{

				var scayt_instance = plugin.getScayt( editor );
				if ( plugin.isScaytEnabled( editor ) )
				{
					// Unlock the selection before reload, SCAYT will take
					// care selection update.
					if ( CKEDITOR.env.ie )
						editor.getSelection().unlock( true );

					// Swallow any SCAYT engine errors.
					try{
						scayt_instance.refresh();
					}catch( er )
					{}
				}
			}, this, null, 50 );

		editor.on( 'scaytDialog', function( ev )	// Communication with dialog.
			{
				ev.data.djConfig = window.djConfig;
				ev.data.scayt_control = plugin.getScayt( editor );
				ev.data.tab = openPage;
				ev.data.scayt = window.scayt;
			});

		var dataProcessor = editor.dataProcessor,
			htmlFilter = dataProcessor && dataProcessor.htmlFilter;
		if ( htmlFilter )
		{
			htmlFilter.addRules(
				{
					elements :
					{
						span : function( element )
						{
							if ( element.attributes.scayt_word && element.attributes.scaytid )
							{
								delete element.name;	// Write children, but don't write this node.
								return element;
							}
						}
					}
				}
			);
		}

		if ( editor.document )
			createInstance();
	};

	CKEDITOR.plugins.scayt =
	{
		engineLoaded : false,
		instances : {},
		getScayt : function( editor )
		{
			return this.instances[ editor.name ];
		},
		isScaytReady : function( editor )
		{
			return this.engineLoaded === true &&
				'undefined' !== typeof window.scayt && this.getScayt( editor );
		},
		isScaytEnabled : function( editor )
		{
			var scayt_instanse = this.getScayt( editor );
			return ( scayt_instanse ) ? scayt_instanse.disabled === false : false;
		},
		loadEngine : function( editor )
		{
			if ( this.engineLoaded === true )
				return onEngineLoad.apply( editor );	// Add new instance.
			else if ( this.engineLoaded == -1 )			// We are waiting.
				return CKEDITOR.on( 'scaytReady', function(){ onEngineLoad.apply( editor );} );	// Use function(){} to avoid rejection as duplicate.

			CKEDITOR.on( 'scaytReady', onEngineLoad, editor );
			CKEDITOR.on( 'scaytReady', function()
				{
					this.engineLoaded = true;
				},
				this,
				null,
				0 );	// First to run.

			this.engineLoaded = -1;	// Loading in progress.

			// compose scayt url
			var protocol = document.location.protocol;
			// Default to 'http' for unknown.
			protocol = protocol.search( /https?:/) != -1? protocol : 'http:';
			var baseUrl  = "svc.spellchecker.net/spellcheck3/lf/scayt/scayt21.js";

			var scaytUrl  =  editor.config.scayt_srcUrl || ( protocol + "//" + baseUrl );
			var scaytConfigBaseUrl =  plugin.parseUrl( scaytUrl ).path +  "/";

			CKEDITOR._djScaytConfig =
			{
				baseUrl: scaytConfigBaseUrl,
				addOnLoad:
				[
					function()
					{
						CKEDITOR.fireOnce( "scaytReady" );
					}
				],
				isDebug: false
			};
			// Append javascript code.
			CKEDITOR.document.getHead().append(
				CKEDITOR.document.createElement( 'script',
					{
						attributes :
							{
								type : 'text/javascript',
								src : scaytUrl
							}
					})
			);

			return null;
		},
		parseUrl : function ( data )
		{
			var match;
			if ( data.match && ( match = data.match(/(.*)[\/\\](.*?\.\w+)$/) ) )
				return { path: match[1], file: match[2] };
			else
				return data;
		}
	};

	var plugin = CKEDITOR.plugins.scayt;

	// Context menu constructing.
	var addButtonCommand = function( editor, buttonName, buttonLabel, commandName, command, menugroup, menuOrder )
	{
		editor.addCommand( commandName, command );

		// If the "menu" plugin is loaded, register the menu item.
		editor.addMenuItem( commandName,
			{
				label : buttonLabel,
				command : commandName,
				group : menugroup,
				order : menuOrder
			});
	};

	var commandDefinition =
	{
		preserveState : true,
		editorFocus : false,

		exec: function( editor )
		{
			if ( plugin.isScaytReady( editor ) )
			{
				var isEnabled = plugin.isScaytEnabled( editor );

				this.setState( isEnabled ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_ON );

				var scayt_control = plugin.getScayt( editor );
				scayt_control.setDisabled( isEnabled );
			}
			else if ( !editor.config.scayt_autoStartup && plugin.engineLoaded >= 0 )	// Load first time
			{
				this.setState( CKEDITOR.TRISTATE_DISABLED );

				editor.on( 'showScaytState', function()
					{
						this.removeListener();
						this.setState( plugin.isScaytEnabled( editor ) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF );
					},
					this);

				plugin.loadEngine( editor );
			}
		}
	};

	// Add scayt plugin.
	CKEDITOR.plugins.add( 'scayt',
	{
		requires : [ 'menubutton' ],

		beforeInit : function( editor )
		{
			// Register own rbc menu group.
			editor.config.menu_groups = 'scayt_suggest,scayt_moresuggest,scayt_control,' + editor.config.menu_groups;
		},

		init : function( editor )
		{
			var moreSuggestions = {};
			var mainSuggestions = {};

			// Scayt command.
			var command = editor.addCommand( commandName, commandDefinition );

			// Add Options dialog.
			CKEDITOR.dialog.add( commandName, CKEDITOR.getUrl( this.path + 'dialogs/options.js' ) );
			// read ui tags
			var confuiTabs = editor.config.scayt_uiTabs || "1,1,1";
			var uiTabs =[];
			// string tp array convert
			confuiTabs = confuiTabs.split(",");
			// check array length ! allwaays must be 3 filled with 1 or 0
			for (var i=0,l=3; i<l; i++){
				var flag = parseInt(confuiTabs[i] || "1" ,10);
				uiTabs.push(  flag  );
			}

			var menuGroup = 'scaytButton';
			editor.addMenuGroup( menuGroup );
			// combine menu items to render
			var uiMuneItems = {};

			// allways added
			uiMuneItems.scaytToggle =
				{
					label : editor.lang.scayt.enable,
					command : commandName,
					group : menuGroup
				};

			if (uiTabs[0] == 1)
				uiMuneItems.scaytOptions =
				{
					label : editor.lang.scayt.options,
					group : menuGroup,
					onClick : function()
					{
						openPage = 'options';
						editor.openDialog( commandName );
					}
				};

			if (uiTabs[1] == 1)
				uiMuneItems.scaytLangs =
				{
					label : editor.lang.scayt.langs,
					group : menuGroup,
					onClick : function()
					{
						openPage = 'langs';
						editor.openDialog( commandName );
					}
				};
			if (uiTabs[2] == 1)
				uiMuneItems.scaytDict =
				{
					label : editor.lang.scayt.dictionariesTab,
					group : menuGroup,
					onClick : function()
					{
						openPage = 'dictionaries';
						editor.openDialog( commandName );
					}
				};
			// allways added
			uiMuneItems.scaytAbout =
				{
					label : editor.lang.scayt.about,
					group : menuGroup,
					onClick : function()
					{
						openPage = 'about';
						editor.openDialog( commandName );
					}
				}
			;

			uiTabs[3] = 1; // about us tab is allways on
			plugin.uiTabs = uiTabs;

			editor.addMenuItems( uiMuneItems );

				editor.ui.add( 'Scayt', CKEDITOR.UI_MENUBUTTON,
					{
						label : editor.lang.scayt.title,
						title : editor.lang.scayt.title,
						className : 'cke_button_scayt',
						onRender: function()
						{
							command.on( 'state', function()
							{
								this.setState( command.state );
							},
							this);
						},
						onMenu : function()
						{
							var isEnabled = plugin.isScaytEnabled( editor );

							editor.getMenuItem( 'scaytToggle' ).label = editor.lang.scayt[ isEnabled ? 'disable' : 'enable' ];

							return {
								scaytToggle  : CKEDITOR.TRISTATE_OFF,
								scaytOptions : isEnabled && plugin.uiTabs[0] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
								scaytLangs   : isEnabled && plugin.uiTabs[1] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
								scaytDict    : isEnabled && plugin.uiTabs[2] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
								scaytAbout   : isEnabled && plugin.uiTabs[3] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
							};
						}
					});

			// If the "contextmenu" plugin is loaded, register the listeners.
			if ( editor.contextMenu && editor.addMenuItems )
			{
				editor.contextMenu.addListener( function( element )
					{
						if ( !( plugin.isScaytEnabled( editor ) && element ) )
							return null;

						var scayt_control = plugin.getScayt( editor ),
							word = scayt_control.getWord( element.$ );

						if ( !word )
							return null;

						var sLang = scayt_control.getLang(),
							_r = {},
							items_suggestion = window.scayt.getSuggestion( word, sLang );
						if (!items_suggestion || !items_suggestion.length )
							return null;
						// Remove unused commands and menuitems
						for ( i in moreSuggestions )
						{
							delete editor._.menuItems[ i ];
							delete editor._.commands[ i ];
						}
						for ( i in mainSuggestions )
						{
							delete editor._.menuItems[ i ];
							delete editor._.commands[ i ];
						}
						moreSuggestions = {};		// Reset items.
						mainSuggestions = {};

						var moreSuggestionsUnable = editor.config.scayt_moreSuggestions || "on";
						var moreSuggestionsUnableAdded = false;

						var maxSuggestions = editor.config.scayt_maxSuggestions;
						( typeof maxSuggestions != 'number' ) && ( maxSuggestions = 5 );
						!maxSuggestions && ( maxSuggestions = items_suggestion.length );

						var contextCommands = editor.config.scayt_contextCommands || "all";
						contextCommands = contextCommands.split("|");

						for ( var i = 0, l = items_suggestion.length; i < l; i += 1 )
						{
							var commandName = 'scayt_suggestion_' + items_suggestion[i].replace( ' ', '_' );
							var exec = ( function( el, s )
								{
									return {
										exec: function()
										{
											scayt_control.replace(el, s);
										}
									};
								})( element.$, items_suggestion[i] );

							if ( i < maxSuggestions )
							{
								addButtonCommand( editor, 'button_' + commandName, items_suggestion[i],
									commandName, exec, 'scayt_suggest', i + 1 );
								_r[ commandName ] = CKEDITOR.TRISTATE_OFF;
								mainSuggestions[ commandName ] = CKEDITOR.TRISTATE_OFF;
							}
							else if ( moreSuggestionsUnable == "on" )
							{
								addButtonCommand( editor, 'button_' + commandName, items_suggestion[i],
									commandName, exec, 'scayt_moresuggest', i + 1 );
								moreSuggestions[ commandName ] = CKEDITOR.TRISTATE_OFF;
								moreSuggestionsUnableAdded = true;
							}
						}

						if ( moreSuggestionsUnableAdded ){
							// Rgister the More suggestions group;
							editor.addMenuItem( 'scayt_moresuggest',
							{
								label : editor.lang.scayt.moreSuggestions,
								group : 'scayt_moresuggest',
								order : 10,
								getItems : function()
								{
									return moreSuggestions;
								}
							});
							mainSuggestions[ 'scayt_moresuggest' ] = CKEDITOR.TRISTATE_OFF;

						}

						if ( in_array( "all",contextCommands )  || in_array("ignore",contextCommands)  )
						{
							var ignore_command = {
								exec: function(){
									scayt_control.ignore(element.$);
								}
							};
							addButtonCommand(editor, 'ignore', editor.lang.scayt.ignore, 'scayt_ignore', ignore_command, 'scayt_control', 1);
							mainSuggestions['scayt_ignore'] = CKEDITOR.TRISTATE_OFF;
						}

						if ( in_array( "all",contextCommands )  || in_array("ignoreall",contextCommands)  )
						{
							var ignore_all_command = {
								exec: function(){
									scayt_control.ignoreAll(element.$);
								}
							};
							addButtonCommand(editor, 'ignore_all', editor.lang.scayt.ignoreAll, 'scayt_ignore_all', ignore_all_command, 'scayt_control', 2);
							mainSuggestions['scayt_ignore_all'] = CKEDITOR.TRISTATE_OFF;
						}

						if ( in_array( "all",contextCommands )  || in_array("add",contextCommands)  )
						{
							var addword_command = {
								exec: function(){
									window.scayt.addWordToUserDictionary(element.$);
								}
							};
							addButtonCommand(editor, 'add_word', editor.lang.scayt.addWord, 'scayt_add_word', addword_command, 'scayt_control', 3);
							mainSuggestions['scayt_add_word'] = CKEDITOR.TRISTATE_OFF;
						}

						if ( scayt_control.fireOnContextMenu )
							scayt_control.fireOnContextMenu( editor );

						return mainSuggestions;
					});
			}

			// Start plugin
			if ( editor.config.scayt_autoStartup )
			{
				var showInitialState = function()
				{
					editor.removeListener( 'showScaytState', showInitialState );
					command.setState( plugin.isScaytEnabled( editor ) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF );
				};
				editor.on( 'showScaytState', showInitialState );

				plugin.loadEngine( editor );
			}
		}
	});
})();

// TODO: Documentation
// CKEDITOR.config.scayt_maxSuggestions
// CKEDITOR.config.scayt_autoStartup
