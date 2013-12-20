// Have to say that span elements can be editables
// See http://dev.ckeditor.com/ticket/10932
// CKEDITOR.dtd.$editable.span = 1;


CKEDITOR.addCss('.pquote {float:left; width:200px}');
CKEDITOR.addCss('.pquote div.tweetwords {display: inline;}');

CKEDITOR.plugins.add( 'twitterbox', {
    // Mir Box widget code.
    requires: 'widget,dialog',

    icons: 'twitterbox',

    init: function( editor ) {
		CKEDITOR.dialog.add( 'twitterbox', this.path + 'dialogs/twitterbox.js' );

		editor.widgets.add( 'twitterbox', {
		    button: 'Create a twitter pull quote box',

			// Allow all HTML elements and classes that this widget requires.
			// Read more about the Advanced Content Filter here:
			// * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
			// * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
			allowedContent: 'aside(!pquote); span(tweetquote,tweetwords);div(tweetwords)',
			dialog: 'twitterbox',

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
				'<aside class="pquote">' +
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

				var selection = this.editor.getSelection();
				if (selection) {
					var selection_text = selection.getSelectedText();
					if ( selection_text.length > 0 ) {
						this.setData('tweet_value', selection_text);
					} else {
						this.setData('tweet_value', this.element.getFirst().getText());
					}

					range = selection.getRanges()[0];
					start_elem = range.getPreviousEditableNode().getParent();
					range.setStartBefore(start_elem);
					range.collapse(true);
					selection.selectRanges([range]);
				}
			},
			data: function() {
				this.element.getFirst().setText(this.data.tweet_value);
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