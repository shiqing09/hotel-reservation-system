/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Room Collection
	var roomsData = [{
	"floor": 1,
	"room": 1,
	"roomNumber": "101",
	"maxCap": 1,
	"roomType": "studio",
	"availability": false
	},{
	"floor": 1,
	"room": 2,
	"roomNumber": "102",
	"maxCap": 1,
	"roomType": "studio",
	"availability": true
	},{
	"floor": 1,
	"room": 3,
	"roomNumber": "103",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": false
	},{
	"floor": 1,
	"room": 4,
	"roomNumber": "104",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 1,
	"room": 5,
	"roomNumber": "105",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 1,
	"room": 6,
	"roomNumber": "106",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 1,
	"room": 7,
	"roomNumber": "107",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 1,
	"room": 8,
	"roomNumber": "108",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	},{
	"floor": 1,
	"room": 9,
	"roomNumber": "109",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	},{
	"floor": 1,
	"room": 10,
	"roomNumber": "110",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	},{
	"floor": 2,
	"room": 1,
	"roomNumber": "201",
	"maxCap": 1,
	"roomType": "studio",
	"availability": true
	},{
	"floor": 2,
	"room": 2,
	"roomNumber": "202",
	"maxCap": 1,
	"roomType": "studio",
	"availability": true
	},{
	"floor": 2,
	"room": 3,
	"roomNumber": "203",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 2,
	"room": 4,
	"roomNumber": "204",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 2,
	"room": 5,
	"roomNumber": "205",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 2,
	"room": 6,
	"roomNumber": "206",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 2,
	"room": 7,
	"roomNumber": "207",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 2,
	"room": 8,
	"roomNumber": "208",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	},{
	"floor": 2,
	"room": 9,
	"roomNumber": "209",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	},{
	"floor": 2,
	"room": 10,
	"roomNumber": "210",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	},{
	"floor": 3,
	"room": 1,
	"roomNumber": "301",
	"maxCap": 1,
	"roomType": "studio",
	"availability": true
	},{
	"floor": 3,
	"room": 2,
	"roomNumber": "302",
	"maxCap": 1,
	"roomType": "studio",
	"availability": true
	},{
	"floor": 3,
	"room": 3,
	"roomNumber": "303",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 3,
	"room": 4,
	"roomNumber": "304",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 3,
	"room": 5,
	"roomNumber": "305",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 3,
	"room": 6,
	"roomNumber": "306",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 3,
	"room": 7,
	"roomNumber": "307",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 3,
	"room": 8,
	"roomNumber": "308",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	},{
	"floor": 3,
	"room": 9,
	"roomNumber": "309",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	},{
	"floor": 3,
	"room": 10,
	"roomNumber": "310",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	},{
	"floor": 4,
	"room": 1,
	"roomNumber": "401",
	"maxCap": 1,
	"roomType": "studio",
	"availability": true
	},{
	"floor": 4,
	"room": 2,
	"roomNumber": "402",
	"maxCap": 1,
	"roomType": "studio",
	"availability": true
	},{
	"floor": 4,
	"room": 3,
	"roomNumber": "403",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 4,
	"room": 4,
	"roomNumber": "404",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 4,
	"room": 5,
	"roomNumber": "405",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 4,
	"room": 6,
	"roomNumber": "406",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 4,
	"room": 7,
	"roomNumber": "407",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 4,
	"room": 8,
	"roomNumber": "408",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	},{
	"floor": 4,
	"room": 9,
	"roomNumber": "409",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	},{
	"floor": 4,
	"room": 10,
	"roomNumber": "410",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	},{
	"floor": 5,
	"room": 1,
	"roomNumber": "501",
	"maxCap": 1,
	"roomType": "studio",
	"availability": true
	},{
	"floor": 5,
	"room": 2,
	"roomNumber": "502",
	"maxCap": 1,
	"roomType": "studio",
	"availability": true
	},{
	"floor": 5,
	"room": 3,
	"roomNumber": "503",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 5,
	"room": 4,
	"roomNumber": "504",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 5,
	"room": 5,
	"roomNumber": "505",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 5,
	"room": 6,
	"roomNumber": "506",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 5,
	"room": 7,
	"roomNumber": "507",
	"maxCap": 2,
	"roomType": "deluxe",
	"availability": true
	},{
	"floor": 5,
	"room": 8,
	"roomNumber": "508",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	},{
	"floor": 5,
	"room": 9,
	"roomNumber": "509",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	},{
	"floor": 5,
	"room": 10,
	"roomNumber": "510",
	"maxCap": 4,
	"roomType": "executive",
	"availability": true
	}
]


app.Rooms = Backbone.Collection.extend({
	model: app.Room,
	localStorage: new Backbone.LocalStorage("rooms-collection")
});
// Create global collection
app.rooms = new app.Rooms(roomsData);
app.rooms.each(function(item) {
	item.save()
})

})();
