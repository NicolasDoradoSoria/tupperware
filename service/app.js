import './config/db'
import cors from 'cors'
import routes from "./routes"
import {createRoles} from './data/initialSetup'
import morgan from "morgan"
import express from "express"

const app = express()
createRoles()

app.use(cors())
app.set("port", 4000)
app.use(morgan("dev"))

// habilitar express.json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 4000

//rutas
app.use("/api", routes)

//carpeta publica
app.use(express.static('uploads'))
 
export default app