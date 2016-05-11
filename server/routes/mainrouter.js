var express = require('express');
/*
 * Main Router
 */
var router = express.Router();

router.get(['/', '/login', '/tasks'], function(req, res) {
  res.sendFile('/dist/index.html', {root: './'});
});

router.use('/images', express.static('./dist/images'));
router.use('/fonts', express.static('./dist/fonts'));
router.use('/js', express.static('./dist/js'));
router.use('/styles', express.static('./dist/styles'));
router.use('/views', express.static('./dist/views'));

module.exports = router;