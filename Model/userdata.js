const mongoose = require("mongoose")

const root = mongoose.Schema({
    "employee_number": {
        "type": "String",
        required: [true, "App id is required"],
        unique: true,
        index: true,
    },
    "employee_password": {
        "type": "String",
        required: [true, "App id is required"],
    },
    "created_at": {
        type: Number, required: true
    }
});

const adsdata = mongoose.model("userdata", root)

module.exports = adsdata