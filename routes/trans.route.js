var express = require('express');

var controller = require('../controllers/trans.controller.js');

var router = express.Router();


router.get("/", controller.index);

router.get('/:id/complete', controller.complete);

router.post('/:id/complete', controller.postComplete);

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

module.exports = router;