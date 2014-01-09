CKEDITOR.dialog.add( 'imagemodelwidget', function( editor ) {
	return {
		title: "Choose Ad Type",
		minWidth: 300,
		minHeight: 200,

		contents : [
			{
				id: 'image_info',
				label: 'Image',
				elements: [
					{
						id: 'imagemodellocal_json',
						type: 'textarea',
						inputStyle: 'display:none;',
						onChange: function(evt){
							var json_obj = JSON.parse(this.getValue());
							var parent_dialog = this.getDialog();
							var tab = 'image_info';
							var prefix = 'imagemodellocal_';

							parent_dialog.getContentElement(tab, prefix+'id').setValue(json_obj.id);
							parent_dialog.getContentElement(tab, 'image_url').setValue(json_obj.croppedUrl);

							var bool_replace_attr = parent_dialog.getContentElement(tab, prefix+'replace_attribution').getValue();

							if ( bool_replace_attr ) {
								var attribution_area = parent_dialog.getContentElement(tab, prefix+'attribution');
								var new_attribution = '';

								if ( json_obj.attribution.length ) {
									new_attribution = json_obj.attribution;
								}

								if ( json_obj.attributionUrl.length ) {
									new_attribution = '<a href="' + json_obj.attributionUrl + '">' + new_attribution + '</a>';
								}

								attribution_area.setValue(new_attribution);
							}
						}
					},
					{
						id: 'imagemodellocal_replace_attribution',
						type: 'checkbox',
						label: 'Replace Attribution',
						'default': 'checked'
					},
					{
						id: 'image_url',
						type: 'text',
						label: 'Image URL',
						setup: function(widget) {
							this.setValue(widget.data.image_url);
						},
						commit: function(widget) {
							widget.setData('image_url', this.getValue());
						}
					},
					{
						id: 'imagemodellocal_attribution',
						type: 'text',
						inputStyle: 'display:none;',
						setup: function(widget) {
							this.setValue(widget.data.image_attribution);
						},
						commit: function(widget) {
							if ( this.isEnabled() ) {
								widget.setData('image_attribution', this.getValue());
							}
						}
					},
					{
						id: 'imagemodellocal_id',
						type: 'text',
						inputStyle: 'display:none;',
						setup: function(widget) {
							this.setValue(widget.data.imagemodel_id);
						},
						commit: function(widget) {
							widget.setData('imagemodel_id', this.getValue());
						},
						onChange: function(evt) {
							var number = ( parseInt(this.getValue()) > 0 ) ? this.getValue() : 'N/A';
							var text = 'Image Model ID: ' + number;
							var html_element = this.getDialog().getContentElement('advanced', 'advanced_show_id');
							html_element.getInputElement().setText(text);
						}
					},
					{
						id: 'imagemodellocal_choose',
						type: 'button',
						label: 'Pick Local Image',
						onClick: function() {
							url = CKEDITOR.open_thumb_url;
							name = "";

						    // matches GRAPPELLI CUSTOM: changed width
						    var win = window.open(url, name, 'height=500,width=980,resizable=yes,scrollbars=yes');
						    win.focus();
						    return false;
						}
					},
					{
						id: 'imageoffsite_bool',
						type: 'checkbox',
						label: 'Use an offsite image',
						setup: function(widget) {
							this.setValue( ! widget.data.is_local );
							this.changeEnabled( );
						},
						onChange: function(evt) {
							this.changeEnabled( );
						},
						changeEnabled: function( ) {

							parent_dialog = this.getDialog();
							offsite_bool = this.getValue();

							tab = 'image_info';
							local_elements = ['imagemodellocal_replace_attribution',
								'imagemodellocal_attribution', 'imagemodellocal_choose'
							];

							offsite_elements = [];

							var url_elem = parent_dialog.getContentElement(tab, 'image_url');

							var button = parent_dialog.getContentElement(tab, 'imagemodellocal_choose');
							var button_element = button.getElement();

							if ( offsite_bool ) {
								var local_id = parent_dialog.getContentElement(tab, 'imagemodellocal_id');
								local_id.setValue("-1");
								button_element.setStyle('display', 'none');
							} else {
								button_element.setStyle('display', 'block');
							}

							for (var i = local_elements.length - 1; i >= 0; i--) {
								elem = parent_dialog.getContentElement(tab, local_elements[i]);

								if ( offsite_bool ) {
									elem.disable()
								} else {
									elem.enable();
								}
							};

							for (var i = offsite_elements.length - 1; i >= 0; i--) {
								elem = parent_dialog.getContentElement(offsite_tab, offsite_elements[i]);

								if ( offsite_bool ) {
									elem.enable()
								} else {
									elem.disable();
								}
							};
						}
					}
				]
			},
			{
				id: 'advanced',
				label: 'Advanced',
				elements: [
					{
						id: 'advanced_show_id',
						type: 'html',
						html: ''
					}

				]
			}

		], // end of contents array
		onShow: function() {
			// TODO: set this.element here !
		}
		onOk: function() {
			var dialog = this,
				image_elem = this.element.findOne('img');

			// this.commitContent(image_elem);
			// this.element.findOne('.source_text').setHtml(this.data.image_attribution);
			console.log(dialog,dialog.getValueOf( 'image_url'));
			image_elem.setAttribute("src", this.data.image_url);
			image_elem.setAttribute("data-src", this.data.image_url);
			image_elem.setAttribute("data-imagemodel", this.data.imagemodel_id);

			console.log()
		}

	};

});
