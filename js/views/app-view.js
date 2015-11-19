/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	var floorCollection = new app.Rooms()
	floorCollection.reset(app.rooms.where({floor: 1}))

	$('.floor-nav').on('click', function(ev) {
		$('.floor-nav').each(function(item) {
			$(this).removeClass('active')
			ev.currentTarget.className = ev.currentTarget.className + ' active'
		})
		var floorCollection = new app.Rooms()
		floorCollection.reset(app.rooms.where({floor: ev.currentTarget.value}))
		var floorMapView = new app.FloorMapView({
			el: '.floor-map-content',
			collection: floorCollection
		})
		floorMapView.render()
	})

	app.RoomView = Marionette.ItemView.extend({
	  template: Handlebars.compile($('#room-box-template').html()),
	  tagName: 'div',
	  className: 'room-box'
	})

	app.FloorMapView = Marionette.CollectionView.extend({
	  childView: app.RoomView,
		onBeforeRender () {
	    this.$el.empty()
	  }
	})

	app.MakeReservationView = Marionette.ItemView.extend({
		template: _.template($('#make-reservation-template').html()),
		ui: {
			'makeReservationSearch': '#make-reservation-search',
			'partySize': '#party-size',
			'roomType': '#room-type'
		},
		events: {
			'click @ui.makeReservationSearch': 'makeReservationSearch',
			'click #search-different-floor-btn': 'searchDifferentFloor',
			'click #make-reservation-btn': 'makeReservation'
		},
		initialize:function(){
			this.searchResult = new app.Rooms()
			this.maxCap = 0
		},
		triggerModalSuccess: function() {
			$('#make-reservation-success').html('<p> Room Available: '+ this.searchResult.pluck('roomNumber') + '</p><p>Please Click OK to make reservation.</p>')
			$('#make-reservation-success').removeClass('hidden')
			$('#make-reservation-error').addClass('hidden')
			$('#search-different-floor-btn').addClass('hidden')
			$('#make-reservation-btn').removeClass('hidden')
			//$('#make-reservation-btn').val(this.searchResult.pluck('roomNumber'))
			$('#make-reservation-modal').modal()
		},
		triggerModalError: function() {
			$('#make-reservation-error').html('<p>No available rooms found. Please try other room types.</p>')
			$('#make-reservation-error').removeClass('hidden')
			$('#make-reservation-success').addClass('hidden')
			$('#search-different-floor-btn').addClass('hidden')
			$('#make-reservation-btn').addClass('hidden')
			//$('#make-reservation-btn').val(this.searchResult.pluck('roomNumber'))
			$('#make-reservation-modal').modal()
		},
		makeReservation: function() {
			this.searchResult.each(function(item){
				item.set({'availability': false})
			})
			$('#make-reservation-success').html('<p>Reservation made successfully.</p>')
			$('#make-reservation-btn').addClass('hidden')
		},
		makeReservationSearch:function(ev) {
			var filteredCollection = new app.Rooms()
			filteredCollection.add(this.collection.where({roomType: this.ui.roomType.val(), availability: true}))
			var partySizeLeft = this.ui.partySize.val()
			this.maxCap = this.collection.where({roomType: this.ui.roomType.val()})[0].get('maxCap')
			if (partySizeLeft <= this.maxCap) {
				if (filteredCollection.models.length > 0) {
					this.searchResult.add(filteredCollection.models[0])
					this.triggerModalSuccess()
				}
			} else {

					if (filteredCollection.models.length > 0) {
						var result = this.findAdjacent(filteredCollection, partySizeLeft)
						while (!result && filteredCollection.models.length > 0) {
								result = this.findAdjacent(filteredCollection, partySizeLeft)
						}

						if (result === false) {
							$('#make-reservation-error').html('<p>No Adjacent Rooms available.</p><p>Please Click Continue if rooms in different floors are acceptable.</p>')
							$('#make-reservation-error').removeClass('hidden')
							$('#make-reservation-success').addClass('hidden')
							$('#search-different-floor-btn').removeClass('hidden')
							$('#make-reservation-btn').addClass('hidden')
							//$('#make-reservation-btn').val(this.searchResult.pluck('roomNumber'))
							$('#make-reservation-modal').modal()
						}
					} else {
						this.triggerModalError()
					}

			}
		},
		searchDifferentFloor: function() {
			filteredCollection.reset(this.collection.where({roomType: this.ui.roomType.val(), availability: true}))
			result = this.findMultiple(filteredCollection, partySizeLeft)
			if (result) {
				this.triggerModalSuccess()
			} else {
				this.triggerModalError()
			}
		},
		findAdjacent:function(collection, sizeLeft) {
				if (collection.models.length > 0) {
					this.searchResult.add(collection.remove(collection.at(0)))
					sizeLeft = sizeLeft - this.maxCap
					var floorIndex = this.searchResult.models[0].get('floor')
					var collectionAdjacent = new app.Rooms()

					collectionAdjacent.add(collection.where({floor: floorIndex}))
					if (sizeLeft > 0) {
						if (this.findAdjacent(collectionAdjacent, sizeLeft)){
							return true
						} else {
							return false
						}
					} else {
						return true
					}
				} else {
					this.searchResult.reset()
					return false
				}
			},
			findMultiple: function(collection, sizeLeft) {
				if (collection.models.length > 0) {
						this.searchResult.add(collection.remove(collection.at(0)))
						sizeLeft = sizeLeft - this.maxCap

						if (sizeLeft > 0) {
							if (this.findMultiple(collection, sizeLeft)){
								return true
							} else {
								return false
							}
						} else {
							return true
						}
					} else {
						this.searchResult.reset()
						return false
					}
			}

	});

	app.ManageReservationView = Marionette.ItemView.extend({
	  template: Handlebars.compile($('#manage-reservation-template').html()),
	  tagName: 'div',
	  className: 'manage-reservation',
	  ui: {
			'roomNumber': '#room-number-input',
			'checkRoomAvailability': '#check-room-availability',
			'cancelReservation': '#cancel-reservation'
		},
		events: {
			'click @ui.checkRoomAvailability': 'checkRoomAvailability',
			'click @ui.cancelReservation': 'cancelReservation'
		},
		cancelReservation: function() {
			$('#modal-info').modal({message:'hihi'})
			var thisRoom = this.collection.where({'roomNumber': this.ui.roomNumber.val(), availability: false})
			if (thisRoom.length <= 0) {
				$('#cancel-reservation-error').removeClass('hidden')
				$('#cancel-reservation-success').addClass('hidden')
				$('#cancel-reservation-modal').modal()
			} else {
				$('#cancel-reservation-error').addClass('hidden')
				$('#cancel-reservation-success').removeClass('hidden')
				$('#cancel-reservation-modal').modal()
				thisRoom[0].set('availability', true)
			}
		},
		checkRoomAvailability: function() {
 			var thisRoom = this.collection.where({'roomNumber': this.ui.roomNumber.val(), availability: true})
 			if (thisRoom.length > 0) {
 				$('#check-room-availability-error').addClass('hidden')
				$('#check-room-availability-success').removeClass('hidden')
				$('#check-room-availability-modal').modal()
 			} else {
 				$('#check-room-availability-error').removeClass('hidden')
				$('#check-room-availability-success').addClass('hidden')
				$('#check-room-availability-modal').modal()
 			}
		}
	})

	var floorMapView = new app.FloorMapView({
		el: '.floor-map-content',
		collection: floorCollection
	})
	floorMapView.render()

	var makeReservationView = new app.MakeReservationView({
		el: '.make-reservation-container',
		collection: app.rooms
	})
	makeReservationView.render()

	var manageReservationView  = new app.ManageReservationView({
		el: '.manage-reservation-container',
		collection: app.rooms
	})
	manageReservationView.render()

})(jQuery);
