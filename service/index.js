const express = require('express')
const conectarDB = require('./config/db')
const cors = require('cors')
const app = express()
conectarDB()


app.use(cors())

// habilitar express.json
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))


const PORT = process.env.PORT || 4000

//rutas
app.use("/api", require("./routes"))

//carpeta publica
app.use(express.static('uploads'))
 
// Start
app.listen(PORT, () => {
    console.log(`el servidor esta funcionano correctamente en el puerto ${PORT}`)
})
