const express = require("express")

const app = express()

app.get("/", (request, response) => {
    response.send("first commit - basic setup")
})

app.listen(80)