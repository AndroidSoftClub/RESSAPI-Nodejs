const express = require('express')
const bodyParser = require('body-parser');
// const adslog = require('../Model/applogs');

let BADE_REQ_CODE = 400
let RESPONSE_VALIDE_CODE = 200

const router = new express.Router();

router.use(express.json()) // important to json data from req.body
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.get('/demo', async (req, res) => {
    res.status(RESPONSE_VALIDE_CODE).send({
        status: true,
        message: "One AdsLive Done :)"
    })
});

module.exports = router
