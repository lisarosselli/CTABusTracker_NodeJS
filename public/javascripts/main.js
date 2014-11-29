console.log("main.js here");

requirejs.config({
  baseUrl: 'javascripts',
  paths: {
    jquery: 'jquery-2.1.0.min',
    Backbone: 'backbone-min'
  },
  shim: {
    'backbone-min': {
      deps: ['jquery', 'underscore-min'],
      exports: 'Backbone'
    }
  }
});

require(['jquery', 'underscore-min'], function() {
  require(['bootstrap.min', 'Backbone','async']);

});

/*
require.config({
    paths: {
        attractions: 'attractions',
        controller: 'controller',
        model: 'model',
        map: 'map',
        user: 'user',
        jquery: 'jquery-2.1.0.min',
        bootstrap: 'bootstrap.min',
        underscore: 'underscore-min',
        backbone: 'backbone-min',
        async: 'async'
    }
});
*/

/*
require(['async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCAD-IeK_FoKEM_5mmYq0DZf_p3dytgobA&sensor=true',
	'jquery', 
  'bootstrap',
  'underscore',
  'attractions',
  'backbone',
	'controller',
	'model',
	'user'], function(a, map, $, bootstrap, c, m, u, a) {
	console.log("Javascripts have been loaded.");
	
	initialize();
});
*/


// global variables/objects
var controller = undefined;
var model = undefined;
var map = undefined;
var user = undefined;

var navToggle = undefined;
var navOptions = undefined;

function initialize() {
	console.log("initialize");

	model = new Model();
	controller = new Controller();
	user = new User();

	var mapOptions = {
		center: new google.maps.LatLng(model.defaultAttraction.lat, model.defaultAttraction.lng), 
		disableDefaultUI: true,
		minZoom: 10,
		zoom: 16 
	}

	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	user.geolocate();


 	google.maps.event.addListener(map, 'click', function(e) {
    	console.log("map clicked! at "+e.latLng.lat()+", "+e.latLng.lng());

    	if (user.currentLocation.lat == null && user.currentLocation.lng == null)
    	{
    		user.setCurrentLocation(e.latLng.lat(), e.latLng.lng());
    	} else 
    	{
    		controller.chooseNewDestination(e.latLng.lat(), e.latLng.lng());
    		//user.setDestination(e.latLng.lat(), e.latLng.lng());
    	}
  	});

  	//$("#redoGeo").click(user.geolocate());

  	// old xhr request, now should move to node
  	/*
  	var xhr = createCORSRequest("GET", "http://www.ctabustracker.com/bustime/api/v1/getroutes?key="+model.apiKey);

  	if (!xhr) {
  		throw new Error("CORS not supported.");
  	} else {
  		console.log(xhr);
  		xhr.send();
  	}
  	*/

  	navToggle = document.getElementById("toggle");
  	navToggle.onclick = onToggleClick;

  	$("#nav").addClass("makeInvisible");
}

function onToggleClick() {
	console.log("onToggleClick");

	if ( $("#nav").hasClass("makeVisible") ) {
		$("#nav").removeClass("makeVisible");
		$("#nav").addClass("makeInvisible");
	} else {
		$("#nav").removeClass("makeInvisible");
		$("#nav").addClass("makeVisible");
	}
}




