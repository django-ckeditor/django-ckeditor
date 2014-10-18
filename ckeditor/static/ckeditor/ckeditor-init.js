;(function() {
  var $ = $ || django.jQuery;
  $(function() {
    initialiseCKEditor();
    initialiseCKEditorInInlinedForms();

    function initialiseCKEditorInInlinedForms() {
      $(document).on("click", ".add-row a, .grp-add-handler", function () {
        initialiseCKEditor();
        return true;
      });
    }

    function initialiseCKEditor() {
      $('textarea[data-type=ckeditortype]').each(function(){
        if($(this).data('processed') == "0" && $(this).attr('id').indexOf('__prefix__') == -1){
          $(this).data('processed',"1");
          CKEDITOR.replace($(this).attr('id'), $(this).data('config'));
        }
      });
    };
  });
}());
