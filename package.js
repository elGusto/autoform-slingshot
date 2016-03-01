Package.describe({
  name: 'elgusto:autoform-slingshot',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'templating',
    'reactive-var',
    'reactive-dict',
    'edgee:slingshot@0.7.1',
    'aldeed:autoform@5.0.0'
  ]);

  api.addFiles([
    'afSlingshotFileInput.html',
    'afSlingshotFileInput.js',
    'afSlingshotFileInput.css',
    'autoform.js'
  ], 'client');

  api.export(['FileSchema']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('elgusto:autoform-slingshot');
  api.addFiles('autoform-slingshot-tests.js');
});
