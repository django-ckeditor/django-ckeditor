CKEDITOR.addCss('.integrated_ad { text-align: center; }');
CKEDITOR.addCss('.integrated_ad .faked { background-color:blue; font-size: 40px; color: white; margin:auto; }');
CKEDITOR.addCss('#integrated_horizontal .faked:before { content: "Ad: horizontal"; }');
CKEDITOR.addCss('#integrated_horizontal .faked { width: 560px; height: 69px; line-height: 60px; }');
CKEDITOR.addCss('#integrated_bigbox_one .faked, #integrated_bigbox_two .faked { width: 300px; height: 250px; line-height: 200px; }');
CKEDITOR.addCss('#integrated_bigbox_one .faked:before { content: "Ad: bigbox #1" }');
CKEDITOR.addCss('#integrated_bigbox_two .faked:before { content: "Ad: bigbox #2" }');

CKEDITOR.plugins.add( 'adwidget', {
    // Mir Box widget code.
    requires: 'widget,dialog',

    icons: 'adwidget',

    init: function( editor ) {
    	CKEDITOR.dialog.add('adwidget', this.path + 'dialogs/adwidget.js');

		editor.widgets.add( 'adwidget', {
		    button: 'Insert where the ad will go',

			allowedContent: 'div(integrated_ad, integrated_horizontal,integrated_bigbox_one,integrated_bigbox_two,faked);',
			requiredContent: 'div(integrated_ad);',

			template: '<div class="integrated_ad" id="integrated_horizontal"><div class="faked"></div></div>',

			inline: false,

			dialog: 'adwidget',

			init: function() {
				var current_id = this.element.getId();
				this.setData('current_ad_type', current_id);
			},

			data: function() {
				// if (this.data.current_ad_type == )
				this.element.setAttribute("id", this.data.current_ad_type);
			},

			// Check the elements that need to be converted to widgets.
			//
			// Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
			// so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
			// during data processing which is done on DOM represented by JavaScript objects.
			upcast: function( element ) {
				// Return "true" (that element needs to converted to a Simple Box widget)
				// for all <div> elements with a "simplebox" class.
				// debugger;
				return element.name == 'div' && element.hasClass( 'integrated_ad' );
			}
		} );
    }

} );