const wwww = require("./bin/www")
const express = require("express")
const www = express()

const port = process.env.PORT || 8000

www.listen(port)


