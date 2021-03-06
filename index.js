'use strict';
var execFile = require('child_process').execFile;
var titleize = require('titleize');

module.exports = function (cb) {
	if (process.platform !== 'linux') {
		throw new Error('Only Linux systems are supported');
	}

	execFile('xdg-mime', ['query', 'default', 'x-scheme-handler/http'], function (err, stdout) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, {
			name: titleize(stdout.trim().replace(/.desktop$/, '').replace('-', ' ')),
			id: stdout.trim()
		});
	});
};
