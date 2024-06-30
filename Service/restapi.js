const express = require('express')
const bodyParser = require('body-parser');
const userdata = require('../Model/userdata.js');
const biodata = require('../Model/biodata.js');
const salarydata = require('../Model/salarydata.js');
const multer = require('multer');
const path = require('path');


let BADE_REQ_CODE = 200
let RESPONSE_VALIDE_CODE = 200

const router = new express.Router();

router.use(express.json()) // important to json data from req.body
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const storageforimage = multer.diskStorage({
    destination: './user_profiles/', // Change this directory to your desired location
    filename: function (req, file, cb) {
        cb(null, (Date.now() / 1000) + '-' + file.originalname); // Create unique filename
    }
});


const storageforpdf = multer.diskStorage({
    destination: './user_salary_pdf/', // Change this directory to your desired location
    filename: function (req, file, cb) {
        cb(null, (Date.now() / 1000) + '-' + file.originalname); // Create unique filename
    }
});

const uploadbulkimages = multer({
    storage: storageforimage,
    fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.png', '.jpg', '.jpeg'];
        const extension = path.extname(file.originalname).toLowerCase();

        if (allowedExtensions.includes(extension)) {
            cb(null, true); // Valid extension
        } else {
            cb(new multer.MulterError('LIMIT_FILE_TYPE', 'Only PNG and JPG files are allowed.'));
        }
    }
}).array('file', 1);;


const uploadpdffile = multer({
    storage: storageforpdf,
    fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.pdf'];
        const extension = path.extname(file.originalname).toLowerCase();

        if (allowedExtensions.includes(extension)) {
            cb(null, true); // Valid extension
        } else {
            cb(new multer.MulterError('LIMIT_FILE_TYPE', 'Only PDF files are allowed.'));
        }
    }
}).array('file', 1);;

// const upload = multer({ storage: storage }); // Create Multer instance
// const uploadbulkimages = multer({ storage: storage }).array('file', 1);

