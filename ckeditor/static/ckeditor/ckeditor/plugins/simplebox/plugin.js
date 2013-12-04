CKEDITOR.plugins.add('simplebox', {
	requires: 'widget',
	icons: 'simplebox',

	init: function( editor ) {

		editor.widgets.add('simplebox', {
			button: 'Create a simple box'
		});

	}

});