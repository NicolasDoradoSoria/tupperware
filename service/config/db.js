//coneccion a mongoDB
import mongoose from 'mongoose'
import config from './config'
( async () => {
    try {
        await mongoose.connect(config.mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("******DB CONECTADA******")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
})()
