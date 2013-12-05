// Have to say that span elements can be editables
// See http://dev.ckeditor.com/ticket/10932
CKEDITOR.dtd.$editable.span = 1;



CKEDITOR.plugins.add( 'twitterbox', {
    // Mir Box widget code.
    requires: 'widget',

    icons: 'twitterbox',

    init: function( editor ) {

		editor.widgets.add( 'twitterbox', {
		    button: 'Create a twitter pull quote box',

			// Allow all HTML elements and classes that this widget requires.
			// Read more about the Advanced Content Filter here:
			// * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
			// * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
			allowedContent: 'aside(!pquote){float,width}; span(tweetquote,tweetwords);div(tweetwords){display}',

			// Minimum HTML which is required by this widget to work.
			requiredContent: 'div(!pquote); span(!tweetquote); div(!tweetwords)',

			inline: false,

			// Define two nested editable areas.
			editables: {
				words: {
					// Define a CSS selector used for finding the element inside the widget element.
					selector: '.tweetwords',
					// Define content allowed in this nested editable. Its content will be
					// filtered accordingly and the toolbar will be adjusted when this editable
					// is focused.
					allowedContent: 'span'
				}
			},

			template:
				'<aside class="pquote" style="float:left; width:200px;">' +
					'<div style="display:inline;" class="tweetwords">' +
						'Type quote here' +
					'</div>' +
					'<br><span class="tweetquote">auto image + link</span>' +
				'</aside>',

				// '<figure class="inside_story">' +
				// 	'<div class="figure_content"><img src="' + this.path + '/resources/wsiwyg_image_replacement.png" /></div>' +
				// 	'<figcaption class="inside_story_caption">Explanation / credit here</figcaption>' +
				// '</figure>',


			init: function() {
				// CKEDITOR.dtd.$editable.span = 1;
				// Pass the reference to this widget to the dialog.
				// this.on( 'dialog', function( evt ) {
				// 	evt.data.widget = this;
				// }, this );
			},


			// Check the elements that need to be converted to widgets.
			//
			// Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
			// so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
			// during data processing which is done on DOM represented by JavaScript objects.
			upcast: function( element ) {
				// Return "true" (that element needs to converted to a Simple Box widget)
				// for all <div> elements with a "simplebox" class.
				return element.name == 'aside' && element.hasClass( 'pquote' ) ;
			}

		} );
    }

} );