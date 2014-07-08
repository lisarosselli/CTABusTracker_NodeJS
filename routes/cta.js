var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('cta', { title: 'CTA Bus Tracker API Calls' });
  //res.render('cta.html');
});

module.exports = router;