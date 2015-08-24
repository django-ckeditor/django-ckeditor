// Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
// For licensing, see LICENSE.md or http://ckeditor.com/license

CKEDITOR.plugins.add( 'wsc', {
	requires: 'dialog',
	lang: 'af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en-au,en-ca,en-gb,en,eo,es,et,eu,fa,fi,fo,fr-ca,fr,gl,gu,he,hi,hr,hu,is,it,ja,ka,km,ko,lt,lv,mk,mn,ms,nb,nl,no,pl,pt-br,pt,ro,ru,sk,sl,sr-latn,sr,sv,th,tr,ug,uk,vi,zh-cn,zh', // %REMOVE_LINE_CORE%
	icons: 'spellchecker', // %REMOVE_LINE_CORE%
	hidpi: true, // %REMOVE_LINE_CORE%
	parseApi: function(editor) {
		editor.config.wsc_onFinish = (typeof editor.config.wsc_onFinish === 'function') ? editor.config.wsc_onFinish : function() {};
		editor.config.wsc_onClose = (typeof editor.config.wsc_onClose === 'function') ? editor.config.wsc_onClose : function() {};
	},
	parseConfig: function(editor) {
		editor.config.wsc_customerId = editor.config.wsc_customerId || CKEDITOR.config.wsc_customerId || '1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk';
		editor.config.wsc_customDictionaryIds = editor.config.wsc_customDictionaryIds || CKEDITOR.config.wsc_customDictionaryIds || '';
		editor.config.wsc_userDictionaryName = editor.config.wsc_userDictionaryName || CKEDITOR.config.wsc_userDictionaryName || '';
		editor.config.wsc_customLoaderScript = editor.config.wsc_customLoaderScript || CKEDITOR.config.wsc_customLoaderScript;

		CKEDITOR.config.wsc_cmd = editor.config.wsc_cmd || CKEDITOR.config.wsc_cmd || 'spell'; // spell, thes or grammar. default tab
		CKEDITOR.config.wsc_version="v4.3.0-master-d769233";
		CKEDITOR.config.wsc_removeGlobalVariable = true;
	},
	init: function( editor ) {
		var commandName = 'checkspell';

		var strNormalDialog = 'dialogs/wsc.js',
			strIeDialog = 'dialogs/wsc_ie.js',
			strDialog,
			self = this,
			env = CKEDITOR.env;

		self.parseConfig(editor);
		self.parseApi(editor);
		var command = editor.addCommand( commandName, new CKEDITOR.dialogCommand( commandName ) );

		// SpellChecker doesn't work in Opera, with custom domain, IE Compatibility Mode and IE (8 & 9) Quirks Mode
		command.modes = { wysiwyg: ( !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname &&
			!( env.ie && ( env.version < 8 || env.quirks ) ) ) };

		if(typeof editor.plugins.scayt == 'undefined'){
			editor.ui.addButton && editor.ui.addButton( 'SpellChecker', {
				label: editor.lang.wsc.toolbar,
				click: function(editor) {
					var inlineMode = (editor.elementMode == CKEDITOR.ELEMENT_MODE_INLINE),
						text = inlineMode ? editor.container.getText() : editor.document.getBody().getText();

					text = text.replace(/\s/g, '');

					if(text) {
						editor.execCommand('checkspell');
					} else {
						alert('Nothing to check!');
					}
				},
				toolbar: 'spellchecker,10'
			});
		}


		if ( CKEDITOR.env.ie && CKEDITOR.env.version <= 7 ){
			strDialog = strIeDialog;
		} else {
			if (!window.postMessage) {
				strDialog = strIeDialog;
			} else {
				strDialog = strNormalDialog;
			}
		}
		CKEDITOR.dialog.add( commandName, this.path + strDialog );
	}

});

/**
 * The parameter sets the customer ID for WSC. It is used for hosted users only. It is required for migration from free
 * to trial or paid versions.
 *
 *		config.wsc_customerId  = 'encrypted-customer-id';
 *
 * @cfg {String} [wsc_customerId='1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk']
 * @member CKEDITOR.config
 */

/**
 * It links WSC to custom dictionaries. It should be a string with dictionary IDs
 * separated by commas (`','`). Available only for the licensed version.
 *
 * Further details at [http://wiki.webspellchecker.net/doku.php?id=installationandconfiguration:customdictionaries:licensed](http://wiki.webspellchecker.net/doku.php?id=installationandconfiguration:customdictionaries:licensed)
 *
 *		config.wsc_customDictionaryIds = '1,3001';
 *
 * @cfg {String} [wsc_customDictionaryIds='']
 * @member CKEDITOR.config
 */

/**
 * It activates a user dictionary for WSC. The user dictionary name should be used. Available only for the licensed version.
 *
 *		config.wsc_userDictionaryName = 'MyUserDictionaryName';
 *
 * @cfg {String} [wsc_userDictionaryName='']
 * @member CKEDITOR.config
 */

/**
 * The parameter sets the URL to WSC file. It is required to the licensed version of WSC application.
 *
 * Further details available at [http://wiki.webspellchecker.net/doku.php?id=migration:hosredfreetolicensedck](http://wiki.webspellchecker.net/doku.php?id=migration:hosredfreetolicensedck)
 *
 *		config.wsc_customLoaderScript = "http://my-host/spellcheck/lf/22/js/wsc_fck2plugin.js";
 *
 * @cfg {String} [wsc_customLoaderScript='']
 * @member CKEDITOR.config
 */

/**
 * The parameter sets the default spellchecking language for WSC.
 * Possible values are:
 * `'en_US'`, `'en_GB'`, `'pt_BR'`, `'da_DK'`,
 * `'nl_NL'`, `'en_CA'`, `'fi_FI'`, `'fr_FR'`,
 * `'fr_CA'`, `'de_DE'`, `'el_GR'`, `'it_IT'`,
 * `'nb_NO'`, `'pt_PT'`, `'es_ES'`, `'sv_SE'`.
 *
 * Further details available at [http://wiki.webspellchecker.net/doku.php?id=installationandconfiguration:supportedlanguages](http://wiki.webspellchecker.net/doku.php?id=installationandconfiguration:supportedlanguages)
 *
 *		config.wsc_lang = 'de_DE';
 *
 * @cfg {String} [wsc_lang='en_US']
 * @member CKEDITOR.config
 */

/**
 * The parameter sets the active tab, when the WSC dialog is opened.
 * Possible values are:
 * `'spell'`, `'thes'`, `'grammar'`.
 *
 *		// Sets active tab thesaurus.
 *		config.wsc_cmd  = 'thes';
 *
 * @cfg {String} [wsc_cmd='spell']
 * @member CKEDITOR.config
 */
