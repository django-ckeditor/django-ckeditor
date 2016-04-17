/**
 * @license Copyright (c) CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

(function() {
    if (!supportsLocalStorage()) {
        CKEDITOR.plugins.add("autosave", {}); //register a dummy plugin to pass CKEditor plugin initialization process
        return;
    }

    CKEDITOR.plugins.add("autosave", {
        lang: 'ca,cs,de,en,es,fr,ja,pl,pt-br,sv,zh,zh-cn', // %REMOVE_LINE_CORE%
        requires: 'notification',
        version: 0.13,
        init: function(editor) {
            CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(CKEDITOR.plugins.getPath('autosave') + 'css/autosave.min.css'));

            editor.on('instanceReady', function(){
                if (typeof (jQuery) === 'undefined') {
                    CKEDITOR.scriptLoader.load('//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js', function() {
                        jQuery.noConflict();

                        loadPlugin(editor);
                    });

                } else {
                    CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(CKEDITOR.plugins.getPath('autosave') + 'js/extensions.min.js'), function() {
                        loadPlugin(editor);
                    });
                }
            }, editor, null, 100);
        }
    });

    function loadPlugin(editorInstance) {
        var autoSaveKey = editorInstance.config.autosave_SaveKey != null ? editorInstance.config.autosave_SaveKey : 'autosave_' + window.location + "_" + editorInstance.id;
        var notOlderThen = editorInstance.config.autosave_NotOlderThen != null ? editorInstance.config.autosave_NotOlderThen : 1440;
        var saveOnDestroy = editorInstance.config.autosave_saveOnDestroy != null ? editorInstance.config.autosave_saveOnDestroy : false;
        var saveDetectionSelectors =
            editorInstance.config.autosave_saveDetectionSelectors != null ? editorInstance.config.autosave_saveDetectionSelectors : "a[href^='javascript:__doPostBack'][id*='Save'],a[id*='Cancel']";


        CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(CKEDITOR.plugins.getPath('autosave') + 'js/extensions.min.js'), function() {
            GenerateAutoSaveDialog(editorInstance, autoSaveKey);

            CheckForAutoSavedContent(editorInstance, autoSaveKey, notOlderThen);
        });

        jQuery(saveDetectionSelectors).click(function() {
            RemoveStorage(autoSaveKey);
        });

        editorInstance.on('change', startTimer);

        editorInstance.on('destroy', function() {
            if (saveOnDestroy) {
                SaveData(autoSaveKey, editorInstance);
            }
        });
    }

    var timeOutId = 0,
        savingActive = false;

    var startTimer = function(event) {
        if (timeOutId) {
        } else {
            var delay = CKEDITOR.config.autosave_delay != null ? CKEDITOR.config.autosave_delay : 10;
            timeOutId = setTimeout(onTimer, delay * 1000, event);
        }

    };
    var onTimer = function(event) {
        if (savingActive) {
            startTimer(event);
        } else if (event.editor.checkDirty() || event.editor.plugins.bbcode) {
            savingActive = true;
            var editor = event.editor,
                autoSaveKey = editor.config.autosave_SaveKey != null ? editor.config.autosave_SaveKey : 'autosave_' + window.location + "_" + editor.id;

            SaveData(autoSaveKey, editor);

            timeOutId = 0;
            savingActive = false;
        }
    };

    // localStorage detection
    function supportsLocalStorage() {
        if (typeof (Storage) === 'undefined') {
            return false;
        }

        try {
            localStorage.getItem("___test_key");
            return true;
        } catch (e) {
            return false;
        }
    }

    function GenerateAutoSaveDialog(editorInstance, autoSaveKey) {
        CKEDITOR.dialog.add('autosaveDialog', function() {
            return {
                title: editorInstance.lang.autosave.title,
                minHeight: 155,
                height: 300,
                width: 750,
                onShow: function() {
                    RenderDiff(this, editorInstance, autoSaveKey);
                },
                onOk: function() {
                    if (localStorage.getItem(autoSaveKey)) {
                        var jsonSavedContent = LoadData(autoSaveKey);
                        editorInstance.loadSnapshot(jsonSavedContent.data);

                        RemoveStorage(autoSaveKey);
                    }
                },
                onCancel: function() {
                    RemoveStorage(autoSaveKey);
                },
                contents: [
                    {
                        label: '',
                        id: 'general',
                        elements: [
                            {
                                type: 'radio',
                                id: 'diffType',
                                label: editorInstance.lang.autosave.diffType,
                                items: [[editorInstance.lang.autosave.sideBySide, 'sideBySide'], [editorInstance.lang.autosave.inline, 'inline']],
                                'default': 'sideBySide',
                                onClick: function() {
                                    RenderDiff(this._.dialog, editorInstance, autoSaveKey);
                                }
                            }, {
                                type: 'html',
                                id: 'diffContent',
                                html: ''
                            }
                        ]
                    }
                ],
                buttons: [
                    {
                        id: 'ok',
                        type: 'button',
                        label: editorInstance.lang.autosave.ok,
                        'class': 'cke_dialog_ui_button_ok cke_dialog_autosave_ok',
                        onClick: function(evt) {
                            var dialog = evt.data.dialog;
                            if (dialog.fire('ok', { hide: true }).hide !== false)
                                dialog.hide();
                        }
                    },
                    {
                        id: 'cancel',
                        type: 'button',
                        label: editorInstance.lang.autosave.no,
                        'class': 'cke_dialog_ui_button_cancel',
                        onClick: function(evt) {
                            var dialog = evt.data.dialog;
                            if (dialog.fire('cancel', { hide: true }).hide !== false)
                                dialog.hide();
                        }
                    }
                ]
            };
        });
    }

    function CheckForAutoSavedContent(editorInstance, autoSaveKey, notOlderThen) {
        // Checks If there is data available and load it
        if (localStorage.getItem(autoSaveKey)) {
            var jsonSavedContent = LoadData(autoSaveKey);

            var autoSavedContent = jsonSavedContent.data;
            var autoSavedContentDate = jsonSavedContent.saveTime;

            var editorLoadedContent = editorInstance.getSnapshot();

            // check if the loaded editor content is the same as the autosaved content
            if (editorLoadedContent == autoSavedContent) {
                localStorage.removeItem(autoSaveKey);
                return;
            }

            // Ignore if autosaved content is older then x minutes
            if (moment(new Date()).diff(new Date(autoSavedContentDate), 'minutes') > notOlderThen) {
                RemoveStorage(autoSaveKey);

                return;
            }

            var confirmMessage = editorInstance.lang.autosave.loadSavedContent.replace("{0}", moment(autoSavedContentDate).locale(editorInstance.config.language).format(editorInstance.lang.autosave.dateFormat));
            if (confirm(confirmMessage)) {
                // Open DIFF Dialog
                editorInstance.openDialog('autosaveDialog');
            } else {
                RemoveStorage(autoSaveKey);
            }
        }
    }

    function LoadData(autoSaveKey) {
        var compressedJSON = LZString.decompressFromUTF16(localStorage.getItem(autoSaveKey));
        return JSON.parse(compressedJSON);
    }

    function SaveData(autoSaveKey, editorInstance) {
        var compressedJSON = LZString.compressToUTF16(JSON.stringify({ data: editorInstance.getSnapshot(), saveTime: new Date() }));
        localStorage.setItem(autoSaveKey, compressedJSON);

        var notification = new CKEDITOR.plugins.notification( editorInstance, { message: editorInstance.lang.autosave.autoSaveMessage, type: 'success' } );
        notification.show();
    }

    function RemoveStorage(autoSaveKey) {
        if (timeOutId) {
            clearTimeout(timeOutId);
        }

        localStorage.removeItem(autoSaveKey);
    }

    function RenderDiff(dialog, editorInstance, autoSaveKey) {
        var jsonSavedContent = LoadData(autoSaveKey);

        var base = difflib.stringAsLines(editorInstance.getSnapshot());
        var newtxt = difflib.stringAsLines(jsonSavedContent.data);
        var sm = new difflib.SequenceMatcher(base, newtxt);
        var opcodes = sm.get_opcodes();

        dialog.getContentElement('general', 'diffContent').getElement().setHtml('<div class="diffContent">' + diffview.buildView({
            baseTextLines: base,
            newTextLines: newtxt,
            opcodes: opcodes,
            baseTextName: editorInstance.lang.autosave.loadedContent,
            newTextName: editorInstance.lang.autosave.autoSavedContent + (moment(jsonSavedContent.saveTime).locale(editorInstance.config.language).format(editorInstance.lang.autosave.dateFormat)) + '\'',
            contextSize: 3,
            viewType: dialog.getContentElement('general', 'diffType').getValue() == "inline" ? 1 : 0
        }).outerHTML + '</div>');
    }
})();
