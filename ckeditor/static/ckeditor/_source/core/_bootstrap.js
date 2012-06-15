﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview API initialization code.
 */

(function()
{
	// Check is High Contrast is active by creating a temporary element with a
	// background image.

	var useSpacer = CKEDITOR.env.ie && CKEDITOR.env.version < 7,
		useBlank = CKEDITOR.env.ie && CKEDITOR.env.version == 7;


	var backgroundImageUrl = useSpacer ? ( CKEDITOR.basePath + 'images/spacer.gif' ) :
							 useBlank ? 'about:blank' : 'data:image/png;base64,';

	var hcDetect = CKEDITOR.dom.element.createFromHtml(
		'<div style="width:0px;height:0px;' +
			'position:absolute;left:-10000px;' +
			'background-image:url(' + backgroundImageUrl + ')"></div>', CKEDITOR.document );

	hcDetect.appendTo( CKEDITOR.document.getHead() );

	// Update CKEDITOR.env.
	// Catch exception needed sometimes for FF. (#4230)
	try
	{
		CKEDITOR.env.hc = ( hcDetect.getComputedStyle( 'background-image' ) == 'none' );
	}
	catch (e)
	{
		CKEDITOR.env.hc = false;
	}
	if ( CKEDITOR.env.hc )
		CKEDITOR.env.cssClass += ' cke_hc';

	hcDetect.remove();
})();

// Load core plugins.
CKEDITOR.plugins.load( CKEDITOR.config.corePlugins.split( ',' ), function()
	{
		CKEDITOR.status = 'loaded';
		CKEDITOR.fire( 'loaded' );

		// Process all instances created by the "basic" implementation.
		var pending = CKEDITOR._.pending;
		if ( pending )
		{
			delete CKEDITOR._.pending;

			for ( var i = 0 ; i < pending.length ; i++ )
				CKEDITOR.add( pending[ i ] );
		}
	});

/*
TODO: Enable the following and check if effective.

if ( CKEDITOR.env.ie )
{
	// Remove IE mouse flickering on IE6 because of background images.
	try
	{
		document.execCommand( 'BackgroundImageCache', false, true );
	}
	catch (e)
	{
		// We have been reported about loading problems caused by the above
		// line. For safety, let's just ignore errors.
	}
}
*/

/**
 * Fired when a CKEDITOR core object is fully loaded and ready for interaction.
 * @name CKEDITOR#loaded
 * @event
 */
