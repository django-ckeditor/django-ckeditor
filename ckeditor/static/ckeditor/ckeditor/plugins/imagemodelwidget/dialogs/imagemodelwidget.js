CKEDITOR.dialog.add( 'imagemodelwidget', function( editor ) {
	return {
		title: "Choose Ad Type",
		minWidth: 300,
		minHeight: 200,

		contents : [
			{
				id: 'imagemodel_local',
				label: 'Local Image',
				elements: [
					{
						id: 'imagemodellocal_json',
						type: 'textarea',
						label: 'json stuff',
						inputStyle: 'display:none;',
						onChange: function(evt) {
							var values = JSON.parse(this.getValue());
							var parent_dialog = this.getDialog();
							var tab = 'imagemodel_local';
							var prefix = 'imagemodellocal_';

							var id_area = parent_dialog.getContentElement(tab, prefix+'id');
							id_area.setValue(values.id);

							var url_area = parent_dialog.getContentElement(tab, prefix+'cropped_url');
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
						id: 'imagemodellocal_cropped_url',
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
						setup: function(widget) {
							this.setValue(widget.data.image_attribution);
						},
						commit: function(widget) {
							widget.setData('image_attribution', this.getValue());
						}
					},
					{
						id: 'imagemodellocal_id',
						type: 'text',
						label: 'model_id'//,
						// inputStyle: 'display:none;'
						// setup: function(widget) {
						// 	this.setValue(widget.data.imagemodel_id);
						// },
						// commit: function(widget) {
						// 	widget.setData('imagemodel_id', this.getValue());
						// }
					},
					{
						id: 'imagemodellocal_choose',
						type: 'button',
						label: 'Pick Image',
						onClick: function() {
							url = CKEDITOR.open_thumb_url;
							name = "";

						    // matches GRAPPELLI CUSTOM: changed width
						    var win = window.open(url, name, 'height=500,width=980,resizable=yes,scrollbars=yes');
						    win.focus();
						    return false;
						}
					}
				]
			},
			{
				id: 'imagemodel_offsite',
				label: 'Offsite',
				elements: [
					{
						id: 'imagemodeloffsite_url',
						type: 'text'//,
						// setup: function(widget) {
						// 	this.setValue(widget.data.image_url);
						// },
						// commit: function(widget) {
						// 	widget.setData('image_url', this.getValue());
						// }
					},

				]
			}

		]

	};

});