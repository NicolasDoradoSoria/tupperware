const express = require("express")
const router = express.Router();
const fs = require("fs")

const PATH_ROUTES = __dirname

const remoteExtension = (fileName) => {
    return fileName.split(".").shift()
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = remoteExtension(file)
    if(name !== "index"){
        router.use(`/${name}`, require(`./${file}`))
    }
})

module.exports = router