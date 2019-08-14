'use strict';

( function() {
  CKEDITOR.plugins.add( 'imageresponsive_quickupload', {
    requires: 'imageresponsive',
  });
  window.parent.CKEDITOR.tools.callFunction(callback, "/images/upload.jpg", function() {
  // Get the reference to a dialog window.
  var element, dialog = this.getDialog();
  console.log(dialog);
  // Check if this is the Image dialog window.
  if ( dialog.getName() == 'imageresponsive' ) {
     // Get the reference to a text field that holds the "srcset" attribute.
     element = dialog.getContentElement( 'info', 'srcset' );
     console.log(element);
     // Assign the new value.
     if ( element )
        element.setValue( 'upload-small.jpg 100w, upload-medium.jpg 500w, upload-big.jpg 1000w' );
    }});
} )();
