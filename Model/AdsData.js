const mongoose = require("mongoose")

const root = mongoose.Schema({
    "native_1": {
        "type": "String"
    },
    "native_2": {
        "type": "String"
    },
    "interstitial_1": {
        "type": "String"
    },
    "interstitial_2": {
        "type": "String"
    },
    "banner_1": {
        "type": "String"
    },
    "banner_2": {
        "type": "String"
    },
    "app_open_1": {
        "type": "String"
    },
    "app_open_2": {
        "type": "String"
    },
    "reward_1": {
        "type": "String"
    },
    "ads_count": {
        "type": "String"
    },
    "version_code": {
        "type": "Number"
    },
    "MovePlayStore": {
        "type": "String"
    },
    "force_update": {
        "type": "Boolean"
    },
    "ads_platform": {
        "type": "String"
    },
    "facebook_native": {
        "type": "String"
    },
    "facebook_intern": {
        "type": "String"
    },
    "facebook_banner": {
        "type": "String"
    },
    "moredata": {
        "type": "String",
        default: ""
    },
    "app_id": {
        "type": "String",
        required: [true, "App id is required"],
        unique: true,
        index: true,
    },
    "created_at": {
        type: Number, required: true
    }
});

const adsdata = mongoose.model("AdsData", root)

module.exports = adsdata