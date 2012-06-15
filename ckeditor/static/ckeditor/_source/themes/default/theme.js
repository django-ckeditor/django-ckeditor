﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.themes.add( 'default', (function()
{
	function checkSharedSpace( editor, spaceName )
	{
		var container,
			element;

		// Try to retrieve the target element from the sharedSpaces settings.
		element = editor.config.sharedSpaces;
		element = element && element[ spaceName ];
		element = element && CKEDITOR.document.getById( element );

		// If the element is available, we'll then create the container for
		// the space.
		if ( element )
		{
			// Creates an HTML structure that reproduces the editor class hierarchy.
			var html =
				'<span class="cke_shared">' +
				'<span class="' + editor.skinClass + ' cke_editor_' + editor.name + '">' +
				'<span class="' + CKEDITOR.env.cssClass + '">' +
				'<span class="cke_wrapper cke_' + editor.lang.dir + '">' +
				'<span class="cke_editor">' +
				'<div class="cke_' + spaceName + '">' +
				'</div></span></span></span></span></span>';

			var mainContainer = element.append( CKEDITOR.dom.element.createFromHtml( html, element.getDocument() ) );

			// Only the first container starts visible. Others get hidden.
			if ( element.getCustomData( 'cke_hasshared' ) )
				mainContainer.hide();
			else
				element.setCustomData( 'cke_hasshared', 1 );

			// Get the deeper inner <div>.
			container = mainContainer.getChild( [0,0,0,0] );

			// When the editor gets focus, we show the space container, hiding others.
			editor.on( 'focus', function()
				{
					for ( var i = 0, sibling, children = element.getChildren() ; ( sibling = children.getItem( i ) ) ; i++ )
					{
						if ( sibling.type == CKEDITOR.NODE_ELEMENT
							&& !sibling.equals( mainContainer )
							&& sibling.hasClass( 'cke_shared' ) )
						{
							sibling.hide();
						}
					}

					mainContainer.show();
				});

			editor.on( 'destroy', function()
				{
					mainContainer.remove();
				});
		}

		return container;
	}

	return {
		build : function( editor, themePath )
		{
			var name = editor.name,
				element = editor.element,
				elementMode = editor.elementMode;

			if ( !element || elementMode == CKEDITOR.ELEMENT_MODE_NONE )
				return;

			if ( elementMode == CKEDITOR.ELEMENT_MODE_REPLACE )
				element.hide();

			// Get the HTML for the predefined spaces.
			var topHtml			= editor.fire( 'themeSpace', { space : 'top', html : '' } ).html;
			var contentsHtml	= editor.fire( 'themeSpace', { space : 'contents', html : '' } ).html;
			var bottomHtml		= editor.fireOnce( 'themeSpace', { space : 'bottom', html : '' } ).html;

			var height	= contentsHtml && editor.config.height;

			var tabIndex = editor.config.tabIndex || editor.element.getAttribute( 'tabindex' ) || 0;

			// The editor height is considered only if the contents space got filled.
			if ( !contentsHtml )
				height = 'auto';
			else if ( !isNaN( height ) )
				height += 'px';

			var style = '';
			var width	= editor.config.width;

			if ( width )
			{
				if ( !isNaN( width ) )
					width += 'px';

				style += "width: " + width + ";";
			}

			var sharedTop		= topHtml && checkSharedSpace( editor, 'top' ),
				sharedBottoms	= checkSharedSpace( editor, 'bottom' );

			sharedTop		&& ( sharedTop.setHtml( topHtml )		, topHtml = '' );
			sharedBottoms	&& ( sharedBottoms.setHtml( bottomHtml ), bottomHtml = '' );

			var container = CKEDITOR.dom.element.createFromHtml( [
				'<span' +
					' id="cke_', name, '"' +
					' onmousedown="return false;"' +
					' class="', editor.skinClass, ' cke_editor_', name, '"' +
					' dir="', editor.lang.dir, '"' +
					' title="', ( CKEDITOR.env.gecko ? ' ' : '' ), '"' +
					' lang="', editor.langCode, '"' +
					' role="application"' +
					' aria-labelledby="cke_', name, '_arialbl"' +
					( style ? ' style="' + style + '"' : '' ) +
					'>' +
					'<span id="cke_', name, '_arialbl" class="cke_voice_label">' + editor.lang.editor + '</span>' +
					'<span class="' , CKEDITOR.env.cssClass, '" role="presentation">' +
						'<span class="cke_wrapper cke_', editor.lang.dir, '" role="presentation">' +
							'<table class="cke_editor" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody>' +
								'<tr', topHtml		? '' : ' style="display:none"', '><td id="cke_top_'		, name, '" class="cke_top" role="presentation">'	, topHtml		, '</td></tr>' +
								'<tr', contentsHtml	? '' : ' style="display:none"', '><td id="cke_contents_', name, '" class="cke_contents" style="height:', height, '" role="presentation">', contentsHtml, '</td></tr>' +
								'<tr', bottomHtml	? '' : ' style="display:none"', '><td id="cke_bottom_'	, name, '" class="cke_bottom" role="presentation">'	, bottomHtml	, '</td></tr>' +
							'</tbody></table>' +
							//Hide the container when loading skins, later restored by skin css.
							'<style>.', editor.skinClass, '{visibility:hidden;}</style>' +
						'</span>' +
					'</span>' +
				'</span>' ].join( '' ) );

			container.getChild( [1, 0, 0, 0, 0] ).unselectable();
			container.getChild( [1, 0, 0, 0, 2] ).unselectable();

			if ( elementMode == CKEDITOR.ELEMENT_MODE_REPLACE )
				container.insertAfter( element );
			else
				element.append( container );

			/**
			 * The DOM element that holds the main editor interface.
			 * @name CKEDITOR.editor.prototype.container
			 * @type CKEDITOR.dom.element
			 * @example
			 * var editor = CKEDITOR.instances.editor1;
			 * alert( <b>editor.container</b>.getName() );  "span"
			 */
			editor.container = container;

			// Disable browser context menu for editor's chrome.
			container.disableContextMenu();

			editor.fireOnce( 'themeLoaded' );
			editor.fireOnce( 'uiReady' );
		},

		buildDialog : function( editor )
		{
			var baseIdNumber = CKEDITOR.tools.getNextNumber();

			var element = CKEDITOR.dom.element.createFromHtml( [
					'<div class="cke_editor_' + editor.name.replace('.', '\\.') + '_dialog cke_skin_', editor.skinName,
						'" dir="', editor.lang.dir, '"' +
						' lang="', editor.langCode, '"' +
						' role="dialog"' +
						' aria-labelledby="%title#"' +
						'>' +
						'<table class="cke_dialog', ' ' + CKEDITOR.env.cssClass,
							' cke_', editor.lang.dir, '" style="position:absolute" role="presentation">' +
							'<tr><td role="presentation">' +
							'<div class="%body" role="presentation">' +
								'<div id="%title#" class="%title" role="presentation"></div>' +
								'<a id="%close_button#" class="%close_button" href="javascript:void(0)" title="' +  editor.lang.common.close+'" role="button"><span class="cke_label">X</span></a>' +
								'<div id="%tabs#" class="%tabs" role="tablist"></div>' +
								'<table class="%contents" role="presentation"><tr>' +
								  '<td id="%contents#" class="%contents" role="presentation"></td>' +
								'</tr></table>' +
								'<div id="%footer#" class="%footer" role="presentation"></div>' +
							'</div>' +
							'<div id="%tl#" class="%tl"></div>' +
							'<div id="%tc#" class="%tc"></div>' +
							'<div id="%tr#" class="%tr"></div>' +
							'<div id="%ml#" class="%ml"></div>' +
							'<div id="%mr#" class="%mr"></div>' +
							'<div id="%bl#" class="%bl"></div>' +
							'<div id="%bc#" class="%bc"></div>' +
							'<div id="%br#" class="%br"></div>' +
							'</td></tr>' +
						'</table>',

						//Hide the container when loading skins, later restored by skin css.
						( CKEDITOR.env.ie ? '' : '<style>.cke_dialog{visibility:hidden;}</style>' ),

					'</div>'
				].join( '' )
					.replace( /#/g, '_' + baseIdNumber )
					.replace( /%/g, 'cke_dialog_' ) );

			var body = element.getChild( [ 0, 0, 0, 0, 0 ] ),
				title = body.getChild( 0 ),
				close = body.getChild( 1 );

			// Make the Title and Close Button unselectable.
			title.unselectable();
			close.unselectable();


			return {
				element : element,
				parts :
				{
					dialog		: element.getChild( 0 ),
					title		: title,
					close		: close,
					tabs		: body.getChild( 2 ),
					contents	: body.getChild( [ 3, 0, 0, 0 ] ),
					footer		: body.getChild( 4 )
				}
			};
		},

		destroy : function( editor )
		{
			var container = editor.container;

			/*
			 * IE BUG: Removing the editor DOM elements while the selection is inside
			 * the editing area would break IE7/8's selection system. So we need to put
			 * the selection back to the parent document without scrolling the window.
			 * (#3812)
			 */
			if ( CKEDITOR.env.ie )
			{
				container.setStyle( 'display', 'none' );

				var $range = document.body.createTextRange();
				$range.moveToElementText( container.$ );
				try
				{
					// Putting the selection to a display:none element - this will certainly
					// fail. But! We've just put the selection document back to the parent
					// document without scrolling the window!
					$range.select();
				}
				catch ( e ) {}
			}

			if ( container )
				container.remove();

			if ( editor.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE )
			{
				editor.element.show();
				delete editor.element;
			}
		}
	};
})() );

CKEDITOR.editor.prototype.getThemeSpace = function( spaceName )
{
	var spacePrefix = 'cke_' + spaceName;
	var space = this._[ spacePrefix ] ||
		( this._[ spacePrefix ] = CKEDITOR.document.getById( spacePrefix + '_' + this.name ) );
	return space;
};

CKEDITOR.editor.prototype.resize = function( width, height, isContentHeight, resizeInner )
{
	var numberRegex = /^\d+$/;
	if ( numberRegex.test( width ) )
		width += 'px';

	var container = this.container,
		contents = CKEDITOR.document.getById( 'cke_contents_' + this.name ),
		outer = resizeInner ? container.getChild( 1 ) : container;

	// Resize the width first.
	// WEBKIT BUG: Webkit requires that we put the editor off from display when we
	// resize it. If we don't, the browser crashes!
	CKEDITOR.env.webkit && outer.setStyle( 'display', 'none' );
	outer.setStyle( 'width', width );
	if ( CKEDITOR.env.webkit )
	{
		outer.$.offsetWidth;
		outer.setStyle( 'display', '' );
	}

	// Get the height delta between the outer table and the content area.
	// If we're setting the content area's height, then we don't need the delta.
	var delta = isContentHeight ? 0 : ( outer.$.offsetHeight || 0 ) - ( contents.$.clientHeight || 0 );
	contents.setStyle( 'height', Math.max( height - delta, 0 ) + 'px' );

	// Emit a resize event.
	this.fire( 'resize' );
};

CKEDITOR.editor.prototype.getResizable = function()
{
	return this.container.getChild( 1 );
};

/**
 * Makes it possible to place some of the editor UI blocks, like the toolbar
 * and the elements path, into any element in the page.
 * The elements used to hold the UI blocks can be shared among several editor
 * instances. In that case, only the blocks of the active editor instance will
 * display.
 * @name CKEDITOR.config.sharedSpaces
 * @type Object
 * @default undefined
 * @example
 * // Place the toolbar inside the element with ID "someElementId" and the
 * // elements path into the element with ID "anotherId".
 * config.sharedSpaces =
 * {
 *     top : 'someElementId',
 *     bottom : 'anotherId'
 * };
 * @example
 * // Place the toolbar inside the element with ID "someElementId". The
 * // elements path will remain attached to the editor UI.
 * config.sharedSpaces =
 * {
 *     top : 'someElementId'
 * };
 */
