//autoform addinputtype
AutoForm.addInputType('slingshotFileUpload', {
  template: 'afSlingshotFileInput',
  valueIn: function(files) {
    return files;
  },
  valueOut: function() {
  	console.log(this);
    var field, files;
    field = $(this.context).find('input.af-file-input');
    files = field.attr('data-file-url');
    return files;
  }
});
