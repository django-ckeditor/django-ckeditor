﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function()
{
	// Regex to scan for &nbsp; at the end of blocks, which are actually placeholders.
	// Safari transforms the &nbsp; to \xa0. (#4172)
	var tailNbspRegex = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/;

	var protectedSourceMarker = '{cke_protected}';

	// Return the last non-space child node of the block (#4344).
	function lastNoneSpaceChild( block )
	{
		var lastIndex = block.children.length,
			last = block.children[ lastIndex - 1 ];
		while (  last && last.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim( last.value ) )
			last = block.children[ --lastIndex ];
		return last;
	}

	function trimFillers( block, fromSource )
	{
		// If the current node is a block, and if we're converting from source or
		// we're not in IE then search for and remove any tailing BR node.
		//
		// Also, any &nbsp; at the end of blocks are fillers, remove them as well.
		// (#2886)
		var children = block.children, lastChild = lastNoneSpaceChild( block );
		if ( lastChild )
		{
			if ( ( fromSource || !CKEDITOR.env.ie ) && lastChild.type == CKEDITOR.NODE_ELEMENT && lastChild.name == 'br' )
				children.pop();
			if ( lastChild.type == CKEDITOR.NODE_TEXT && tailNbspRegex.test( lastChild.value ) )
				children.pop();
		}
	}

	function blockNeedsExtension( block )
	{
		var lastChild = lastNoneSpaceChild( block );
		return !lastChild || lastChild.type == CKEDITOR.NODE_ELEMENT && lastChild.name == 'br';
	}

	function extendBlockForDisplay( block )
	{
		trimFillers( block, true );

		if ( blockNeedsExtension( block ) )
		{
			if ( CKEDITOR.env.ie )
				block.add( new CKEDITOR.htmlParser.text( '\xa0' ) );
			else
				block.add( new CKEDITOR.htmlParser.element( 'br', {} ) );
		}
	}

	function extendBlockForOutput( block )
	{
		trimFillers( block );

		if ( blockNeedsExtension( block ) )
			block.add( new CKEDITOR.htmlParser.text( '\xa0' ) );
	}

	var dtd = CKEDITOR.dtd;

	// Find out the list of block-like tags that can contain <br>.
	var blockLikeTags = CKEDITOR.tools.extend( {}, dtd.$block, dtd.$listItem, dtd.$tableContent );
	for ( var i in blockLikeTags )
	{
		if ( ! ( 'br' in dtd[i] ) )
			delete blockLikeTags[i];
	}
	// We just avoid filler in <pre> right now.
	// TODO: Support filler for <pre>, line break is also occupy line height.
	delete blockLikeTags.pre;
	var defaultDataFilterRules =
	{
		attributeNames :
		[
			// Event attributes (onXYZ) must not be directly set. They can become
			// active in the editing area (IE|WebKit).
			[ ( /^on/ ), '_cke_pa_on' ]
		]
	};

	var defaultDataBlockFilterRules = { elements : {} };

	for ( i in blockLikeTags )
		defaultDataBlockFilterRules.elements[ i ] = extendBlockForDisplay;

	var defaultHtmlFilterRules =
		{
			elementNames :
			[
				// Remove the "cke:" namespace prefix.
				[ ( /^cke:/ ), '' ],

				// Ignore <?xml:namespace> tags.
				[ ( /^\?xml:namespace$/ ), '' ]
			],

			attributeNames :
			[
				// Attributes saved for changes and protected attributes.
				[ ( /^_cke_(saved|pa)_/ ), '' ],

				// All "_cke" attributes are to be ignored.
				[ ( /^_cke.*/ ), '' ],

				[ 'hidefocus', '' ]
			],

			elements :
			{
				$ : function( element )
				{
					var attribs = element.attributes;

					if ( attribs )
					{
						// Elements marked as temporary are to be ignored.
						if ( attribs.cke_temp )
							return false;

						// Remove duplicated attributes - #3789.
						var attributeNames = [ 'name', 'href', 'src' ],
							savedAttributeName;
						for ( var i = 0 ; i < attributeNames.length ; i++ )
						{
							savedAttributeName = '_cke_saved_' + attributeNames[ i ];
							savedAttributeName in attribs && ( delete attribs[ attributeNames[ i ] ] );
						}
					}

					return element;
				},

				embed : function( element )
				{
					var parent = element.parent;

					// If the <embed> is child of a <object>, copy the width
					// and height attributes from it.
					if ( parent && parent.name == 'object' )
					{
						var parentWidth = parent.attributes.width,
							parentHeight = parent.attributes.height;
						parentWidth && ( element.attributes.width = parentWidth );
						parentHeight && ( element.attributes.height = parentHeight );
					}
				},
				// Restore param elements into self-closing.
				param : function( param )
				{
					param.children = [];
					param.isEmpty = true;
					return param;
				},

				// Remove empty link but not empty anchor.(#3829)
				a : function( element )
				{
					if ( !( element.children.length ||
							element.attributes.name ||
							element.attributes._cke_saved_name ) )
					{
						return false;
					}
				},

				body : function( element )
				{
					delete element.attributes.spellcheck;
					delete element.attributes.contenteditable;
				},

				style : function( element )
				{
					var child = element.children[ 0 ];
					child && child.value && ( child.value = CKEDITOR.tools.trim( child.value ));

					if ( !element.attributes.type )
						element.attributes.type = 'text/css';
				},

				title : function( element )
				{
					element.children[ 0 ].value = element.attributes[ '_cke_title' ];
				}
			},

			attributes :
			{
				'class' : function( value, element )
				{
					// Remove all class names starting with "cke_".
					return CKEDITOR.tools.ltrim( value.replace( /(?:^|\s+)cke_[^\s]*/g, '' ) ) || false;
				}
			},

			comment : function( contents )
			{
				// If this is a comment for protected source.
				if ( contents.substr( 0, protectedSourceMarker.length ) == protectedSourceMarker )
				{
					// Remove the extra marker for real comments from it.
					if ( contents.substr( protectedSourceMarker.length, 3 ) == '{C}' )
						contents = contents.substr( protectedSourceMarker.length + 3 );
					else
						contents = contents.substr( protectedSourceMarker.length );

					return new CKEDITOR.htmlParser.cdata( decodeURIComponent( contents ) );
				}

				return contents;
			}
		};

	var defaultHtmlBlockFilterRules = { elements : {} };

	for ( i in blockLikeTags )
		defaultHtmlBlockFilterRules.elements[ i ] = extendBlockForOutput;

	if ( CKEDITOR.env.ie )
	{
		// IE outputs style attribute in capital letters. We should convert
		// them back to lower case.
		defaultHtmlFilterRules.attributes.style = function( value, element )
		{
			return value.toLowerCase();
		};
	}

	var protectAttributeRegex = /<(?:a|area|img|input)[\s\S]*?\s((?:href|src|name)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+)))/gi;

	var protectElementsRegex = /(?:<style(?=[ >])[^>]*>[\s\S]*<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
		encodedElementsRegex = /<cke:encoded>([^<]*)<\/cke:encoded>/gi;

	var protectElementNamesRegex = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
		unprotectElementNamesRegex = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi;

	var protectSelfClosingRegex = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi;

	function protectAttributes( html )
	{
		return html.replace( protectAttributeRegex, '$& _cke_saved_$1' );
	}

	function protectElements( html )
	{
		return html.replace( protectElementsRegex, function( match )
			{
				return '<cke:encoded>' + encodeURIComponent( match ) + '</cke:encoded>';
			});
	}

	function unprotectElements( html )
	{
		return html.replace( encodedElementsRegex, function( match, encoded )
			{
				return decodeURIComponent( encoded );
			});
	}

	function protectElementsNames( html )
	{
		return html.replace( protectElementNamesRegex, '$1cke:$2');
	}

	function unprotectElementNames( html )
	{
		return html.replace( unprotectElementNamesRegex, '$1$2' );
	}

	function protectSelfClosingElements( html )
	{
		return html.replace( protectSelfClosingRegex, '<cke:$1$2></cke:$1>' );
	}

	function protectRealComments( html )
	{
		return html.replace( /<!--(?!{cke_protected})[\s\S]+?-->/g, function( match )
			{
				return '<!--' + protectedSourceMarker +
						'{C}' +
						encodeURIComponent( match ).replace( /--/g, '%2D%2D' ) +
						'-->';
			});
	}

	function unprotectRealComments( html )
	{
		return html.replace( /<!--\{cke_protected\}\{C\}([\s\S]+?)-->/g, function( match, data )
			{
				return decodeURIComponent( data );
			});
	}

	function protectSource( data, protectRegexes )
	{
		var protectedHtml = [],
			tempRegex = /<\!--\{cke_temp(comment)?\}(\d*?)-->/g;

		var regexes =
			[
				// Script tags will also be forced to be protected, otherwise
				// IE will execute them.
				( /<script[\s\S]*?<\/script>/gi ),

				// <noscript> tags (get lost in IE and messed up in FF).
				/<noscript[\s\S]*?<\/noscript>/gi
			]
			.concat( protectRegexes );

		// First of any other protection, we must protect all comments
		// to avoid loosing them (of course, IE related).
		// Note that we use a different tag for comments, as we need to
		// transform them when applying filters.
		data = data.replace( (/<!--[\s\S]*?-->/g), function( match )
			{
				return  '<!--{cke_tempcomment}' + ( protectedHtml.push( match ) - 1 ) + '-->';
			});

		for ( var i = 0 ; i < regexes.length ; i++ )
		{
			data = data.replace( regexes[i], function( match )
				{
					match = match.replace( tempRegex, 		// There could be protected source inside another one. (#3869).
						function( $, isComment, id )
						{
							return protectedHtml[ id ];
						}
					);
					return  '<!--{cke_temp}' + ( protectedHtml.push( match ) - 1 ) + '-->';
				});
		}
		data = data.replace( tempRegex,	function( $, isComment, id )
			{
				return '<!--' + protectedSourceMarker +
						( isComment ? '{C}' : '' ) +
						encodeURIComponent( protectedHtml[ id ] ).replace( /--/g, '%2D%2D' ) +
						'-->';
			}
		);
		return data;
	}

	CKEDITOR.plugins.add( 'htmldataprocessor',
	{
		requires : [ 'htmlwriter' ],

		init : function( editor )
		{
			var dataProcessor = editor.dataProcessor = new CKEDITOR.htmlDataProcessor( editor );

			dataProcessor.writer.forceSimpleAmpersand = editor.config.forceSimpleAmpersand;

			dataProcessor.dataFilter.addRules( defaultDataFilterRules );
			dataProcessor.dataFilter.addRules( defaultDataBlockFilterRules );
			dataProcessor.htmlFilter.addRules( defaultHtmlFilterRules );
			dataProcessor.htmlFilter.addRules( defaultHtmlBlockFilterRules );
		}
	});

	CKEDITOR.htmlDataProcessor = function( editor )
	{
		this.editor = editor;

		this.writer = new CKEDITOR.htmlWriter();
		this.dataFilter = new CKEDITOR.htmlParser.filter();
		this.htmlFilter = new CKEDITOR.htmlParser.filter();
	};

	CKEDITOR.htmlDataProcessor.prototype =
	{
		toHtml : function( data, fixForBody )
		{
			// The source data is already HTML, but we need to clean
			// it up and apply the filter.

			data = protectSource( data, this.editor.config.protectedSource );

			// Before anything, we must protect the URL attributes as the
			// browser may changing them when setting the innerHTML later in
			// the code.
			data = protectAttributes( data );

			// Protect elements than can't be set inside a DIV. E.g. IE removes
			// style tags from innerHTML. (#3710)
			data = protectElements( data );

			// Certain elements has problem to go through DOM operation, protect
			// them by prefixing 'cke' namespace. (#3591)
			data = protectElementsNames( data );

			// All none-IE browsers ignore self-closed custom elements,
			// protecting them into open-close. (#3591)
			data = protectSelfClosingElements( data );

			// Call the browser to help us fixing a possibly invalid HTML
			// structure.
			var div = new CKEDITOR.dom.element( 'div' );
			// Add fake character to workaround IE comments bug. (#3801)
			div.setHtml( 'a' + data );
			data = div.getHtml().substr( 1 );

			// Unprotect "some" of the protected elements at this point.
			data = unprotectElementNames( data );

			data = unprotectElements( data );

			// Restore the comments that have been protected, in this way they
			// can be properly filtered.
			data = unprotectRealComments( data );

			// Now use our parser to make further fixes to the structure, as
			// well as apply the filter.
			var fragment = CKEDITOR.htmlParser.fragment.fromHtml( data, fixForBody ),
				writer = new CKEDITOR.htmlParser.basicWriter();

			fragment.writeHtml( writer, this.dataFilter );
			data = writer.getHtml( true );

			// Protect the real comments again.
			data = protectRealComments( data );

			return data;
		},

		toDataFormat : function( html, fixForBody )
		{
			var writer = this.writer,
				fragment = CKEDITOR.htmlParser.fragment.fromHtml( html, fixForBody );

			writer.reset();

			fragment.writeHtml( writer, this.htmlFilter );

			return writer.getHtml( true );
		}
	};
})();

/**
 * Whether to force using "&" instead of "&amp;amp;" in elements attributes
 * values. It's not recommended to change this setting for compliance with the
 * W3C XHTML 1.0 standards
 * (<a href="http://www.w3.org/TR/xhtml1/#C_12">C.12, XHTML 1.0</a>).
 * @type Boolean
 * @default false
 * @example
 * config.forceSimpleAmpersand = false;
 */
CKEDITOR.config.forceSimpleAmpersand = false;
