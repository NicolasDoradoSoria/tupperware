const express = require('express')
const conectarDB = require('./config/db')
const cors = require('cors')
const createRoles = require('./libs/initialSetup')


const app = express()
createRoles.createRoles()
conectarDB()

app.use(cors())

// habhilitar express.json
app.use(express.json({extended: true}))

const PORT = process.env.PORT || 4000

//rutas
app.use('/api/usuarios', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/productos', require('./routes/products'))
// app.use('/api/carritoCompras', require('./routes/shoppingCart'))
app.use('/api/carritoCompras', require('./routes/paymentsInterntent'))
// Start
app.listen(PORT, () => {
    console.log(`el servidor esta funcionano correctamente en el puerto ${PORT}`)
})
