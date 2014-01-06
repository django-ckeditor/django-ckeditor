/** Add all the CSS to display a placeholder for the ad image **/

CKEDITOR.plugins.add( 'imagemodelwidget', {
    requires: 'widget,dialog',
    icons: 'imagemodelwidget',

    init: function( editor ) {
    	CKEDITOR.dialog.add('imagemodelwidget', this.path + 'dialogs/imagemodelwidget.js');

		editor.widgets.add( 'imagemodelwidget', {
		    button: 'Insert an image',

			allowedContent: 'img(image_local)[id,data-imagemodel,src,imagemodel];',
			requiredContent: 'img[src,data-imagemodel];',

			template: '<img />',
			inline: false,

			dialog: 'imagemodelwidget',

			init: function() {
				this.setData('imagemodel_id', this.element.getAttribute('data-imagemodel'));
				this.setData('image_url', this.element.getAttribute('src'));
				this.setData('image_attribution', "")
				// this.setData('height', this.element.getAttribute	)
			},

			data: function() {
				this.element.setAttribute("data-imagemodel", this.data.imagemodel_id);
				this.element.setAttribute("src", this.data.image_url);
				// this.element.setAttribute("src", this.data.image_url);
			},

			// Check the elements that need to be converted to widgets.
			//
			// Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
			// so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
			// during data processing which is done on DOM represented by JavaScript objects.
			upcast: function( element ) {
				return element.name == 'img' && 'data-imagemodel' in element.attributes;
			}
		} );
    }

} );