/** Add all the CSS to display a placeholder for the ad image **/
CKEDITOR.addCss('.integrated_ad { text-align: center; }');

CKEDITOR.addCss('#integrated_horizontal { width: 560px; height: 69px; line-height: 60px; }');
CKEDITOR.addCss('#integrated_horizontal:before { content: "Ad: horizontal"; }');

CKEDITOR.addCss('#integrated_bigbox_one, #integrated_bigbox_two { width: 300px; height: 250px; line-height: 200px; background-color:blue; font-size: 40px; color: white; margin:auto; }');
CKEDITOR.addCss('#integrated_bigbox_one:before { content: "Ad: bigbox #1" }');
CKEDITOR.addCss('#integrated_bigbox_two:before { content: "Ad: bigbox #2" }');

CKEDITOR.plugins.add( 'adwidget', {
    requires: 'widget,dialog',
    icons: 'adwidget',

    init: function( editor ) {
    	CKEDITOR.dialog.add('adwidget', this.path + 'dialogs/adwidget.js');

		editor.widgets.add( 'adwidget', {
		    button: 'Insert where the ad will go',

			allowedContent: 'div(integrated_ad, manually_inserted)[id];',
			requiredContent: 'div(integrated_ad)[id];',

			template: '<div class="integrated_ad manually_inserted" id="integrated_horizontal"></div>',
			inline: false,

			dialog: 'adwidget',

			init: function() {
				this.setData('current_ad_type', this.element.getId());
			},

			data: function() {
				this.element.setAttribute("id", this.data.current_ad_type);
			},

			// Check the elements that need to be converted to widgets.
			//
			// Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
			// so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
			// during data processing which is done on DOM represented by JavaScript objects.
			upcast: function( element ) {
				return element.name == 'div' && element.hasClass( 'integrated_ad' );
			}
		} );
    }

} );