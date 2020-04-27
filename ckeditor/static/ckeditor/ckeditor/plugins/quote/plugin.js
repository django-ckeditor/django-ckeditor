/**
 * Quote Widget
 *
 * @author Ayhan Akilli
 */
'use strict';

(function (CKEDITOR) {
    /**
     * Plugin
     */
    CKEDITOR.plugins.add('quote', {
        requires: 'api,widget',
        icons: 'quote',
        hidpi: true,
        lang: 'de,en',
        init: function (editor) {
            /**
             * Widget
             */
            editor.widgets.add('quote', {
                button: editor.lang.quote.title,
                template: '<figure class="quote"><blockquote></blockquote><figcaption></figcaption></figure>',
                editables: {
                    quote: {
                        selector: 'blockquote'
                    },
                    caption: {
                        selector: 'figcaption',
                        allowedContent: {
                            a: {
                                attributes: {href: true},
                                requiredAttributes: {href: true}
                            },
                            br: true,
                            em: true,
                            strong: true
                        }
                    }
                },
                allowedContent: {
                    blockquote: true,
                    figcaption: true,
                    figure: {
                        classes: {quote: true},
                        requiredClasses: {quote: true}
                    }
                },
                requiredContent: 'figure(quote)',
                upcast: function (el) {
                    if (el.name !== 'blockquote' && (el.name !== 'figure' || !el.hasClass('quote'))) {
                        return false;
                    }

                    // Figure + Quote
                    var fig = el;

                    if (el.name === 'blockquote') {
                        fig = new CKEDITOR.htmlParser.element('figure', {class: 'quote'});
                        el.wrapWith(fig);
                    } else if (fig.children.length < 1 || fig.children[0].name !== 'blockquote') {
                        fig.add(new CKEDITOR.htmlParser.element('blockquote'), 0);
                    }

                    // Caption
                    if (fig.children.length < 2 || fig.children[1].name !== 'figcaption') {
                        fig.add(new CKEDITOR.htmlParser.element('figcaption'), 1);
                    }

                    fig.children = fig.children.slice(0, 2);

                    return fig;
                },
                downcast: function (el) {
                    // Quote
                    el.children[0].attributes = [];
                    el.children[0].setHtml(this.editables.quote.getData());
                    el.children[0].children.forEach(CKEDITOR.api.parser.remove);
                    this.editables.quote.setHtml(el.children[0].getHtml());

                    if (!el.children[0].getHtml().trim()) {
                        return new CKEDITOR.htmlParser.text('');
                    }

                    // Caption
                    el.children[1].attributes = [];
                    el.children[1].setHtml(this.editables.caption.getData());

                    return !el.children[1].getHtml().trim() ? el.children[0] : el;
                }
            });
        },
        onLoad: function () {
            CKEDITOR.addCss(
                'figure.quote {line-height: 1.5rem;margin: 0 0 1.5rem;text-align: center;border: 0.0625rem solid #ddd;border-radius: 0.5rem;}' +
                'figure.quote blockquote {padding: 2.25rem 0.75rem 0.75rem;color: #333;background: #f8f8f7;}' +
                'figure.quote blockquote::before {display: block;content: "🙷";font-family: serif;font-size: 6rem;}' +
                'figure.quote figcaption {font-size: 0.875rem;background: #eee;}' +
                'figure.quote .cke_widget_editable {outline: none !important;}'
            );
        }
    });
})(CKEDITOR);
