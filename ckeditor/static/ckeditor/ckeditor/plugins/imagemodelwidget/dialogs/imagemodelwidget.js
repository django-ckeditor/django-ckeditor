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
						label: 'json stuff',
						inputStyle: 'display:none;',
						setup: function(widget) {
							this.setValue(" ");
						},
						onChange: function(evt) {
							var values = JSON.parse(this.getValue());
							var parent_dialog = this.getDialog();
							var tab = 'image_info';
							var prefix = 'imagemodellocal_';

							var id_area = parent_dialog.getContentElement(tab, prefix+'id');
							id_area.setValue(values.id);

							var url_area = parent_dialog.getContentElement(tab, prefix+'url');
							url_area.setValue(values.croppedUrl);

							var replace_attribution_area = parent_dialog.getContentElement(tab, prefix+'replace_attribution');
							var bool_replace_attribution = replace_attribution_area.getValue();

							if ( bool_replace_attribution ) {
								var attribution_area = parent_dialog.getContentElement(tab, prefix+'attribution');
								var new_attribution = '';

								if ( values.attribution.length ) {
									new_attribution = values.attribution;
								}

								if ( values.attributionUrl.length ) {
									new_attribution = '<a href="' + values.attributionUrl + '">' + new_attribution + '</a>'
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

							if ( offsite_bool ) {
								var local_id = parent_dialog.getContentElement(tab, 'imagemodellocal_id');
								local_id.setValue("-1");
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
			}

		]

	};

});