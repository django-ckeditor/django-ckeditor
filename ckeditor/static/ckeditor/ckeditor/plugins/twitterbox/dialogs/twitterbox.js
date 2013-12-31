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
						id: 'tweet_textarea',
						type: 'textarea',
						label: 'Enter Tweet',


						setup: function(widget) {
							// set the starting value of the textarea
							// to be the text from the widget
							this.setValue(widget.data.tweet_value);

							this.getInputElement().setCustomData('tweet_max_length', widget.data.tweet_max_length);
							this.getInputElement().setCustomData('dialog_element', this.getDialog());

							// count characters and show result
							this.getInputElement().on('keyup', function(w){
								var left = this.getCustomData('tweet_max_length')- this.getValue().length
								var text = left + ' characters remaining';

								// This could all be on 1 line to get html_input
								var parent_dialog = this.getCustomData('dialog_element')
								var html_element = parent_dialog.getContentElement('twitterboxdialog', 'tweet_remaining_html')
								var html_input = html_element.getInputElement()


								html_input.setText(text);

								// should we warn that there are too many characters?
								if ( left < 0 ) {
									html_input.setStyle('font-weight', 'bolder');
									html_input.setStyle('color', 'red');
								} else{
									html_input.setStyle('font-weight', 'normal');
									html_input.setStyle('color', 'black');
								};
							});

							// set intial text
							this.getInputElement().fire('keyup');
						},
						commit: function(widget) {
							var too_long = this.getValue().length > widget.data.tweet_max_length;
							widget.setData('tweet_value', this.getValue());
							widget.setData('tweet_too_long', too_long);
						}
					},
					{
						id: 'tweet_remaining_html',
						type: 'html',
						html: ''
					}
				]
			}
		]

	}


});