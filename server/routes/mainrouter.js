var express = require('express');
var utils = require('../utils');
/*
 * Main Router
 */
var router = express.Router();

router.use('/images', express.static('./dist/images'));
router.use('/fonts', express.static('./dist/fonts'));
router.use('/js', express.static('./dist/js'));
router.use('/styles', express.static('./dist/styles'));
router.use('/views', express.static('./dist/views'));

router.get(['/*'], function(req, res) {
	res.sendFile('/dist/index.html', {root: './'});
});

module.exports = router;