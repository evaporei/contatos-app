const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const config = require("./config")

const app = express()

app.get("/", (request, response) => {
    response.send("")
})

mongoose.connect(config.getDbConnectionString())

app.listen(80)