router.post('/uploadsalarypdf', async (req, res) => {
    const userid = req.query.employee_number
    const salarydate = req.query.DATE

    const isUserExist = await userdata.findOne({ employee_number: userid })
    const isSalarydataExist = await salarydata.findOne({ EMPNO: userid })

    console.log(isSalarydataExist)

    if (salarydate && isUserExist && isSalarydataExist == null) {

        uploadpdffile(req, res, async function (err) {
            const mfile = req.files || ""
            // console.log("-----", mfile)
            if (mfile == "") {
                return res.status(BADE_REQ_CODE).send({
                    status: false,
                    message: "PDF Not Found",
                })
            }

            // http://13.200.131.30:8080/user_salary_pdf/
            const filename = "http://13.200.131.30:8080/user_salary_pdf/" + req.files[0].filename

            const salarydatamain =
            {
                "PDFURL": filename,
                "DATE": req.query.DATE,
                "EMPNO": userid,
                "NAME": req.body.NAME,
                "DESIGNATION": req.body.DESIGNATION,
                "DEPARTMENT": req.body.DEPARTMENT,
                "PAY_LEVEL": req.body.PAY_LEVEL,
                "PAYRATE": req.body.PAYRATE,
                "BASIC_PAY": req.body.BASIC_PAY,
                "DEARNESS_ALLOWANCE": req.body.DEARNESS_ALLOWANCE,
                "ARREARS_DA1": req.body.ARREARS_DA1,
                "ARREARS_DA2": req.body.ARREARS_DA2,
                "ARREARS_DA3": req.body.ARREARS_DA3,
                "HOUSE_RENT_ALLOWANCE": req.body.HOUSE_RENT_ALLOWANCE,
                "TRANSPORT_ALLOWANCE": req.body.TRANSPORT_ALLOWANCE,
                "ARREARS_OF_TRANSPORT_ALLOWANCE1": req.body.ARREARS_OF_TRANSPORT_ALLOWANCE1,
                "ARREARS_OF_TRANSPORT_ALLOWANCE2": req.body.ARREARS_OF_TRANSPORT_ALLOWANCE2,
                "CHILDREN_EDUCATION_ALLOWANCE": req.body.CHILDREN_EDUCATION_ALLOWANCE,
                "NATIONAL_HOLIDAYS_ALLOWANCE": req.body.NATIONAL_HOLIDAYS_ALLOWANCE,
                "RLY_EMPLOYEES_INSURANCE_SCHEMEC": req.body.RLY_EMPLOYEES_INSURANCE_SCHEMEC,
                "NEW_PENSION_SCHEME_TIERI": req.body.NEW_PENSION_SCHEME_TIERI,
                "INCOME_TAX": req.body.INCOME_TAX,
                "PROFESSION_TAX_MAHARASTRA": req.body.PROFESSION_TAX_MAHARASTRA,
                "KARMACHARI_KALYAN_KOSH_NGP": req.body.KARMACHARI_KALYAN_KOSH_NGP,
                "CMTD_ECC_ABK_NAGPUR": req.body.CMTD_ECC_ABK_NAGPUR,
                "LOAN_ECC_BANK_NAGPUR": req.body.LOAN_ECC_BANK_NAGPUR,
                "PAY_DAYS": req.body.PAY_DAYS,
                "GROSS": req.body.GROSS,
                "DEDUCTION": req.body.DEDUCTION,
                "NETPAY": req.body.NETPAY,
                "BANK": req.body.BANK,
                "ACCOUNT_NO": req.body.ACCOUNT_NO
            }

            await salarydata.insertMany(salarydatamain)
                .then(function (data) {
                    res.status(RESPONSE_VALIDE_CODE).send({
                        status: true,
                        message: "Data Inser Successfully",
                        data: salarydatamain,
                    })
                })
                .catch(function (err) {
                    res.status(BADE_REQ_CODE).send({
                        status: false,
                        message: err
                    })
                });
        })
    }
    else if (salarydate == null) {
        res.status(BADE_REQ_CODE).send({
            status: false,
            message: "Salary Date is required"
        })
    }
    else if (isSalarydataExist) {

        console.log("----", isSalarydataExist.DATE, req.query.DATE, (isSalarydataExist.DATE != req.query.DATE));

        if (isSalarydataExist.DATE != req.query.DATE) {
            uploadpdffile(req, res, async function (err) {
                const mfile = req.files || ""
                if (mfile == "") {
                    return res.status(BADE_REQ_CODE).send({
                        status: false,
                        message: "PDF Not Found",
                    })
                }

                // http://13.200.131.30:8080/user_salary_pdf/
                const filename = "http://13.200.131.30:8080/user_salary_pdf/" + req.files[0].filename

                const salarydatamain =
                {
                    "PDFURL": filename,
                    "DATE": req.query.DATE,
                    "EMPNO": userid,
                    "NAME": req.body.NAME,
                    "DESIGNATION": req.body.DESIGNATION,
                    "DEPARTMENT": req.body.DEPARTMENT,
                    "PAY_LEVEL": req.body.PAY_LEVEL,
                    "PAYRATE": req.body.PAYRATE,
                    "BASIC_PAY": req.body.BASIC_PAY,
                    "DEARNESS_ALLOWANCE": req.body.DEARNESS_ALLOWANCE,
                    "ARREARS_DA1": req.body.ARREARS_DA1,
                    "ARREARS_DA2": req.body.ARREARS_DA2,
                    "ARREARS_DA3": req.body.ARREARS_DA3,
                    "HOUSE_RENT_ALLOWANCE": req.body.HOUSE_RENT_ALLOWANCE,
                    "TRANSPORT_ALLOWANCE": req.body.TRANSPORT_ALLOWANCE,
                    "ARREARS_OF_TRANSPORT_ALLOWANCE1": req.body.ARREARS_OF_TRANSPORT_ALLOWANCE1,
                    "ARREARS_OF_TRANSPORT_ALLOWANCE2": req.body.ARREARS_OF_TRANSPORT_ALLOWANCE2,
                    "CHILDREN_EDUCATION_ALLOWANCE": req.body.CHILDREN_EDUCATION_ALLOWANCE,
                    "NATIONAL_HOLIDAYS_ALLOWANCE": req.body.NATIONAL_HOLIDAYS_ALLOWANCE,
                    "RLY_EMPLOYEES_INSURANCE_SCHEMEC": req.body.RLY_EMPLOYEES_INSURANCE_SCHEMEC,
                    "NEW_PENSION_SCHEME_TIERI": req.body.NEW_PENSION_SCHEME_TIERI,
                    "INCOME_TAX": req.body.INCOME_TAX,
                    "PROFESSION_TAX_MAHARASTRA": req.body.PROFESSION_TAX_MAHARASTRA,
                    "KARMACHARI_KALYAN_KOSH_NGP": req.body.KARMACHARI_KALYAN_KOSH_NGP,
                    "CMTD_ECC_ABK_NAGPUR": req.body.CMTD_ECC_ABK_NAGPUR,
                    "LOAN_ECC_BANK_NAGPUR": req.body.LOAN_ECC_BANK_NAGPUR,
                    "PAY_DAYS": req.body.PAY_DAYS,
                    "GROSS": req.body.GROSS,
                    "DEDUCTION": req.body.DEDUCTION,
                    "NETPAY": req.body.NETPAY,
                    "BANK": req.body.BANK,
                    "ACCOUNT_NO": req.body.ACCOUNT_NO
                }


                await salarydata.insertMany(salarydatamain)
                    .then(function (data) {
                        res.status(RESPONSE_VALIDE_CODE).send({
                            status: true,
                            message: "Data Inser Successfully",
                            data: salarydatamain,
                        })
                    })
                    .catch(function (err) {
                        res.status(BADE_REQ_CODE).send({
                            status: false,
                            message: err
                        })
                    });
            })
        } else {
            res.status(BADE_REQ_CODE).send({
                status: false,
                message: "User Id: " + userid + " Date: " + salarydate + " = This Date Sallery & pdf data is already exist"
            })
        }
    }

    else {
        res.status(BADE_REQ_CODE).send({
            status: false,
            message: "Incorrect UserID"
        })
    }
});

