var up = new ReactiveVar({});

Template.afSlingshotFileInput.onCreated(function() {
	up.set(new Slingshot.Upload("myFileUploads"));
});

Template.afSlingshotFileInput.helpers({
	progress: function() {
		return Math.round(up.get().progress() * 100);
	},
  schemaKey: function() {
    return this.atts['data-schema-key'];
  }
});

Template.afSlingshotFileInput.events({
	'click a.open-file-browser-btn': function(e, t) {
		let input = $(e.currentTarget).parents('.file-drop').siblings('input.af-file-input');
		console.log(input);
		$(input).trigger('click');
		return false;
	},
	'change input.af-file-input': function(e, t) {
		console.log(e.currentTarget);
		var uploader = up.get();

		uploader.send(e.currentTarget.files[0], function (error, downloadUrl) {
		  if (error) {
		    // Log service detailed response.
		    console.error('Error uploading', uploader, error);
		    alert (error);
		  }
		  else {
		    $(e.currentTarget).attr('data-file-url', downloadUrl);
		  }
		});
	}
});