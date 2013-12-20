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

							var temp_this = this;
							var temp_widget = widget;

							this.getInputElement().on('keyup', function(w){
								debugger;
							});
						},
						commit: function(widget) {
							var too_long = this.getValue().length > widget.data.tweet_max_length;
							widget.setData('tweet_value', this.getValue());
							widget.setData('tweet_too_long', too_long);
						},
					},
					{
						id: 'tweettextareacount',
						type: 'html',
						html: 'test'
						// html: (widget.data.tweet_max_length - this.getDialog().getContentElement('twitterboxdialog', 'tweettextarea').getValue().length) + ' characters left'
					}
				]
			}
		]

	}


});