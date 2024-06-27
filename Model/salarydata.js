const mongoose = require("mongoose")

const root = mongoose.Schema({
  "date": {
    "type": "Date"
  },
  "empno": {
    "type": "String"
  },
  "name": {
    "type": "String"
  },
  "designation": {
    "type": "String"
  },
  "department": {
    "type": "String"
  },
  "billunit": {
    "type": "String"
  },
  "paylevel": {
    "type": "String"
  },
  "payrate": {
    "type": "String"
  },
  "basicpay": {
    "type": "String"
  },
  "dearness_allowance": {
    "type": "String"
  },
  "arrearsda": {
    "type": "String"
  },
  "house_rent_allowance": {
    "type": "String"
  },
  "transport_allowance": {
    "type": "String"
  },
  "arrears_of_transport_allowance": {
    "type": "String"
  },
  "children_education_allowance": {
    "type": "String"
  },
  "national_holidays_allowance": {
    "type": "String"
  },
  "rly_employees_insurance_scheme_c": {
    "type": "String"
  },
  "new_pension_scheme_tier_i": {
    "type": "String"
  },
  "income_tax": {
    "type": "String"
  },
  "profession_tax_maharastra": {
    "type": "String"
  },
  "karmachari_kalyan_kosh_ngp": {
    "type": "String"
  },
  "cmtd_ecc_abk_nagpur": {
    "type": "String"
  },
  "loan_ecc_bank_nagpur": {
    "type": "String"
  },
  "pay_days": {
    "type": "String"
  },
  "gross": {
    "type": "String"
  },
  "deduction": {
    "type": "String"
  },
  "netpay": {
    "type": "String"
  },
  "bank": {
    "type": "String"
  },
  "account_no": {
    "type": "String"
  }
});

const adsdata = mongoose.model("salarydata", root)

module.exports = adsdata