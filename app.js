const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const config = require("./config")
const models = require("./models")
const controllers = require("./controllers")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect(config.getDbConnectionString())

controllers.api(app)


app.listen(80)