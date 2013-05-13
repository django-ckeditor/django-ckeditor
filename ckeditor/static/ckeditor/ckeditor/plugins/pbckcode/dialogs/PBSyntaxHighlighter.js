var PBSyntaxHighlighter = ( function() {
    "use strict";

    var sh;

    /**
     * Constructor
     * @param {String} sh The SyntaxHighlighter
     */
    function PBSyntaxHighlighter(sh) {
        switch(sh) {
            case "HIGHLIGHT" :
                this.sh = HIGHLIGHT;
                break;
            case "PRETTIFY" :
                this.sh = PRETTIFY;
                break;
            case "PRISM" :
                this.sh = PRISM;
                break;
            case "SYNTAX_HIGHLIGHTER" :
                this.sh = SYNTAX_HIGHLIGHTER;
                break;
            default :
                this.sh = {
                    _type  : "DEFAULT",
                    _cls : "",
                    _tag   : 'pre'
                }
                break;
        }
    }

    /**
     * Sets the SyntaxHighlighter type
     * @param {String} type The name of the SyntaxHighlighter
     */
    PBSyntaxHighlighter.prototype.setType = function(type) {
        this.sh._type = type;
    };

    /**
     * Gets the SyntaxHighlighter type
     * @return {String} The type of the SyntaxHighlighter
     */
    PBSyntaxHighlighter.prototype.getType = function() {
        return this.sh._type;
    };

    /**
     * Sets the full class of the SH object
     * @param {String} cls the class to add to the Object
     */
    PBSyntaxHighlighter.prototype.setCls = function(cls) {
        this.sh.cls = this.sh._cls + cls;
    };

    /**
     * Gets the full class of the SH Object
     * @return {String} the full class of the SH Object
     */
    PBSyntaxHighlighter.prototype.getCls = function() {
        return this.sh.cls;
    };

    /**
     * Get the tag to insert into the pre tag
     * @return {String} the tag to insert, pre otherwise
     */
    PBSyntaxHighlighter.prototype.getTag = function() {
        return this.sh._tag;
    };

    return PBSyntaxHighlighter;
})();



/**********************************/
/* SYNTAX HIGHLIGHTERS DEFINITION */
/**********************************/
var HIGHLIGHT = {
    _type : "HIGHLIGHT",
    _cls  : "", // only show language (done in pbckcode.js)
    _tag  : 'code'
}

var PRETTIFY = {
    _type : "PRETTIFY",
    _cls  : "prettyprint linenums lang-",
    _tag  : 'pre'
}

var PRISM = {
    _type : "PRISM",
    _cls  : "language-",
    _tag  : 'code'
};

var SYNTAX_HIGHLIGHTER = {
    _type : "SYNTAX_HIGHLIGHTER",
    _cls  : "brush: ",
    _tag  : 'pre'
}