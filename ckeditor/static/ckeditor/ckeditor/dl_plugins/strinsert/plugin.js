/**
 * @license Copyright © 2013 Stuart Sillitoe <stuart@vericode.co.uk>
 * This work is mine, and yours. You can modify it as you wish.
 *
 * Stuart Sillitoe
 * stuartsillitoe.co.uk
 *
 */

CKEDITOR.plugins.add('strinsert',
{
	requires : ['richcombo'],
	init : function( editor )
	{
		//  array of strings to choose from that'll be inserted into the editor
		var strings = [];
		strings.push(['@@FAQ::displayList()@@', 'FAQs', 'FAQs']);
		strings.push(['@@Glossary::displayList()@@', 'Glossary', 'Glossary']);
		strings.push(['@@CareerCourse::displayList()@@', 'Career Courses', 'Career Courses']);
		strings.push(['@@CareerProfile::displayList()@@', 'Career Profiles', 'Career Profiles']);

		// add the menu to the editor
		editor.ui.addRichCombo('strinsert',
		{
			label: 		'Insert Content',
			title: 		'Insert Content',
			voiceLabel: 'Insert Content',
			className: 	'cke_format',
			multiSelect:false,
			panel:
			{
				css: [ editor.config.contentsCss, CKEDITOR.skin.getPath('editor') ],
				voiceLabel: editor.lang.panelVoiceLabel
			},

			init: function()
			{
				this.startGroup( "Insert Content" );
				for (var i in strings)
				{
					this.add(strings[i][0], strings[i][1], strings[i][2]);
				}
			},

			onClick: function( value )
			{
				editor.focus();
				editor.fire( 'saveSnapshot' );
				editor.insertHtml(value);
				editor.fire( 'saveSnapshot' );
			}
		});
	}
});