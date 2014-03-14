/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

(function() {
	var imageDialog = function(editor, dialogType) {
		// Load image preview.
		var IMAGE = 1,
			LINK = 2,
			PREVIEW = 4,
			CLEANUP = 8,
			regexGetSize = /^\s*(\d+)((px)|\%)?\s*$/i,
			regexGetSizeOrEmpty = /(^\s*(\d+)((px)|\%)?\s*$)|^$/i,
			pxLengthRegex = /^\d+px$/;

		var updatePreview = function(dialog) {
			//Don't load before onShow.
			if (!dialog.originalElement || !dialog.preview)
				return 1;

			// Read attributes and update imagePreview;
			dialog.commitContent(PREVIEW, dialog.preview);
			return 0;
		};

		// Custom commit dialog logic, where we're intended to give inline style
		// field (txtdlgGenStyle) higher priority to avoid overwriting styles contribute
		// by other fields.
		function commitContent() {
			var args = arguments;
			var inlineStyleField = this.getContentElement('advanced', 'txtdlgGenStyle');
			inlineStyleField && inlineStyleField.commit.apply(inlineStyleField, args);

			this.foreach(function(widget) {
				if (widget.commit && widget.id != 'txtdlgGenStyle')
					widget.commit.apply(widget, args);
			});
		}

		function commitDiveContent(imageElement) {
			var imagemodel_id = this.getContentElement('advanced', 'dive_id').getValue();


			var expandable_checked = this.getContentElement('info', 'image_expandable').getValue();
            var className = 'is_expandable';

			if ( expandable_checked ) {
				var expand_type = this.getContentElement('advanced', 'dive_expandable_choices').getValue();
				var expand_url = this.getContentElement('advanced', 'dive_expandable_location').getValue();

				imageElement.addClass(className);
				imageElement.data('expandable-url', expand_url);
				imageElement.data('expandable-type', expand_type);
			} else {
				imageElement.removeClass(className);
				imageElement.data('expandable-url', false);
				imageElement.data('expandable-type', false);
			}

			imageElement.data('imagemodel', imagemodel_id);

			// replace the attribution if this image is in a figurebox?
			var replaceCredit = this.getContentElement('advanced', 'dive_replace_credit').getValue();
			var new_credit = this.getContentElement('advanced', 'dive_credit').getValue();

			if ( replaceCredit && new_credit.length ) {
				// try to find the placement
				// will fail if image not in the widget
				try {
					var source_div = imageElement.getAscendant('figure').findOne(".source_text.cke_widget_editable");
					source_div.setHtml(new_credit);
				}
				catch (e) {
					// could put an alert here ?
					return;
				}
			}
		}

		function getJSONData(key, json_field) {
			var json_elem = json_field || this.getContentElement('advanced', 'dive_json');
			var json_text = null;

			if ( !json_elem.getValue().length ) {
				var img_id = this.getContentElement('advanced', 'dive_id').getValue();

				if ( parseInt(img_id) > 0 ) {
					var fetch_url = '/api/v1/diveimage/get_data/?camelcase=1&id=' + img_id;
					json_text = CKEDITOR.ajax.load(fetch_url);
					json_obj = JSON.parse(json_text);
					json_elem.setValue(json_text);
				} else {
					return '';
				}
			} else {
				json_obj = JSON.parse(json_elem.getValue());
			}

			return json_obj[key] || '';
		}

		// Avoid recursions.
		var incommit;

		// Synchronous field values to other impacted fields is required, e.g. border
		// size change should alter inline-style text as well.
		function commitInternally(targetFields) {
			if (incommit)
				return;

			incommit = 1;

			var dialog = this.getDialog(),
				element = dialog.imageElement;
			if (element) {
				// Commit this field and broadcast to target fields.
				this.commit(IMAGE, element);

				targetFields = [].concat(targetFields);
				var length = targetFields.length,
					field;
				for (var i = 0; i < length; i++) {
					field = dialog.getContentElement.apply(dialog, targetFields[i].split(':'));
					// May cause recursion.
					field && field.setup(IMAGE, element);
				}
			}

			incommit = 0;
		}

		var previewPreloader;

		var onImgLoadEvent = function() {
			// Image is ready.
			var original = this.originalElement;
			original.setCustomData('isReady', 'true');
			original.removeListener('load', onImgLoadEvent);
			original.removeListener('error', onImgLoadErrorEvent);
			original.removeListener('abort', onImgLoadErrorEvent);

			// Hide loader
			CKEDITOR.document.getById(imagePreviewLoaderId).setStyle('display', 'none');

			this.firstLoad = false;
		};

		var onImgLoadErrorEvent = function() {
			// Error. Image is not loaded.
			var original = this.originalElement;
			original.removeListener('load', onImgLoadEvent);
			original.removeListener('error', onImgLoadErrorEvent);
			original.removeListener('abort', onImgLoadErrorEvent);

			// Set Error image.
			var noimage = CKEDITOR.getUrl(CKEDITOR.plugins.get('diveimage').path + 'images/noimage.png');

			if (this.preview)
				this.preview.setAttribute('src', noimage);

			// Hide loader
			CKEDITOR.document.getById(imagePreviewLoaderId).setStyle('display', 'none');
		};

		var numbering = function(id) {
			return CKEDITOR.tools.getNextId() + '_' + id;
		},
			btnLockSizesId = numbering('btnLockSizes'),
			btnResetSizeId = numbering('btnResetSize'),
			imagePreviewLoaderId = numbering('ImagePreviewLoader'),
			previewLinkId = numbering('previewLink'),
			previewImageId = numbering('previewImage');

		return {
			title: editor.lang.image[dialogType == 'diveimage' ? 'title' : 'titleButton'],
			minWidth: 420,
			minHeight: 360,
			onShow: function() {
				this.imageElement = false;
				this.linkElement = false;

				// Default: create a new element.
				this.imageEditMode = false;
				this.linkEditMode = false;

				this.lockRatio = true;
				this.userlockRatio = 0;
				this.dontResetSize = false;
				this.firstLoad = true;
				this.addLink = false;

				var editor = this.getParentEditor(),
					sel = editor.getSelection(),
					element = sel && sel.getSelectedElement(),
					link = element && editor.elementPath(element).contains('a', 1);

				//Hide loader.
				CKEDITOR.document.getById(imagePreviewLoaderId).setStyle('display', 'none');
				// Create the preview before setup the dialog contents.
				previewPreloader = new CKEDITOR.dom.element('img', editor.document);
				this.preview = CKEDITOR.document.getById(previewImageId);

				// Copy of the image
				this.originalElement = editor.document.createElement('img');
				this.originalElement.setAttribute('alt', '');
				this.originalElement.setCustomData('isReady', 'false');
				var new_credit = this.getContentElement('advanced', 'dive_credit').getValue();


				if (link) {
					this.linkElement = link;
					this.linkEditMode = true;

					// Look for Image element.
					var linkChildren = link.getChildren();
					if (linkChildren.count() == 1) // 1 child.
					{
						var childTagName = linkChildren.getItem(0).getName();
						if (childTagName == 'img' || childTagName == 'input') {
							this.imageElement = linkChildren.getItem(0);
							if (this.imageElement.getName() == 'img')
								this.imageEditMode = 'img';
							else if (this.imageElement.getName() == 'input')
								this.imageEditMode = 'input';
						}
					}
					// Fill out all fields.
					if (dialogType == 'diveimage')
						this.setupContent(LINK, link);
				}

				// Edit given image element instead the one from selection.
				if (this.customImageElement) {
					this.imageEditMode = 'img';
					this.imageElement = this.customImageElement;
					delete this.customImageElement;
				} else if (element && element.getName() == 'img' && !element.data('cke-realelement') ||
					element && element.getName() == 'input' && element.getAttribute('type') == 'image') {
					this.imageEditMode = element.getName();
					this.imageElement = element;
				}

				if (this.imageEditMode) {
					// Use the original element as a buffer from  since we don't want
					// temporary changes to be committed, e.g. if the dialog is canceled.
					this.cleanImageElement = this.imageElement;
					this.imageElement = this.cleanImageElement.clone(true, true);

					// Fill out all fields.
					this.setupContent(IMAGE, this.imageElement);
				} else
					this.imageElement = editor.document.createElement('img');

				// Dont show preview if no URL given.
				// Also hide it if it is the starting image from figurebox
				var img_url = CKEDITOR.tools.trim(this.getValueOf('info', 'txtUrl'));
				var starting_img = "ckeditor/ckeditor/plugins/figurebox/resources/wsiwyg_image_replacement.png";
				if (!img_url || img_url.match(starting_img)) {
					this.preview.removeAttribute('src');
					this.preview.setStyle('display', 'none');
				}
			},
			onOk: function() {
				// Edit existing Image.
				if (this.imageEditMode) {
					var imgTagName = this.imageEditMode;

					// Image dialog and Input element.
					if (dialogType == 'diveimage' && imgTagName == 'input' && confirm(editor.lang.image.button2Img)) {
						// Replace INPUT-> IMG
						imgTagName = 'img';
						this.imageElement = editor.document.createElement('img');
						this.imageElement.setAttribute('alt', '');
						editor.insertElement(this.imageElement);
					}
					// ImageButton dialog and Image element.
					else if (dialogType != 'diveimage' && imgTagName == 'img' && confirm(editor.lang.image.img2Button)) {
						// Replace IMG -> INPUT
						imgTagName = 'input';
						this.imageElement = editor.document.createElement('input');
						this.imageElement.setAttributes({
							type: 'image',
							alt: ''
						});
						editor.insertElement(this.imageElement);
					} else {
						// Restore the original element before all commits.
						this.imageElement = this.cleanImageElement;
						delete this.cleanImageElement;
					}
				} else // Create a new image.
				{
					// Image dialog -> create IMG element.
					if (dialogType == 'diveimage')
						this.imageElement = editor.document.createElement('img');
					else {
						this.imageElement = editor.document.createElement('input');
						this.imageElement.setAttribute('type', 'image');
					}
					this.imageElement.setAttribute('alt', '');
				}

				// Create a new link.
				if (!this.linkEditMode)
					this.linkElement = editor.document.createElement('a');

				// Set attributes.
				this.commitContent(IMAGE, this.imageElement);
				this.commitContent(LINK, this.linkElement);

				this.commitDiveContent(this.imageElement);

				// Remove empty style attribute.
				if (!this.imageElement.getAttribute('style'))
					this.imageElement.removeAttribute('style');

				// Insert a new Image.
				if (!this.imageEditMode) {
					if (this.addLink) {
						//Insert a new Link.
						if (!this.linkEditMode) {
							editor.insertElement(this.linkElement);
							this.linkElement.append(this.imageElement, false);
						} else //Link already exists, image not.
							editor.insertElement(this.imageElement);
					} else
						editor.insertElement(this.imageElement);
				} else // Image already exists.
				{
					//Add a new link element.
					if (!this.linkEditMode && this.addLink) {
						editor.insertElement(this.linkElement);
						this.imageElement.appendTo(this.linkElement);
					}
					//Remove Link, Image exists.
					else if (this.linkEditMode && !this.addLink) {
						editor.getSelection().selectElement(this.linkElement);
						editor.insertElement(this.imageElement);
					}
				}
			},
			onLoad: function() {
				if (dialogType != 'diveimage')
					this.hidePage('Link'); //Hide Link tab.
				var doc = this._.element.getDocument();

				if (this.getContentElement('info', 'ratioLock')) {
					this.addFocusable(doc.getById(btnResetSizeId), 5);
					this.addFocusable(doc.getById(btnLockSizesId), 5);
				}

				this.commitContent = commitContent;
				this.commitDiveContent = commitDiveContent;
				this.getJSONData = getJSONData;
			},
			onHide: function() {
				if (this.preview)
					this.commitContent(CLEANUP, this.preview);

				if (this.originalElement) {
					this.originalElement.removeListener('load', onImgLoadEvent);
					this.originalElement.removeListener('error', onImgLoadErrorEvent);
					this.originalElement.removeListener('abort', onImgLoadErrorEvent);
					this.originalElement.remove();
					this.originalElement = false; // Dialog is closed.
				}

				delete this.imageElement;
			},
			contents: [
				{ id: 'info',
					label: editor.lang.image.infoTab,
					accessKey: 'I',
					elements: [{
						type: 'vbox',
						padding: 0,
						children: [{
							type: 'hbox',
							widths: ['280px', '110px'],
							align: 'right',
							children: [{
								id: 'txtUrl',
								type: 'text',
								label: editor.lang.common.url,
								required: true,
								onChange: function() {
									var dialog = this.getDialog(),
										newUrl = this.getValue();

									//Update original image
									if (newUrl.length > 0) //Prevent from load before onShow
									{
										dialog = this.getDialog();
										var original = dialog.originalElement;

										dialog.preview.removeStyle('display');

										original.setCustomData('isReady', 'false');
										// Show loader
										var loader = CKEDITOR.document.getById(imagePreviewLoaderId);
										if (loader)
											loader.setStyle('display', '');

										original.on('load', onImgLoadEvent, dialog);
										original.on('error', onImgLoadErrorEvent, dialog);
										original.on('abort', onImgLoadErrorEvent, dialog);
										original.setAttribute('src', newUrl);

										// Query the preloader to figure out the url impacted by based href.
										previewPreloader.setAttribute('src', newUrl);
										dialog.preview.setAttribute('src', previewPreloader.$.src);
										updatePreview(dialog);
									}
									// Dont show preview if no URL given.
									else if (dialog.preview) {
										dialog.preview.removeAttribute('src');
										dialog.preview.setStyle('display', 'none');
									}

									// wipe the info id
									// if set on site, will be replaced next in sequence
									dialog.getContentElement('advanced', 'dive_id').setValue("-1");
								},
								setup: function(type, element) {
									if (type == IMAGE) {
										var url = element.data('cke-saved-src') || element.getAttribute('src');
										var field = this;
										var dialog = this.getDialog();

										dialog.dontResetSize = true;

										field.setValue(url); // And call this.onChange()
										// Manually set the initial value.(#4191)
										field.setInitValue();

										// Manually reset the dive_id
										dialog.getContentElement('advanced', 'dive_id').setup(type, element);
									}
								},
								commit: function(type, element) {
									if (type == IMAGE && (this.getValue() || this.isChanged())) {
										element.data('cke-saved-src', this.getValue());
										element.setAttribute('src', this.getValue());
									} else if (type == CLEANUP) {
										element.setAttribute('src', ''); // If removeAttribute doesn't work.
										element.removeAttribute('src');
									}
								},
								validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.image.urlMissing)
							},
							{ id: 'browse_info',
								type: 'button',
								style: 'display:inline-block;margin-top:10px;',
								align: 'center',
								label: "Choose/Upload Dive Image",
								onClick: function() {
									url = CKEDITOR.config.dive_open_thumb_url;
									name = "";

									// matches GRAPPELLI CUSTOM: changed width
									var win = window.open(url, name, 'height=500,width=980,resizable=yes,scrollbars=yes');
									win.focus();
									return false;
								},
							}]
						}]
					},
					{ id: 'txtAlt',
						type: 'text',
						label: editor.lang.image.alt,
						accessKey: 'T',
						'default': '',
						onChange: function() {
							updatePreview(this.getDialog());
						},
						setup: function(type, element) {
							if (type == IMAGE)
								this.setValue(element.getAttribute('alt'));
						},
						commit: function(type, element) {
							if (type == IMAGE) {
								if (this.getValue() || this.isChanged())
									element.setAttribute('alt', this.getValue());
							} else if (type == PREVIEW) {
								element.setAttribute('alt', this.getValue());
							} else if (type == CLEANUP) {
								element.removeAttribute('alt');
							}
						}
					},
					{ id: 'show_dive_id',
 						type: 'html',
						html: ''
					},
                    { id: 'image_expandable',
                      type: 'checkbox',
                      label: 'Expandable',
                      default: '', // Uncheck by default
                      style: 'vertical-align:bottom;',
                      setup: function(type, element) {
                          var className = 'is_expandable';
                          if (type == IMAGE) {
                          	is_expandable = element.hasClass(className);
                            this.setValue(is_expandable);
                          }
                      },
                      commit: function(type, element) {
                        var className = 'is_expandable';
                        if (type == IMAGE) {
                            is_checked = this.getValue();
                            is_expandable = element.hasClass(className);
                            // Made expandable but class doesn't exist 
                            if (is_checked && !is_expandable) {
                                element.addClass(className);
                            }
                            // Value unchecked but class exists
                            else if (!is_checked && is_expandable) {
                                element.removeClass(className);
                            }
                        }
					  }
                    },
					{ type: 'hbox',
						id: 'basic',
						type: 'vbox',
						children: [{
							type: 'html',
							id: 'htmlPreview',
							style: 'width:95%;',
							html: '<div id="' + imagePreviewLoaderId + '" class="ImagePreviewLoader" style="display:none">' +
							'<div class="loading">&nbsp;</div></div>' +
							'<img id="' + previewImageId + '" alt="" style="max-width:100%;"/>'
							// html: '<div>' + CKEDITOR.tools.htmlEncode(editor.lang.common.preview) + '<br>' +
							// 	 +
							// 	'<div class="ImagePreviewBox"><table><tr><td>' +
							// 	'<a href="javascript:void(0)" target="_blank" onclick="return false;" id="' + previewLinkId + '">' +
							// 	'<img id="' + previewImageId + '" alt="" /></a>' +
							// 	(editor.config.image_previewText || 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ' +
							// 	'Maecenas feugiat consequat diam. Maecenas metus. Vivamus diam purus, cursus a, commodo non, facilisis vitae, ' +
							// 	'nulla. Aenean dictum lacinia tortor. Nunc iaculis, nibh non iaculis aliquam, orci felis euismod neque, sed ornare massa mauris sed velit. Nulla pretium mi et risus. Fusce mi pede, tempor id, cursus ac, ullamcorper nec, enim. Sed tortor. Curabitur molestie. Duis velit augue, condimentum at, ultrices a, luctus ut, orci. Donec pellentesque egestas eros. Integer cursus, augue in cursus faucibus, eros pede bibendum sem, in tempus tellus justo quis ligula. Etiam eget tortor. Vestibulum rutrum, est ut placerat elementum, lectus nisl aliquam velit, tempor aliquam eros nunc nonummy metus. In eros metus, gravida a, gravida sed, lobortis id, turpis. Ut ultrices, ipsum at venenatis fringilla, sem nulla lacinia tellus, eget aliquet turpis mauris non enim. Nam turpis. Suspendisse lacinia. Curabitur ac tortor ut ipsum egestas elementum. Nunc imperdiet gravida mauris.') +
							// 	'</td></tr></table></div></div>'
						}]
                    },
					{ type: 'hbox',
						children: [{
							id: 'basic',
							type: 'vbox',
							children: [
							{ type: 'vbox',
								padding: 1,
								children: [{
									type: 'text',
									id: 'txtBorder',
									requiredContent: 'img{border-width}',
									width: '60px',
									label: editor.lang.image.border,
									'default': '',
									onKeyUp: function() {
										updatePreview(this.getDialog());
									},
									onChange: function() {
										commitInternally.call(this, 'advanced:txtdlgGenStyle');
									},
									validate: CKEDITOR.dialog.validate.integer(editor.lang.image.validateBorder),
									setup: function(type, element) {
										if (type == IMAGE) {
											var value,
												borderStyle = element.getStyle('border-width');
											borderStyle = borderStyle && borderStyle.match(/^(\d+px)(?: \1 \1 \1)?$/);
											value = borderStyle && parseInt(borderStyle[1], 10);
											isNaN(parseInt(value, 10)) && (value = element.getAttribute('border'));
											this.setValue(value);
										}
									},
									commit: function(type, element, internalCommit) {
										var value = parseInt(this.getValue(), 10);
										if (type == IMAGE || type == PREVIEW) {
											if (!isNaN(value)) {
												element.setStyle('border-width', CKEDITOR.tools.cssLength(value));
												element.setStyle('border-style', 'solid');
											} else if (!value && this.isChanged())
												element.removeStyle('border');

											if (!internalCommit && type == IMAGE)
												element.removeAttribute('border');
										} else if (type == CLEANUP) {
											element.removeAttribute('border');
											element.removeStyle('border-width');
											element.removeStyle('border-style');
											element.removeStyle('border-color');
										}
									}
								},
								{ type: 'text',
									id: 'txtHSpace',
									requiredContent: 'img{margin-left,margin-right}',
									width: '60px',
									label: editor.lang.image.hSpace,
									'default': '',
									onKeyUp: function() {
										updatePreview(this.getDialog());
									},
									onChange: function() {
										commitInternally.call(this, 'advanced:txtdlgGenStyle');
									},
									validate: CKEDITOR.dialog.validate.integer(editor.lang.image.validateHSpace),
									setup: function(type, element) {
										if (type == IMAGE) {
											var value, marginLeftPx, marginRightPx,
												marginLeftStyle = element.getStyle('margin-left'),
												marginRightStyle = element.getStyle('margin-right');

											marginLeftStyle = marginLeftStyle && marginLeftStyle.match(pxLengthRegex);
											marginRightStyle = marginRightStyle && marginRightStyle.match(pxLengthRegex);
											marginLeftPx = parseInt(marginLeftStyle, 10);
											marginRightPx = parseInt(marginRightStyle, 10);

											value = (marginLeftPx == marginRightPx) && marginLeftPx;
											isNaN(parseInt(value, 10)) && (value = element.getAttribute('hspace'));

											this.setValue(value);
										}
									},
									commit: function(type, element, internalCommit) {
										var value = parseInt(this.getValue(), 10);
										if (type == IMAGE || type == PREVIEW) {
											if (!isNaN(value)) {
												element.setStyle('margin-left', CKEDITOR.tools.cssLength(value));
												element.setStyle('margin-right', CKEDITOR.tools.cssLength(value));
											} else if (!value && this.isChanged()) {
												element.removeStyle('margin-left');
												element.removeStyle('margin-right');
											}

											if (!internalCommit && type == IMAGE)
												element.removeAttribute('hspace');
										} else if (type == CLEANUP) {
											element.removeAttribute('hspace');
											element.removeStyle('margin-left');
											element.removeStyle('margin-right');
										}
									}
								},
								{ type: 'text',
									id: 'txtVSpace',
									requiredContent: 'img{margin-top,margin-bottom}',
									width: '60px',
									label: editor.lang.image.vSpace,
									'default': '',
									onKeyUp: function() {
										updatePreview(this.getDialog());
									},
									onChange: function() {
										commitInternally.call(this, 'advanced:txtdlgGenStyle');
									},
									validate: CKEDITOR.dialog.validate.integer(editor.lang.image.validateVSpace),
									setup: function(type, element) {
										if (type == IMAGE) {
											var value, marginTopPx, marginBottomPx,
												marginTopStyle = element.getStyle('margin-top'),
												marginBottomStyle = element.getStyle('margin-bottom');

											marginTopStyle = marginTopStyle && marginTopStyle.match(pxLengthRegex);
											marginBottomStyle = marginBottomStyle && marginBottomStyle.match(pxLengthRegex);
											marginTopPx = parseInt(marginTopStyle, 10);
											marginBottomPx = parseInt(marginBottomStyle, 10);

											value = (marginTopPx == marginBottomPx) && marginTopPx;
											isNaN(parseInt(value, 10)) && (value = element.getAttribute('vspace'));
											this.setValue(value);
										}
									},
									commit: function(type, element, internalCommit) {
										var value = parseInt(this.getValue(), 10);
										if (type == IMAGE || type == PREVIEW) {
											if (!isNaN(value)) {
												element.setStyle('margin-top', CKEDITOR.tools.cssLength(value));
												element.setStyle('margin-bottom', CKEDITOR.tools.cssLength(value));
											} else if (!value && this.isChanged()) {
												element.removeStyle('margin-top');
												element.removeStyle('margin-bottom');
											}

											if (!internalCommit && type == IMAGE)
												element.removeAttribute('vspace');
										} else if (type == CLEANUP) {
											element.removeAttribute('vspace');
											element.removeStyle('margin-top');
											element.removeStyle('margin-bottom');
										}
									}
								},
								{ id: 'cmbAlign',
									requiredContent: 'img{float}',
									type: 'select',
									widths: ['35%', '65%'],
									style: 'width:90px',
									label: editor.lang.common.align,
									'default': '',
									items: [
										[editor.lang.common.notSet, ''],
										[editor.lang.common.alignLeft, 'left'],
										[editor.lang.common.alignRight, 'right']
										// Backward compatible with v2 on setup when specified as attribute value,
										// while these values are no more available as select options.
										//	[ editor.lang.image.alignAbsBottom , 'absBottom'],
										//	[ editor.lang.image.alignAbsMiddle , 'absMiddle'],
										//  [ editor.lang.image.alignBaseline , 'baseline'],
										//  [ editor.lang.image.alignTextTop , 'text-top'],
										//  [ editor.lang.image.alignBottom , 'bottom'],
										//  [ editor.lang.image.alignMiddle , 'middle'],
										//  [ editor.lang.image.alignTop , 'top']
									],
									onChange: function() {
										updatePreview(this.getDialog());
										commitInternally.call(this, 'advanced:txtdlgGenStyle');
									},
									setup: function(type, element) {
										if (type == IMAGE) {
											var value = element.getStyle('float');
											switch (value) {
												// Ignore those unrelated values.
												case 'inherit':
												case 'none':
													value = '';
											}

											!value && (value = (element.getAttribute('align') || '').toLowerCase());
											this.setValue(value);
										}
									},
									commit: function(type, element, internalCommit) {
										var value = this.getValue();
										if (type == IMAGE || type == PREVIEW) {
											if (value)
												element.setStyle('float', value);
											else
												element.removeStyle('float');

											if (!internalCommit && type == IMAGE) {
												value = (element.getAttribute('align') || '').toLowerCase();
												switch (value) {
													// we should remove it only if it matches "left" or "right",
													// otherwise leave it intact.
													case 'left':
													case 'right':
														element.removeAttribute('align');
												}
											}
										} else if (type == CLEANUP)
											element.removeStyle('float');
									}
								}]
							}]
						}
						]
					}]
				},
				{ id: 'Link',
					requiredContent: 'a[href]',
					label: editor.lang.image.linkTab,
					padding: 0,
					elements: [{
						id: 'txtUrl',
						type: 'text',
						label: editor.lang.common.url,
						style: 'width: 100%',
						'default': '',
						setup: function(type, element) {
							if (type == LINK) {
								var href = element.data('cke-saved-href');
								if (!href)
									href = element.getAttribute('href');
								this.setValue(href);
							}
						},
						commit: function(type, element) {
							if (type == LINK) {
								if (this.getValue() || this.isChanged()) {
									var url = decodeURI(this.getValue());
									element.data('cke-saved-href', url);
									element.setAttribute('href', url);

									if (this.getValue() || !editor.config.image_removeLinkByEmptyURL)
										this.getDialog().addLink = true;
								}
							}
						}
					},
					{ id: 'cmbTarget',
						type: 'select',
						requiredContent: 'a[target]',
						label: editor.lang.common.target,
						'default': '',
						items: [
							[editor.lang.common.notSet, ''],
							[editor.lang.common.targetNew, '_blank'],
							[editor.lang.common.targetTop, '_top'],
							[editor.lang.common.targetSelf, '_self'],
							[editor.lang.common.targetParent, '_parent']
						],
						setup: function(type, element) {
							if (type == LINK)
								this.setValue(element.getAttribute('target') || '');
						},
						commit: function(type, element) {
							if (type == LINK) {
								if (this.getValue() || this.isChanged())
									element.setAttribute('target', this.getValue());
							}
						}
					}]
				},
				{ id: 'advanced',
					label: editor.lang.common.advancedTab,
					elements: [
						{ type: 'hbox',
							widths: ['50%', '25%', '25%'],
							children: [{
								type: 'text',
								id: 'linkId',
								requiredContent: 'img[id]',
								label: editor.lang.common.id,
								setup: function(type, element) {
									if (type == IMAGE)
										this.setValue(element.getAttribute('id'));
								},
								commit: function(type, element) {
									if (type == IMAGE) {
										if (this.getValue() || this.isChanged())
											element.setAttribute('id', this.getValue());
									}
								}
							},
							{ id: 'cmbLangDir',
								type: 'select',
								requiredContent: 'img[dir]',
								style: 'width : 100px;',
								label: editor.lang.common.langDir,
								'default': '',
								items: [
									[editor.lang.common.notSet, ''],
									[editor.lang.common.langDirLtr, 'ltr'],
									[editor.lang.common.langDirRtl, 'rtl']
								],
								setup: function(type, element) {
									if (type == IMAGE)
										this.setValue(element.getAttribute('dir'));
								},
								commit: function(type, element) {
									if (type == IMAGE) {
										if (this.getValue() || this.isChanged())
											element.setAttribute('dir', this.getValue());
									}
								}
							}, {
								type: 'text',
								id: 'txtLangCode',
								requiredContent: 'img[lang]',
								label: editor.lang.common.langCode,
								'default': '',
								setup: function(type, element) {
									if (type == IMAGE)
										this.setValue(element.getAttribute('lang'));
								},
								commit: function(type, element) {
									if (type == IMAGE) {
										if (this.getValue() || this.isChanged())
											element.setAttribute('lang', this.getValue());
									}
								}
							}]
						},
						{ id: 'txtGenLongDescr',
							type: 'text',
							requiredContent: 'img[longdesc]',
							label: editor.lang.common.longDescr,
							setup: function(type, element) {
								if (type == IMAGE)
									this.setValue(element.getAttribute('longDesc'));
							},
							commit: function(type, element) {
								if (type == IMAGE) {
									if (this.getValue() || this.isChanged())
										element.setAttribute('longDesc', this.getValue());
								}
							}
						},
						{ type: 'hbox',
							widths: ['50%', '50%'],
							children: [{
								type: 'text',
								id: 'txtGenClass',
								requiredContent: 'img(cke-xyz)', // Random text like 'xyz' will check if all are allowed.
								label: editor.lang.common.cssClass,
								'default': '',
								setup: function(type, element) {
									if (type == IMAGE)
										this.setValue(element.getAttribute('class'));
								},
								commit: function(type, element) {
									if (type == IMAGE) {
										if (this.getValue() || this.isChanged())
											element.setAttribute('class', this.getValue());
									}
								}
							},
							{ id: 'txtGenTitle',
								type: 'text',
								requiredContent: 'img[title]',
								label: editor.lang.common.advisoryTitle,
								'default': '',
								onChange: function() {
									updatePreview(this.getDialog());
								},
								setup: function(type, element) {
									if (type == IMAGE)
										this.setValue(element.getAttribute('title'));
								},
								commit: function(type, element) {
									if (type == IMAGE) {
										if (this.getValue() || this.isChanged())
											element.setAttribute('title', this.getValue());
									} else if (type == PREVIEW) {
										element.setAttribute('title', this.getValue());
									} else if (type == CLEANUP) {
										element.removeAttribute('title');
									}
								}
							}]
						},
						{ id: 'dive_json',
							type: 'textarea',
							inputStyle: 'display:none;',
							hidden: true,
							onChange: function(evt){
								var json_obj = JSON.parse(this.getValue());
								var d = this.getDialog();

								if ( json_obj.useCropped ) {
									d.getContentElement('info', 'txtUrl').setValue(json_obj.croppedUrl);
								} else {
									d.getContentElement('info', 'txtUrl').setValue(json_obj.lightboxUrl);
								}

								// handle expandable options
								d.getContentElement('advanced', 'dive_img_full_url').setValue(json_obj.lightboxUrl);
								d.getContentElement('advanced', 'dive_expandable_location').setValue(json_obj.lightboxUrl);
								d.getContentElement('advanced', 'dive_expandable_choices').setValue('dive_expand_uncropped');

								//need to set this AFTER changing the Url, because the in the
								// Url onChange the id is wiped
								d.getContentElement('advanced', 'dive_id').setValue(json_obj.id);


								// replace the attribution if this image is in a figurebox?
								var replaceCredit = d.getContentElement('advanced', 'dive_replace_credit').getValue();

								if ( replaceCredit ) {
									var new_credit = this.parseJsonAttribution(json_obj);
									d.getContentElement('advanced', 'dive_credit').setValue(new_credit);
								}
							},
							parseJsonAttribution: function(json_obj) {
								var new_credit = '';

								if ( json_obj.attribution.length ) {
									new_credit = json_obj.attribution;
								}

								if ( json_obj.attributionUrl.length ) {
									var start_link = '<a href="' + json_obj.attributionUrl + '">';
									var link_text = new_credit.length ? new_credit : json_obj.attributionUrl
									new_credit = start_link + link_text + '</a>';
								}

								// set this so that we will replace the current
								// credit
								if ( ! new_credit.length ) {
									new_credit = ' ';
								}

								return new_credit;
							}
						},
						{ id: 'dive_replace_credit',
							type: 'checkbox',
							label: 'Replace Attribution',
							'default': 'checked'
						},
						{ id: 'dive_expandable_choices',
							type: 'select',
							label: 'Expand Image on Click:',
							items: [
								['Same Image', 'dive_expand_same'],
								['Uncropped Image', 'dive_expand_uncropped'],
								['Other Image (enter URL)', 'dive_expand_url']
							],
							default: 'dive_expand_same',
							setup: function(type, element) {
								if (type == IMAGE) {
									var expand_url = element.data('expandable-url');
									var expand_type = element.data('expandable-type');

									if (!expand_type) {
										if (expand_url) {
											expand_type = 'dive_expand_url';
										} else {
											expand_type = 'dive_expand_same';
										}
									}

									// UNSAFE TODO
									this.setValue(expand_type);
								}
							},
							onChange: function(evt) {
								var html_element = this.getDialog().getContentElement('advanced', 'dive_expandable_location');

								if (this.getValue() == 'dive_expand_url') {
									html_element.getElement().show();
								}
								else {
									html_element.getElement().hide();
								}

								if (this.getValue() == 'dive_expand_uncropped') {
									// var full_url_element = this.getDialog().getContentElement('advanced', 'dive_img_full_url');
									var full_url = this.getDialog().getJSONData('lightboxUrl');
									html_element.setValue(full_url);
									// full_url_element.setValue(full_url);

								}
							},
							commit: function(type, element) {
								element.data('expandable-type', this.getValue());
							}
						},
						{ id: 'dive_expandable_location',
							type: 'text',
							hidden: true,
							// inputStyle: 'display:none;',
							label: 'URL of full image:',
							setup: function(type, element) {
								if (type==IMAGE) {
									var expand_url = element.data('expandable-url');
									if (expand_url) {
										this.setValue(expand_url);

										var expand_type = this.getDialog().getContentElement('advanced', 'dive_expandable_choices');
										if (expand_type.getValue() == 'dive_expand_url') {
											this.getElement().show();
										}
									}
								}
							},
							commit: function(type, element) {
								if (type == IMAGE && (this.getValue() || this.isChanged())) {
									element.data('expandable-url', this.getValue());
								}
							}
						},
						{ id: 'dive_id',
							type: 'text',
							hidden: true,
							setup: function(type, element) {
								if (type == IMAGE) {
									var imagemodel_id = element.data('imagemodel');
									var field = this;

									this.getDialog().dontResetSize = true;

									field.setValue(imagemodel_id); // And call this.onChange()
								}
							},
							commit: function(type, element) {
								if (type == IMAGE && (this.getValue() || this.isChanged())) {
									element.data('imagemodel', this.getValue());
								}
							},
							onChange: function(evt) {
								var number = ( parseInt(this.getValue()) > 0 ) ? this.getValue() : 'N/A';
								var text = 'Image Model ID: ' + number;
								var html_element = this.getDialog().getContentElement('info', 'show_dive_id');
								html_element.getInputElement().setText(text);



							}
						},
						{ id: 'dive_credit',
							type: 'text',
							hidden: true,
							default: ''
						},
						{ id: 'dive_img_full_url',
							type: 'text',
							hidden: true
						}
					]
				}
			]
		};
	};

	CKEDITOR.dialog.add('diveimage', function(editor) {
		return imageDialog(editor, 'diveimage');
	});

	CKEDITOR.dialog.add('diveimagebutton', function(editor) {
		return imageDialog(editor, 'diveimagebutton');
	});
})();
