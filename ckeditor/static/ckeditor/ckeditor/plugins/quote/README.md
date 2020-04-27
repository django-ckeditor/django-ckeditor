# Quote Widget

This widget can be used as an alternative to the [Blockquote Plugin](https://ckeditor.com/cke4/addon/blockquote). It allows to wrap a *blockquote* element within a *figure* element with the CSS class *quote* and to add a caption in order to *"clearly relate a quote to its attribution"* (see [WHATWG](https://html.spec.whatwg.org/multipage/grouping-content.html#the-blockquote-element)). 

So the resulting HTML will be 

    <figure class="quote>
        <blockquote>
            ...
        </blockquote>
        <figcaption>
            ...
        </figcaption>
    </figure>

If the caption is empty, the blockquote element will be unwrapped, so the resulting HTML will just be

    <blockquote>
        ...
    </blockquote>

## Demo

https://akilli.github.io/rte/ck4
