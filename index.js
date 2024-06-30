const express = require('express')
const mongoose = require("mongoose")
require('dotenv').config({ })  // for security for production => $ /var/env/.env
const port = process.env.PORT || 1000;
const conection = require("./Service/restapi.js")
const path = require('path');

const app = new express();

app.use(express.json())
app.use(conection)

conection.use('/' + "user_salary_pdf", express.static(path.join(__dirname, "user_salary_pdf")));
conection.use('/' + "user_profiles", express.static(path.join(__dirname, "user_profiles")));

mongoose.connect(process.env.DB).then(() => {
    console.log(`MongoDB connection Don`);
}).catch((error) => {
    console.log(`Error: ${error.message}`);
})

new express().use(conection).listen(port, () => {
    console.log(`Server Connected Port: ${port}`);
});
