var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) 
{
  // Title => Name that we use in Title of page.
  res.render('index', { title: 'Express' });
});

module.exports = router;
