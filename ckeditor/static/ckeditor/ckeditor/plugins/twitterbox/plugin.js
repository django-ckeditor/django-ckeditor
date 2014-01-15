// Have to say that span elements can be editables
// See http://dev.ckeditor.com/ticket/10932
// CKEDITOR.dtd.$editable.span = 1;

var tweet_max_length = 140 - 26 - 10;   // utilitydive

CKEDITOR.addCss('.pquote {float:left; width:200px}');
CKEDITOR.addCss('.pquote div.tweetwords {display: inline;}');
CKEDITOR.addCss('.pquote.too_long {border: 2px solid red;}');


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

			// this is a block element
			inline: false,

			// Define the editable area
			// this should arguably be disabled
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


			// this is run whenever the widget is inserted into the editor
			init: function() {
				// if there is selected text, assume that text should be used
				// for the tweet text
				var selection = this.editor.getSelection();

				this.setData('tweet_value', this.element.getFirst().getText());
				if (selection) {
					var selection_text = selection.getSelectedText();
					if ( selection_text.length > 0 ) {
						this.setData('tweet_value', selection_text);
					}

					// a range has the start and end locations
					// of the selection
					range = selection.getRanges()[0];

					// find the first parent that is a block
					start_elem = range.getPreviousEditableNode().getParent();
					while ( ! start_elem.isBlockBoundary() ) {
						start_elem = start_elem.getParent();
					}

					// place the start of the range before
					// the beginning of the block
					range.setStartBefore(start_elem);

					// collapse the range so that end = start
					range.collapse(toStart=true);

					// and select only the new range we've created
					selection.selectRanges([range]);
				}

				this.setData('tweet_max_length', tweet_max_length);
				this.setData('tweet_too_long', false);


			},
			data: function() {
				this.element.getFirst().setText(this.data.tweet_value);
				if ( this.data.tweet_too_long ) {
					this.element.addClass('too_long');
				} else {
					this.element.removeClass('too_long');
				}
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