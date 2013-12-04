CKEDITOR.plugins.add( 'figurebox', {
    // Mir Box widget code.
    requires: 'widget',

    icons: 'figurebox',

    init: function( editor ) {
		editor.widgets.add( 'figurebox', {
		    button: 'Create a box by Miriam',

			// Allow all HTML elements and classes that this widget requires.
			// Read more about the Advanced Content Filter here:
			// * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
			// * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
			allowedContent: 'figure(!inside_story); figcaption(!inside_story_caption); div(!figure_content)',

			// Minimum HTML which is required by this widget to work.
			requiredContent: 'figure(inside_story); div(figure_content); figcaption(inside_story_caption);',

			inline: false,

			// Define two nested editable areas.
			editables: {
				content: {
					// Define a CSS selector used for finding the element inside the widget element.
					selector: '.figure_content',
					// Define content allowed in this nested editable. Its content will be
					// filtered accordingly and the toolbar will be adjusted when this editable
					// is focused.
					allowedContent: 'img[src, title, alt]{height, width}; div(embed-container); iframe[allowfullscreen, frameborder, !src]'
				},
				explanation: {
					selector: '.inside_story_caption',
					allowedContent: 'strong em; a[!href, title]'
				}
			},

			// Define the template of a new Simple Box widget.
			// The template will be used when creating new instances of the Simple Box widget.
			template:
				'<figure class="inside_story">' +
					'<div class="figure_content"><img src="" /></div>' +
					'<figcaption class="inside_story_caption">Explanation / credit here</figcaption>' +
				'</figure>',


			// Check the elements that need to be converted to widgets.
			//
			// Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
			// so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
			// during data processing which is done on DOM represented by JavaScript objects.
			upcast: function( element ) {
				// Return "true" (that element needs to converted to a Simple Box widget)
				// for all <div> elements with a "simplebox" class.
				return element.name == 'figure' && element.hasClass( 'inside_story' );
			}


		} );
    }

} );