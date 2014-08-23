var express = require('express');
var router = express.Router();
var request = require('request');

// api url and key
var lr_api_key = "dcBun75XjwhPmnAkv8tQFa2xb";
var and_key = "?key=" + lr_api_key;
var base_url = "http://www.ctabustracker.com/bustime/api/v1/";

// index
router.get('/', function(req, res) {
	var apicall = req.query.apicall;
	var urlParams = req.query.urlParams; // params is an array

	console.log("apicall = "+apicall);

	var p = '';

	//http://www.ctabustracker.com/bustime/api/v1/getvehicles/rt=156?key=dcBun75XjwhPmnAkv8tQFa2xb
	// should be
	// http://www.ctabustracker.com/bustime/api/v1/getvehicles?key=dcBun75XjwhPmnAkv8tQFa2xb&rt=36

	//http://www.ctabustracker.com/bustime/api/v1/getvehicles?rt=20&key=dcBun75XjwhPmnAkv8tQFa2xb

	console.log(urlParams);

	/*
	if (urlParams) {
		p += '&';
		for (var pName in urlParams) {
			p += pName;
			p += '=';
			p += urlParams[pName];
	      //console.log(pName);
	      //console.log(parameters.params[pName]);
	    }
	}
	*/

	var parameterString = "";

	for (var i=0; i < urlParams.length; i++) {
		console.log("for param in urlParams!");
		console.log(urlParams[i]);
		parameterString += "&";
		parameterString += urlParams[i];
	}

	var url = base_url + apicall + and_key + parameterString;

	console.log(url);

	request(url, function(err, resp, body) {
		if (err) {
			res.send(err);
			return;
		}

		//console.log(body);
		res.send(body);
	});
});

module.exports = router;