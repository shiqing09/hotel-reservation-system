/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Room Model
	app.Room = Backbone.Model.extend({
		defaults: {
			roomNumber: '',
			availability: true
		}
	});
})();
