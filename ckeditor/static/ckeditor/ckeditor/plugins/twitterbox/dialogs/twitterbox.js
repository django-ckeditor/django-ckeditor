CKEDITOR.dialog.add('twitterbox', function(editor){

	return {
		title: 'Edit Content',
		minWidth: 200,
		minHeight: 200,
		contents: [
			{
				id: 'twitterboxdialog',
				elements: [
					{
						id: 'tweettextarea',
						type: 'textarea',
						label: 'Enter Tweet',


						setup: function(widget) {
							this.setValue(widget.data.tweet_value);
						},
						commit: function(widget) {
							widget.setData('tweet_value', this.getValue());
						}
					}
				]
			}
		]

	}


});