router.post('/uploademployeeimage', async (req, res) => {
    const userid = req.query.employee_number

    const isUserExist = await userdata.findOne({ employee_number: userid })

    console.log(isUserExist, userid)

    if (isUserExist) {

        uploadbulkimages(req, res, async function (err) {
            const mfile = req.files || ""
            console.log("-----", mfile)
            if (mfile == "") {
                return res.status(BADE_REQ_CODE).send({
                    status: false,
                    message: "Image Not Found",
                })
            }
            // http://13.200.131.30:8080/user_profiles/
            const filename = "http://13.200.131.30:8080/user_profiles/" + req.files[0].filename

            console.log("uploading image", filename)

            const mainuserdata = await userdata.findOneAndUpdate({ employee_number: userid }, {
                $set: {
                    employee_profile: filename
                }
            }, { returnOriginal: false })

            res.status(RESPONSE_VALIDE_CODE).send({
                status: true,
                message: "success",
                data: mainuserdata
            })
        })

    } else {
        res.status(BADE_REQ_CODE).send({
            status: false,
            message: "Incorrect UserID"
        })
    }

});

router.get('/demo', async (req, res) => {
    res.status(RESPONSE_VALIDE_CODE).send({
        status: true,
        message: "One AdsLive Done :)"
    })
});

router.post('/userlogin', async (req, res) => {
    const userid = req.body.employee_number
    const password = req.body.employee_passowrd

    const isUserExist = await userdata.findOne({ employee_number: userid })


    if (userid && password && isUserExist) {

        if (isUserExist.employee_password == password && isUserExist.employee_number == userid) {
            res.status(RESPONSE_VALIDE_CODE).send({
                status: true,
                message: "success",
                data: isUserExist,
            })
        } else {
            res.status(BADE_REQ_CODE).send({
                status: false,
                message: "Incorrect password"
            })
        }
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
            message: "Incorrect password"
        })
    }
});

router.post('/userbiodata', async (req, res) => {
    const userid = req.body.employee_number

    const isUserExist = await biodata.findOne({ empno: userid })

    if (userid && isUserExist) {
        res.status(RESPONSE_VALIDE_CODE).send({
            status: true,
            message: "success",
            data: isUserExist,
        })
    }
    else {
        res.status(BADE_REQ_CODE).send({
            status: false,
            message: "Employee Id is not exist"
        })
    }
});

router.post('/salarydata', async (req, res) => {
    const userid = req.body.employee_number
    const dateuser = req.body.DATE

    const isUserExist = await biodata.findOne({ empno: userid })
    const isSalaryExist = await salarydata.findOne({ EMPNO: userid })

    console.log(isSalaryExist)

    if (userid && isSalaryExist && isUserExist) {

        if (isSalaryExist.DATE == dateuser) {
            res.status(RESPONSE_VALIDE_CODE).send({
                status: true,
                message: "success",
                data: isSalaryExist,
            })
        }
        else {
            res.status(RESPONSE_VALIDE_CODE).send({
                status: false,
                message: "Not a valid date"
            })
        }
    }
    else if (userid == null) {
        res.status(BADE_REQ_CODE).send({
            status: false,
            message: "Employee Id is not exist"
        })
    }
    else {
        res.status(RESPONSE_VALIDE_CODE).send({
            status: false,
            message: "Salary data is not exists"
        })
    }

});

router.post('/adduserdata', async (req, res) => {
    const userid = req.body.employee_number
    const password = req.body.employee_passowrd
    const employee_name = req.body.employee_name
    const createddate = new Date().getTime()
    const maindata = {
        "employee_number": userid,
        "employee_name": employee_name,
        "employee_password": password,
        "employee_profile": "",
        "created_at": createddate
    }

    const isUserExist = await userdata.findOne({ employee_number: userid })

    console.log(isUserExist)

    if (userid && password && employee_name && isUserExist == null) {
        console.log(maindata)

        await userdata.insertMany(maindata)
            .then(function (data) {
                res.status(RESPONSE_VALIDE_CODE).send({
                    status: true,
                    data: {
                        "userdata": userid,
                        "password": password,
                        "name": employee_name
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
            message: "Enter the right user id & password & UserName"
        })
    }
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

    console.log(maindata)

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

router.post('/updatebiodata', async (req, res) => {
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

    console.log(maindata)

    if (userid && isUserExist && isBiodataExist) {
        const updateddata = await biodata.findOneAndUpdate({ empno: userid },
            maindata
            , { returnOriginal: false })

        res.status(RESPONSE_VALIDE_CODE).send({
            status: true,
            message: "data update successfully",
            data: updateddata
        })
    }
    else if (isUserExist == null) {
        res.status(BADE_REQ_CODE).send({
            status: false,
            message: "Employee Id is not exist"
        })
    }
    else if (isBiodataExist == null) {
        res.status(BADE_REQ_CODE).send({
            status: false,
            message: "biodata is not exist"
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
        "name": req.body.NAME,
        "designation": req.body.DESIGNATION,
        "department": req.body.department,
        "billunit": req.body.BILL_UNIT,
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
