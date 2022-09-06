import express from "express"
import './config/db'
import cors from 'cors'
import routes from "./routes"
import {createRoles} from './data/initialSetup'

const app = express()
createRoles()

app.use(cors())

// habilitar express.json
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 4000

//rutas
app.use("/api", routes)

//carpeta publica
app.use(express.static('uploads'))
 
// Start
app.listen(PORT, () => {
    console.log(`el servidor esta funcionano correctamente en el puerto ${PORT}`)
})

