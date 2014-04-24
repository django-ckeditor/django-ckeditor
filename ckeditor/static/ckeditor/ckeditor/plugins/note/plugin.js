CKEDITOR.plugins.add( 'note', {
    requires: 'widget',
    icons: 'note',


    init: function( editor ) {


		editor.widgets.add( 'note', {
		    button: "Add an editor's note",
			// Allow all HTML elements and classes that this widget requires.
			// Read more about the Advanced Content Filter here:
			// * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
			// * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
			allowedContent: 'p;div(!editor-note);',

			// Minimum HTML which is required by this widget to work.
			requiredContent: 'p;div(!editor-note);',

			inline: false,

			// Define two nested editable areas.
			editables: {
				content: {
					// Define a CSS selector used for finding the element inside the widget element.
					selector: 'p',
					// Define content allowed in this nested editable. Its content will be
					// filtered accordingly and the toolbar will be adjusted when this editable
					// is focused.
					allowedContent: 'a[!href];strong;em;br;'
				}
			},

			template: '<div class="editor-note"><p></p></div>',


			// Check the elements that need to be converted to widgets.
			//
			// Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
			// so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
			// during data processing which is done on DOM represented by JavaScript objects.
			upcast: function( element ) {
				return element.name == 'div' && element.hasClass( 'editor-note' );
			}


		} );
    }

} );
