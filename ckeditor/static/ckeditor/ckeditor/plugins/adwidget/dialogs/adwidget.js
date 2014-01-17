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
							['Small Leaderboard', 'integrated_horizontal'],
							['Bigbox 1', 'integrated_bigbox_one'],
							['Bigbox 2', 'integrated_bigbox_two']
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
							['On the Right', 'float_right'],
							['Centered,  no text wrapping', 'centered'],
						],
						setup: function(widget) {
							if ( widget.element.hasClass('float_right') ) {
								this.setValue('float_right');
							} else {
								this.setValue('centered');
							}
						},
						commit: function(widget) {
							if ( ! widget.element.hasClass(this.getValue()) ) {
								widget.element.removeClass('float_right');
								widget.element.removeClass('centered');
								widget.element.addClass(this.getValue());
							}
						}
					}
				]
			}

		]

	};

});