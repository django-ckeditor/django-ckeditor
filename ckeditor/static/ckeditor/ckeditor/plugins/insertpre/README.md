CKEditor Insert &lt;pre&gt; Plugin
===============================

This plugin makes it easier to insert a &lt;pre&gt; tag in CKEditor.

Installation
------------

1. Clone/copy this repository contents in a new "plugins/insertpre" folder in your CKEditor installation.
2. Enable the "insertpre" plugin in the CKEditor configuration file (config.js):

        config.extraPlugins = 'insertpre';

That's all. "InsertPre" button will appear on the editor toolbar and will be ready to use.

3. Optionally, you may specify which class should be added to the &lt;pre&gt; element:

        CKEDITOR.config.insertpre_class = 'prettyprint';

   As well as specify how the &lt;pre&gt; tag should be rendered inside CKEditor:

		CKEDITOR.config.insertpre_style = 'background-color:#F8F8F8;border:1px solid #DDD;padding:10px;';

License
-------

Licensed under the terms of any of the following licenses at your choice: [GPL](http://www.gnu.org/licenses/gpl.html), [LGPL](http://www.gnu.org/licenses/lgpl.html) and [MPL](http://www.mozilla.org/MPL/MPL-1.1.html).
