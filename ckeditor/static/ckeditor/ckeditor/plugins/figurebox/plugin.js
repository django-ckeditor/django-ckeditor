CKEDITOR.plugins.add( 'figurebox', {
    // Miriam's Figure Box widget code.
    requires: 'widget,dialog',
    icons: 'figurebox',


    init: function( editor ) {
    	CKEDITOR.dialog.add('figurebox', this.path + 'dialogs/figurebox.js');


		if ( editor.addMenuItems ) {
			editor.addMenuItems({
				figurebox: {
					label: "Change Image Display",
					command: 'figurebox',
					group: 'diveimage'
				}
			});
		}

		editor.widgets.add( 'figurebox', {
		    button: 'Create a figure with caption and source',
			// Allow all HTML elements and classes that this widget requires.
			// Read more about the Advanced Content Filter here:
			// * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
			// * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
			allowedContent: 'figure(!inside_story, image_portrait); figcaption(!inside_story_caption); div(figure_content, caption_text, source_text, clearfix);img[src,alt,title,data-imagemodel,data-expandable-url,data-expandable-type]{height, width}(is_expandable)',

			// Minimum HTML which is required by this widget to work.
			requiredContent: 'figure(inside_story); figcaption(inside_story_caption);',

			inline: false,

			// Define two nested editable areas.
			editables: {
				content: {
					// Define a CSS selector used for finding the element inside the widget element.
					selector: '.figure_content',
					// Define content allowed in this nested editable. Its content will be
					// filtered accordingly and the toolbar will be adjusted when this editable
					// is focused.
					allowedContent: 'img[src, title, alt, data-imagemodel,data-expandable-url,data-expandable-type]{height, width}(is_expandable); div(embed-container); iframe[allowfullscreen, frameborder, !src]'
				},
				caption: {
					selector: '.caption_text',
					allowedContent: 'strong em; a[!href]'
				},
				source: {
					selector: '.source_text',
					allowedContent: 'em; a[!href]'
				}
			},

			// Define the template of a new Figure Box widget.
			// The template will be used when creating new instances of the Figure Box widget.
			template:
				'<figure class="inside_story">' +
					'<div class="figure_content">' +
					'<img src="' + this.path + 'resources/wsiwyg_image_replacement.png" /></div>' +
					'<figcaption class="inside_story_caption">' +
						'<div class="caption_text">Optional Caption</div>' +
						'<div class="source_text">Image Source</div>' +
						'<div class="clearfix"></div>' +
					'</figcaption>' +
				'</figure>',

			init: function() {
				if ( this.element.hasClass('image_portrait') ) {
					this.setData('image_style_type', 'image_portrait');
				} else {
					this.setData('image_style_type', '');
				}
			},

			data: function() {
				this.element.removeClass('image_portrait');

				if ( this.data.image_style_type.length ) {
					this.element.addClass(this.data.image_style_type);
				}
			},

			// Check the elements that need to be converted to widgets.
			//
			// Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
			// so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
			// during data processing which is done on DOM represented by JavaScript objects.
			upcast: function( element ) {
				// Return "true" (that element needs to converted to a Figure Box widget)
				// for all <div> elements with a "figurebox" class.
				return element.name == 'figure' && element.hasClass( 'inside_story' );
			}


		} );
    }

} );
