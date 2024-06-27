const express = require('express')
const bodyParser = require('body-parser');
const userdata = require('../Model/userdata.js');
const biodata = require('../Model/biodata.js');
const salarydata = require('../Model/salarydata.js');
const cloudinary = require('cloudinary').v2

let BADE_REQ_CODE = 400
let RESPONSE_VALIDE_CODE = 200

const router = new express.Router();

router.use(express.json()) // important to json data from req.body
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.API_SECRET,

})

router.post('/uploademployeeimage', async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file, res, function (err) {
        if (err) {
            console.log(err);
            return res.send(err);
        }

        console.log(req.files); // An array of uploaded files from Cloudinary
        res.status(RESPONSE_VALIDE_CODE).send({
            status: true,
            message: 'Upload successful',
            data: req.files[0]
        });
    });

});

router.get('/demo', async (req, res) => {
    res.status(RESPONSE_VALIDE_CODE).send({
        status: true,
        message: "One AdsLive Done :)"
    })
});

router.post('/adduserdata', async (req, res) => {
    const userid = req.body.employee_number
    const password = req.body.employee_passowrd
    const createddate = new Date().getTime()
    const maindata = {
        "employee_number": userid,
        "employee_password": password,
        "created_at": createddate
    }

    const isUserExist = await userdata.findOne({ employee_number: userid })

    console.log(isUserExist)

    if (userid && password && isUserExist == null) {
        console.log(maindata)

        await userdata.insertMany(maindata)
            .then(function (data) {
                res.status(RESPONSE_VALIDE_CODE).send({
                    status: true,
                    data: {
                        "userdata": userid,
                        "password": password
                    },
                    message: "Data Inser Successfully"
                })
            })
            .catch(function (err) {
                res.status(BADE_REQ_CODE).send({
                    status: false,
                    message: err
                })
            });

    }
    else if (isUserExist) {
        res.status(BADE_REQ_CODE).send({
            status: false,
            message: "Employee Id already exist"
        })
    }
    else {
        res.status(BADE_REQ_CODE).send({
            status: false,
            message: "Enter the right user id & password"
        })
    }
    console.log(userdata, password)

    // const mresult = await userdata.insertMany(inserteddata, (error, done) => {
    //     if (error) {
    //         res.status(BADE_REQ_CODE).send({
    //             status: false,
    //             message: "Duplicate value error",
    //             error: error
    //         })
    //         console.log(error)
    //     } else {
    //         res.status(RESPONSE_VALIDE_CODE).send({
    //             status: true,
    //             message: "Data Insert successfully",
    //             data: inserteddata
    //         })
    //     }

});

router.post('/addbiodata', async (req, res) => {
    const userid = req.query.employee_number
    const isUserExist = await userdata.findOne({ employee_number: userid })
    const isBiodataExist = await biodata.findOne({ empno: userid })

    const maindata = {
        "empno": userid,
        "name": req.body.name,
        "father_husband": req.body.father_husband,
        "dbo": req.body.dbo,
        "mobile_no": req.body.mobile_no,
        "email": req.body.email,
        "aadhaar": req.body.aadhaar,
        "pan": req.body.pan,
        "hrmsid": req.body.hrmsid,
        "au_rly": req.body.au_rly,
        "bill_unit": req.body.bill_unit,
        "designation": req.body.designation,
        "department": req.body.department,
        "doa": req.body.doa,
        "doi": req.body.doi,
        "dor": req.body.dor,
        "emptype": req.body.emptype,
        "servicestatus": req.body.servicestatus,
        "station": req.body.station,
        "payrate": req.body.payrate,
        "level": req.body.level,
        "bank": req.body.bank,
        "ifsc_code": req.body.ifsc_code,
        "account_no": req.body.account_no
    }

    console.log(isUserExist, userid, isBiodataExist, req.body.empno)

    if (userid && isUserExist && isBiodataExist == null) {

        await biodata.insertMany(maindata)
            .then(function (data) {
                res.status(RESPONSE_VALIDE_CODE).send({
                    status: true,
                    data: req.body,
                    message: "Data Inser Successfully"
                })
            })
            .catch(function (err) {
                res.status(BADE_REQ_CODE).send({
                    status: false,
                    message: err
                })
            });

    }
    else if (isBiodataExist) {
        res.status(BADE_REQ_CODE).send({
            status: false,
            message: "Employee Id biodata is exist"
        })
    }
    else if (isUserExist == null) {
        res.status(BADE_REQ_CODE).send({
            status: false,
            message: "Employee Id is not exist"
        })
    }
    else {
        res.status(BADE_REQ_CODE).send({
            status: false,
            message: "Enter the right user id "
        })
    }
});

router.post('/addsalarydata', async (req, res) => {
    const userid = req.query.employee_number
    const isUserExist = await userdata.findOne({ employee_number: userid })

    const maindata = {
        "date": "10/11/2015",
        "empno": userid,
        "name": req.body.name,
        "designation": req.body.designation,
        "department": req.body.department,
        "billunit": req.body.billunit,
        "paylevel": req.body.paylevel,
        "payrate": req.body.payrate,
        "basicpay": req.body.basicpay,
        "dearness_allowance": req.body.dearness_allowance,
        "arrearsda": req.body.arrearsda,
        "arrearsda": req.body.arrearsda,
        "arrearsda": req.body.arrearsda,
        "house_rent_allowance": req.body.house_rent_allowance,
        "transport_allowance": req.body.transport_allowance,
        "arrears_of_transport_allowance": req.body.arrears_of_transport_allowance,
        "arrears_of_transport_allowance": req.body.arrears_of_transport_allowance,
        "children_education_allowance": req.body.children_education_allowance,
        "national_holidays_allowance": req.body.national_holidays_allowance,
        "rly_employees_insurance_scheme_c": req.body.rly_employees_insurance_scheme_c,
        "new_pension_scheme_tier_i": req.body.new_pension_scheme_tier_i,
        "income_tax": req.body.income_tax,
        "profession_tax_maharastra": req.body.profession_tax_maharastra,
        "karmachari_kalyan_kosh_ngp": req.body.karmachari_kalyan_kosh_ngp,
        "cmtd_ecc_abk_nagpur": req.body.cmtd_ecc_abk_nagpur,
        "loan_ecc_bank_nagpur": req.body.loan_ecc_bank_nagpur,
        "pay_days": req.body.pay_days,
        "gross": req.body.gross,
        "deduction": req.body.deduction,
        "netpay": req.body.netpay,
        "bank": req.body.bank,
        "account_no": req.body.account_no
    }
    console.log(isUserExist, userid, req.body.empno)

    if (userid && isUserExist) {

        await salarydata.insertMany(maindata)
            .then(function (data) {
                res.status(RESPONSE_VALIDE_CODE).send({
                    status: true,
                    data: req.body,
                    message: "Data Inser Successfully"
                })
            })
            .catch(function (err) {
                res.status(BADE_REQ_CODE).send({
                    status: false,
                    message: err
                })
            });

    }
    else if (isUserExist == null) {
        res.status(BADE_REQ_CODE).send({
            status: false,
            message: "Employee Id is not exist"
        })
    }
    else {
        res.status(BADE_REQ_CODE).send({
            status: false,
            message: "Enter the right user id "
        })
    }
});



module.exports = router
