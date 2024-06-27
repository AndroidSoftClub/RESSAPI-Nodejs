const mongoose = require("mongoose")

const root = mongoose.Schema({
    "empno": {
      "type": "String"
    },
    "name": {
      "type": "String"
    },
    "father_husband": {
      "type": "String"
    },
    "dbo": {
      "type": "String"
    },
    "mobile_no": {
      "type": "String"
    },
    "email": {
      "type": "String"
    },
    "aadhaar": {
      "type": "String"
    },
    "pan": {
      "type": "String"
    },
    "hrmsid": {
      "type": "String"
    },
    "au_rly": {
      "type": "String"
    },
    "bill_unit": {
      "type": "String"
    },
    "designation": {
      "type": "String"
    },
    "department": {
      "type": "String"
    },
    "doa": {
      "type": "String"
    },
    "doi": {
      "type": "String"
    },
    "dor": {
      "type": "String"
    },
    "emptype": {
      "type": "String"
    },
    "servicestatus": {
      "type": "String"
    },
    "station": {
      "type": "String"
    },
    "payrate": {
      "type": "String"
    },
    "level": {
      "type": "String"
    },
    "bank": {
      "type": "String"
    },
    "ifsc_code": {
      "type": "String"
    },
    "account_no": {
      "type": "String"
    },
    "employee_number":{
        "type": "String"
    }
  });

const adsdata = mongoose.model("biodata", root)

module.exports = adsdata