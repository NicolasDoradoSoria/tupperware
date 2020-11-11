const express = require('express')
const conectarDB = require('./config/db')
const cors = require('cors')


const app = express()

conectarDB()

app.use(cors())

// habhilitar express.json
app.use(express.json({extended: true}))

const PORT = process.env.PORT || 4000
//importar rutas
app.use('/api/usuarios', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))

// arrrancar la app
app.listen(PORT, () => {
    console.log(`el servidor esta funcionano correctamente en el puerto ${PORT}`)
})
