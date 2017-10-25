( function() {
	function addCombo( editor, comboName, styleType, lang, entries, defaultLabel, styleDefinition, order ) {
		var config = editor.config,style = new CKEDITOR.style( styleDefinition );		
		var names = entries.split( ';' ),values = [];		
		var styles = {};
		for ( var i = 0; i < names.length; i++ ) {
			var parts = names[ i ];
			if ( parts ) {
				parts = parts.split( '/' );
				var vars = {},name = names[ i ] = parts[ 0 ];
				vars[ styleType ] = values[ i ] = parts[ 1 ] || name;
				styles[ name ] = new CKEDITOR.style( styleDefinition, vars );
				styles[ name ]._.definition.name = name;
			} else
				names.splice( i--, 1 );
		}
		editor.ui.addRichCombo( comboName, {
			label: editor.lang.lineheight.title,
			title: editor.lang.lineheight.title,
			toolbar: 'styles,' + order,
			allowedContent: style,
			requiredContent: style,
			panel: {
				css: [ CKEDITOR.skin.getPath( 'editor' ) ].concat( config.contentsCss ),
				multiSelect: false,
				attributes: { 'aria-label': editor.lang.lineheight.title }
			},
			init: function() {
				this.startGroup(editor.lang.lineheight.title);
				for ( var i = 0; i < names.length; i++ ) {
					var name = names[ i ];					
					this.add( name, styles[ name ].buildPreview(), name );
				}
			},
			onClick: function( value ) {
				editor.focus();
				editor.fire( 'saveSnapshot' );
				var style = styles[ value ];
				editor[ this.getValue() == value ? 'removeStyle' : 'applyStyle' ]( style );
				editor.fire( 'saveSnapshot' );
			},
			onRender: function() {
				editor.on( 'selectionChange', function( ev ) {
					var currentValue = this.getValue();
					var elementPath = ev.data.path,elements = elementPath.elements;
					for ( var i = 0, element; i < elements.length; i++ ) {
						element = elements[ i ];
						for ( var value in styles ) {
							if ( styles[ value ].checkElementMatch( element, true, editor ) ) {
								if ( value != currentValue )
									this.setValue( value );
								return;
							}
						}
					}
					this.setValue( '', defaultLabel );
				}, this );
			},
			refresh: function() {
				if ( !editor.activeFilter.check( style ) )
					this.setState( CKEDITOR.TRISTATE_DISABLED );
			}
		} );
	}
	CKEDITOR.plugins.add( 'lineheight', {
		requires: 'richcombo',
		lang: 'ar,de,en,es,fr,ko,pt,zh,zh-cn',
		init: function( editor ) {
			var config = editor.config;
			addCombo( editor, 'lineheight', 'size', editor.lang.lineheight.title, config.line_height, editor.lang.lineheight.title, config.lineHeight_style, 40 );
		}
	} );
} )();
CKEDITOR.config.line_height = '0.5px;1em;1.5em;2em;2.5em;3em;3.5em;4em;4.5em;5em;5.5em;6em;6.5em;7em;7.5em;8em;8.5em;9em;9.5em;10em;10.5em;11em;11.5em;12em;12.5em;13em;13.5em;' +
	'14em;14.5em;15;16;17;18;19;20;';
CKEDITOR.config.lineHeight_style = {
	element: 'span',
	styles: { 'line-height': '#(size)' },
	overrides: [ {
		element: 'line-height', attributes: { 'size': null }
	} ]
};
