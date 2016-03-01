//autoform addinputtype
AutoForm.addInputType('slingshotFileUpload', {
  template: 'afSlingshotFileInput',
  valueIn: function(files) {
    if (typeof(files) === 'undefined' || files === '' || files === null) {
      return [];
    }
    if (!_.isArray(files))
      files = [files];

    _.each(files, (file) => _.extend(file, {
      _id: new Mongo.ObjectID()._str
    }));

    return files;
  },
  valueOut: function() {
    let file = {};
    let field = $(this.context).find('input.af-file-input')[0];

    if ($(field).attr('multiple'))
      return fieldFiles.get(this.attr('data-schema-key'));
    else
      return fieldFiles.get(this.attr('data-schema-key'))[0];
  }
});
