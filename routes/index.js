var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'CTA BusTracker' });
  //res.render('index.html');
  //console.log('index.js route');
});

module.exports = router;
