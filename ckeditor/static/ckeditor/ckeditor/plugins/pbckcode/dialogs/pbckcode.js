CKEDITOR.dialog.add('pbckcodeDialog', function ( editor ) {
    "use strict";

    // if there is no user settings
    // create an empty object
    if(editor.config.pbckcode === undefined) {
        editor.config.pbckcode = {};
    }

    // default settings object
    var DEFAULT_SETTINGS = {
        cls   : '',
        modes :  [ ['HTML', 'html'], ['CSS', 'css'], ['PHP', 'php'], ['JS', 'javascript'] ],
        theme : 'textmate'
    };

    // merge user settings with default settings
    var settings = merge_settings(DEFAULT_SETTINGS, editor.config.pbckcode);

    // init vars
    var AceEditor,
        shighlighter = new PBSyntaxHighlighter(settings.highlighter);

    // dialog code
    return {
        // Basic properties of the dialog window: title, minimum size.
        title: editor.lang.pbckcode.title,
        minWidth: 600,
        minHeight: 400,
        // Dialog window contents definition.
        contents:
        [{
            id       : 'code-container',
            label    : editor.lang.pbckcode.title,
            elements :
            [{
                type      : 'select',
                id        : 'code-select',
                items     : settings.modes,
                'default' : settings.modes[0][1],
                setup     : function(element) {
                    if(element) {
                        element = element.getAscendant('pre', true);
                        this.setValue(element.getAttribute("data-pbcklang"));
                    }
                },
                commit    : function(element) {
                    if(element) {
                        element = element.getAscendant('pre', true);
                        element.setAttribute("data-pbcklang", this.getValue());
                    }
                },
                onChange  : function(element) {
                    AceEditor.getSession().setMode("ace/mode/" + this.getValue());
                }
            },
            {
                type  : 'html',
                html  : '<div id="code_' + editor.codeId + '"></div>',
                id    : 'code-textarea',
                style : 'position: absolute; top: 80px; left: 10px; right: 10px; bottom: 50px;',
                setup : function(element) {
                    // get the value of the editor
                    var code = element.getHtml();

                    // replace some regexp
                    code = code.replace(new RegExp('<br/>', 'g'), '\n');
                    code = code.replace(new RegExp('<br>', 'g'), '\n');
                    code = code.replace(new RegExp('&lt;', 'g'), '<');
                    code = code.replace(new RegExp('&gt;', 'g'), '>');
                    code = code.replace(new RegExp('&amp;', 'g'), '&');

                    AceEditor.setValue(code);
                },
                commit : function(element) {
                    element.setText(AceEditor.getValue());
                }
            }]
        }],
        onLoad : function() {
            // we load the ACE plugin to our div
            AceEditor = ace.edit("code_" + editor.codeId);
            AceEditor.getSession().setMode("ace/mode/" + settings.modes[0][1]);
            AceEditor.setTheme("ace/theme/" + settings.theme);

            // save the AceEditor into the editor object for the resize event
            editor.aceEditor = AceEditor;
        },
        onShow : function() {
            // get the selection
            var selection = editor.getSelection();
            // get the entire element
            var element = selection.getStartElement();

            // looking for the pre parent tag
            if(element) {
                element = element.getAscendant('pre', true);
            }
            // if there is no pre tag, it is an addition. Therefore, it is an edition
            if(!element || element.getName() !== 'pre') {
                element = new CKEDITOR.dom.element('pre');

                if(shighlighter.getTag() !== 'pre') {
                    element.append(new CKEDITOR.dom.element('code'));
                }
                this.insertMode = true;
            }
            else {
                if(shighlighter.getTag() !== 'pre') {
                    element = element.getChild(0);
                }
                this.insertMode = false;
            }
            // get the element to fill the inputs
            this.element = element;

            // we empty the editor
            AceEditor.setValue('');

            // we fill the inputs
            if(!this.insertMode) {
                this.setupContent(this.element);
            }
        },
        // This method is invoked once a user clicks the OK button, confirming the dialog.
        onOk : function() {
            var pre, element;
            pre = element = this.element;

            if(this.insertMode) {
                if(shighlighter.getTag()  !== 'pre') {
                    element = this.element.getChild(0);
                }
            } else {
                pre = element.getAscendant('pre', true);
            }

            this.commitContent(element);

            // set the full class to the code tag
            shighlighter.setCls(pre.getAttribute("data-pbcklang") + " " + settings.cls);

            element.setAttribute('class', shighlighter.getCls());

            // we add a new code tag into ckeditor editor
            if(this.insertMode) {
                editor.insertElement(pre);
            }
        }
    };
});

/*
 * Resize the ACE Editor
 */
CKEDITOR.dialog.on('resize', function(evt) {
    var AceEditor = evt.editor.aceEditor;
    if(AceEditor !== undefined) {
        AceEditor.resize();
    }
});

/**
 * Merge defaults settings with user settings
 * @param  {Object} dft the default object
 * @param  {Object} usr the user object
 * @return {Object} the merged object
 */
function merge_settings(dft, usr){
    "use strict";

    var obj3 = {};
    for (var attrname in dft) { obj3[attrname] = dft[attrname]; }
    for (var attrname in usr) { obj3[attrname] = usr[attrname]; }
    return obj3;
}