jQuery(function(){

    function initCKEditor(){
        $('textarea[data-type=ckeditortype]').each(function(){
            if($(this).data('processed') == "0" && $(this).attr('id').indexOf('__prefix__') == -1){
                $(this).data('processed',"1");
                CKEDITOR.replace($(this).attr('id'), $(this).data('config'));
            }
        });
    }

    initCKEditor();

    $(".add-row a").click(function(){
        initCKEditor();
        return true;
    });

});
