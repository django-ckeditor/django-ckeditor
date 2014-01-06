/** Add all the CSS to display a placeholder for the ad image **/

CKEDITOR.plugins.add( 'imagemodelwidget', {
    requires: 'widget,dialog',
    icons: 'imagemodelwidget',

    init: function( editor ) {
    	CKEDITOR.dialog.add('imagemodelwidget', this.path + 'dialogs/imagemodelwidget.js');

		editor.widgets.add( 'imagemodelwidget', {
		    button: 'Insert an image',

			allowedContent: 'figure(!inside_story); figcaption(!inside_story_caption);' +
							'div(figure_content, caption_text, source_text, clearfix);' + 
							'img(image_local)[id,data-imagemodel,src,imagemodel];',
			
			requiredContent: 'figure(inside_story); figcaption(inside_story_caption);img[src,data-imagemodel];',

			inline: false,
			dialog: 'imagemodelwidget',


			template:
				'<figure class="inside_story">' +
					'<div class="figure_content">' +
						'<img src="' + this.path + 'resources/wsiwyg_image_replacement.png" />' + 
					'</div>' +
					'<figcaption class="inside_story_caption">' +
						'<div class="caption_text">Optional Caption</div>' +
						'<div class="source_text">Image Source</div>' +
						'<div class="clearfix"></div>' +
					'</figcaption>' +
				'</figure>',

			// Define two nested editable areas.
			editables: {
				content: {
					selector: '.figure_content',
					allowedContent: 'img[src, title, alt, data-imagemodel]; div(embed-container); iframe[allowfullscreen, frameborder, !src]'
				},
				caption: {
					selector: '.caption_text',
					allowedContent: 'strong em; a[!href]'
				},
				source: {
					selector: '.source_text',
					allowedContent: 'strong em; a[!href]'
				}
			},

			init: function() {
				var image_elem = this.element.findOne('img');

				var is_offsite = Boolean(parseInt(image_elem.getAttribute('data-imagemodel')) < 0);

				this.setData('image_attribution', this.element.findOne('.source_text').getHtml());
				this.setData('image_url', image_elem.getAttribute('src'));
				this.setData('imagemodel_id', image_elem.getAttribute('data-imagemodel'));
				this.setData('is_local', !is_offsite);
			},

			data: function() {
				var image_elem = this.element.findOne('img');
				this.element.findOne('.source_text').setHtml(this.data.image_attribution);
				image_elem.setAttribute("src", this.data.image_url);
				image_elem.setAttribute("data-imagemodel", this.data.imagemodel_id);
			},

			upcast: function( element ) {
				return element.name == 'figure' && element.hasClass( 'inside_story' );
			}
		} );
    }

} );