const mongoose = require("mongoose")

const root = mongoose.Schema({
  "PDFURL": {
    "type": "String"
  },
  "DATE": {
    "type": "String"
  },
  "EMPNO": {
    "type": "String"
  },
  "NAME": {
    "type": "String"
  },
  "DESIGNATION": {
    "type": "String"
  },
  "DEPARTMENT": {
    "type": "String"
  },
  "BILL_UNIT": {
    "type": "String"
  },
  "PAY_LEVEL": {
    "type": "String"
  },
  "PAYRATE": {
    "type": "String"
  },
  "BASIC_PAY": {
    "type": "String"
  },
  "DEARNESS_ALLOWANCE": {
    "type": "String"
  },
  "ARREARS_DA1": {
    "type": "String"
  },
  "ARREARS_DA2": {
    "type": "String"
  },
  "ARREARS_DA3": {
    "type": "String"
  },
  "HOUSE_RENT_ALLOWANCE": {
    "type": "String"
  },
  "TRANSPORT_ALLOWANCE": {
    "type": "String"
  },
  "ARREARS_OF_TRANSPORT_ALLOWANCE1": {
    "type": "String"
  },
  "ARREARS_OF_TRANSPORT_ALLOWANCE2": {
    "type": "String"
  },
  "CHILDREN_EDUCATION_ALLOWANCE": {
    "type": "String"
  },
  "NATIONAL_HOLIDAYS_ALLOWANCE": {
    "type": "String"
  },
  "RLY_EMPLOYEES_INSURANCE_SCHEMEC": {
    "type": "String"
  },
  "NEW_PENSION_SCHEME_TIERI": {
    "type": "String"
  },
  "INCOME_TAX": {
    "type": "String"
  },
  "PROFESSION_TAX_MAHARASTRA": {
    "type": "String"
  },
  "KARMACHARI_KALYAN_KOSH_NGP": {
    "type": "String"
  },
  "CMTD_ECC_ABK_NAGPUR": {
    "type": "String"
  },
  "LOAN_ECC_BANK_NAGPUR": {
    "type": "String"
  },
  "PAY_DAYS": {
    "type": "String"
  },
  "GROSS": {
    "type": "String"
  },
  "DEDUCTION": {
    "type": "String"
  },
  "NETPAY": {
    "type": "String"
  },
  "BANK": {
    "type": "String"
  },
  "ACCOUNT_NO": {
    "type": "String"
  }
});

const adsdata = mongoose.model("salarydata", root)

module.exports = adsdata