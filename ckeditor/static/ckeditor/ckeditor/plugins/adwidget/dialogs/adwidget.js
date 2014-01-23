CKEDITOR.dialog.add( 'adwidget', function( editor ) {
	return {
		title: "Choose Ad Type",
		minWidth: 300,
		minHeight: 200,

		contents : [
			{
				id: 'which_ad',

				elements: [
					{
						id: 'which_ad_select',
						type: 'select',
						label: 'Choose Ad Type',
						items: [
							['Bigbox 1', 'integrated_bigbox_one'],
							['Bigbox 2', 'integrated_bigbox_two'],
							['Small Leaderboard', 'integrated_horizontal']
						],
						setup: function(widget) {
							this.setValue(widget.data.current_ad_type);
						},
						commit: function(widget) {
							widget.setData('current_ad_type', this.getValue());
						}
					},
					{
						id: 'ad_style',
						type: 'select',
						label: 'Choose Ad Style',
						items: [
							['On the Right', 'ad_style_float_right'],
							['Centered,  no text wrapping', 'ad_style_centered'],
						],
						setup: function(widget) {
							if ( widget.element.hasClass('ad_style_float_right') ) {
								this.setValue('ad_style_float_right');
							} else {
								this.setValue('ad_style_centered');
							}
						},
						commit: function(widget) {
							if ( ! widget.element.hasClass(this.getValue()) ) {
								widget.element.removeClass('ad_style_float_right');
								widget.element.removeClass('ad_style_centered');
								widget.element.addClass(this.getValue());
							}
						}
					}
				]
			}

		]

	};

});
