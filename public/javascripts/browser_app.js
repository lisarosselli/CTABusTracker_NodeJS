/* entry point for front-end portion of app */
var app = {
	apiKey: "dcBun75XjwhPmnAkv8tQFa2xb",
	defaultAttraction: ATTRACTIONS[0],
	googleMap: undefined,
	googleMapView: undefined,
	logger: undefined,
	user: undefined
};



/* Model Components *************/
var GoogleMap = Backbone.Model.extend({
	initialize: function() {
		app.logger.log("new GoogleMap");
	},
	defaults: {
		mapOptions: undefined,
		map: undefined
	}
});

var User = Backbone.Model.extend({
	initialize: function() {
		app.logger.log("new User");
	}
});
/* end Model Components *********/




/* View Components *************/
var GoogleMapView = Backbone.View.extend({
	tagname: "div",
	id: "#map-canvas",
	events: {

	},
	initialize: function() {
		console.log("new googleMapView");
	}
});




/* end View Components *********/




function defaultMapOptions() {
	var o = {};
	o.center = new google.maps.LatLng(app.defaultAttraction.lat, app.defaultAttraction.lng);
	o.disableDefaultUI = true;
	o.minZoom = 10;
	o.zoom = 16; 
	return o;
}

function mapView(googleMapObj) {
	var o = new google.maps.Map(document.getElementById("map-canvas"), 
				googleMapObj.get('mapOptions'));
	return o;
}

function initialize() {
	if (Logger) {
		app.logger = new Logger();
	}

	app.googleMap = new GoogleMap();
	app.googleMap.set('mapOptions', defaultMapOptions());
	app.googleMap.set('map', mapView(app.googleMap));

	app.googleMapView = new GoogleMapView();


	app.user = new User();


}
