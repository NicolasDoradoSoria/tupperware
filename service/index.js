const express = require('express')
const conectarDB = require('./config/db')
const cors = require('cors')
const createRoles = require('./libs/initialSetup')
const app = express()
createRoles.createRoles()
conectarDB()


app.use(cors())

// habilitar express.json
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))


const PORT = process.env.PORT || 4000

//rutas
app.use('/api/usuarios', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/productos', require('./routes/products'))
app.use('/api/shopping_cart', require('./routes/cart'))
app.use('/api/carritoCompras', require('./routes/paymentsInterntent'))

//carpeta publica
app.use(express.static('uploads'))
 
// Start
app.listen(PORT, () => {
    console.log(`el servidor esta funcionano correctamente en el puerto ${PORT}`)
})
