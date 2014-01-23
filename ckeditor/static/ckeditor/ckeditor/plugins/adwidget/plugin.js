/** Add all the CSS to display a placeholder for the ad image **/
CKEDITOR.addCss('.integrated_ad { display: none; }');
CKEDITOR.addCss('.integrated_ad.manually_inserted { display:block; text-align: center;  background-color: #ccc; font-size: 15px; color: white; margin: auto;}');
CKEDITOR.addCss('.integrated_ad.manually_inserted.ad_style_float_right { float: right; margin: 10px 0 10px 10px; }');

var adwidget_css_prefix = 'This is a place holder for an ad. The ad is: ';

CKEDITOR.addCss('#integrated_horizontal.manually_inserted { width: 560px; height: 69px; }');
CKEDITOR.addCss('#integrated_horizontal.manually_inserted:before { content: "' + adwidget_css_prefix + 'horizontal"; }');

CKEDITOR.addCss('#integrated_bigbox_one.manually_inserted, #integrated_bigbox_two { width: 300px; height: 250px; }');
CKEDITOR.addCss('#integrated_bigbox_one.manually_inserted:before { content: "' + adwidget_css_prefix + 'bigbox #1"; }');
CKEDITOR.addCss('#integrated_bigbox_two.manually_inserted:before { content: "' + adwidget_css_prefix + 'bigbox #2"; }');

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
				all_ads = this.editor.document.find('div.integrated_ad');
				for (var i = all_ads.count() - 1; i >= 0; i--) {
					var current = all_ads.getItem(i);

					if ( ! current.hasClass('manually_inserted') ) {
						current.remove();
					};
				};
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
				return element.name == 'div' && element.hasClass( 'integrated_ad' ) && element.hasClass( 'manually_inserted');
			}
		} );
    }

} );
