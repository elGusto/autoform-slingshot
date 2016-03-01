/**
 * Package global var to store field values
 * @type {ReactiveDict}
 */
fieldFiles = new ReactiveDict();
let previousInitValue = null;

Template.afSlingshotFileInput.onCreated(function() {
	// // set init state of global var
	// if (this.data.value && this.data.value.length)
	// 	fieldFiles.set(this.data.atts['data-schema-key'], this.data.value);
	// else
	fieldFiles.set(this.data.atts['data-schema-key'], []);
});

Template.afSlingshotFileInput.onDestroyed(function() {
	//console.log('destroying ' + this.data.atts['data-schema-key']);
	fieldFiles.delete(this.data.atts['data-schema-key']);
});

Template.afSlingshotFileInput.onRendered(function() {
	//console.log('rendered');
});

Template.afSlingshotFileInput.helpers({
	files: function() {
		self = Template.currentData();

		let files = fieldFiles.get(self.atts['data-schema-key']);

		//check for update doc change
		if (typeof self.value !== 'undefined') {
			if (!_.isEqual(self.value, previousInitValue)) {
				fieldFiles.set(self.atts['data-schema-key'], self.value);
			} else {

			}
		}
		previousInitValue = self.value;
		//return self.value;
		return files;
	},
	fileName: function() {
		return this.name;
	},
	fileUrl: function() {
		return this.src;
	},
	fileIsImage: function() {
		return Boolean(this.type && this.type.split("/")[0] === "image");
	},
	fileUploading: function() {
		const template = Template.instance();
		return template.data.atts.slingshotUpload.status() === 'transferring';
	},
	progress: function() {
		let template = Template.instance();
		return Math.round(template.data.atts.slingshotUpload.progress() * 100);
	},
	schemaKey: function() {
		return this.atts['data-schema-key'];
	},
	multi: function() {
		return this.atts.multi;
	},
	replaceText: function() {
		let template = Template.currentData();
		let files = fieldFiles.get(template.atts['data-schema-key']);
		return !this.atts.multi && (typeof this.value !== 'undefined' || files.length >
			0) ? ' to replace current file.' : '';
	}
});

Template.afSlingshotFileInput.events({
	'click a.open-file-browser-btn': function(e, t) {
		let input = $(e.currentTarget).parents('.file-drop').siblings(
			'input.af-file-input');
		$(input).trigger('click');
		return false;
	},
	'change input.af-file-input': function(e, t) {
		var uploader = t.data.atts.slingshotUpload;

		// todo: check if multiple files selected
		uploader.send(e.currentTarget.files[0], function(error, downloadUrl) {
			if (error) {
				// Log service detailed response.
				console.error('Error uploading', uploader, error);
				alert(error);
			} else {
				if (typeof t.data.value === 'undefined')
					t.data.value = [];

				if (typeof t.data.atts.multi === 'undefined' || !t.data.atts.multi)
					fieldFiles.set(t.data.atts['data-schema-key'], []);

				let files = fieldFiles.get(t.data.atts['data-schema-key']);
				files.push({
					_id: new Mongo.ObjectID()._str,
					src: downloadUrl,
					name: e.currentTarget.files[0].name,
					type: e.currentTarget.files[0].type,
					size: e.currentTarget.files[0].size
				});
				fieldFiles.set(t.data.atts['data-schema-key'], files);
			}
		});
	},
	'click a.delete-file': function(e, t) {
		let fileId = $(e.currentTarget).attr('data-file-id');
		let files = fieldFiles.get(t.data.atts['data-schema-key']);
		files = _.reject(files, (file) => file._id === fileId);

		fieldFiles.set(t.data.atts['data-schema-key'], files);

		//remove from input because chrome doesnt trigger change if deleting file and reuploading it
		let $input = $(e.currentTarget).parents('.form-group').find(
			'input.af-file-input');
		$input[0].value = '';
		return false;
	}
});
