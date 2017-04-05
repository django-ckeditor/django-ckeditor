(function() {
    var el = document.getElementsByClassName('django-ckeditor-widget');
    if (el.length && !window.CKEDITOR_BASEPATH) {
        window.CKEDITOR_BASEPATH = el[0].getAttribute('data-ckeditor-basepath');
    }
})();