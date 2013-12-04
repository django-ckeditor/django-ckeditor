/*
 * @file HTML Buttons plugin for CKEditor
 * Copyright (C) 2012 Alfonso Martínez de Lizarrondo
 * A simple plugin to help create custom buttons to insert HTML blocks
 */

CKEDITOR.plugins.add( 'htmlbuttons',
{
	init : function( editor )
	{
		var buttonsConfig = editor.config.htmlbuttons;
		if (!buttonsConfig)
			return;

		function createCommand( definition )
		{
			return {
				exec: function( editor ) {
					editor.insertHtml( definition.html );
				}
			};
		}

		// Create the command for each button
		for(var i=0; i<buttonsConfig.length; i++)
		{
			var button = buttonsConfig[ i ];
			var commandName = button.name;
			editor.addCommand( commandName, createCommand(button, editor) );

			editor.ui.addButton( commandName,
			{
				label : button.title,
				command : commandName,
				icon : this.path + button.icon
			});
		}
	} //Init

} );

/**
 * An array of buttons to add to the toolbar.
 * Each button is an object with these properties:
 *	name: The name of the command and the button (the one to use in the toolbar configuration)
 *	icon: The icon to use. Place them in the plugin folder
 *	html: The HTML to insert when the user clicks the button
 *	title: Title that appears while hovering the button
 *
 * Default configuration with some sample buttons:
 */
CKEDITOR.config.htmlbuttons =  [
	{
		name:'button1',
		icon:'icon1.png',
		html:'<a href="http://www.google.com">Search something</a>',
		title:'A link to Google'
	},
	{
		name:'button2',
		icon:'icon2.png',
		html:'<table style="min-width:200px"><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table>',
		title:'A simple table'
	},
	{
		name:'button3',
		icon:'icon3.png',
		html:'<ol><li>Item 1 <ol><li>Sub item 1</li><li>Sub item 2</li></ol></li></ol>',
		title:'A nested list'
	}
];