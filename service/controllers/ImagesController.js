import shortid from 'shortid'
import CarruselImage from "../models/CarruselImage"
import fs from 'fs-extra'


//  ----------------------------------CARROUSEL------------------------------------

// Sube una o varias imagenes
export const multiUpload = async (req, res) => {
    // TODO : correjir poner express validator
    //  TODO : hacer que devuelva un json con los productos y corregir en el fron tambien para que no haga siempre peticiones
    if (!req.files.images) return res.status(404).json({ msg: "el producto no existe" })

    try {
        let files = [];
        req.files.images.forEach(element => {
            const image = {
                _id: shortid.generate(), fileName: element.filename,
                filePath: element.path,
            }
            files.push(image);
        });

        const images = new CarruselImage({ files });
        await images.save();
        // await fs.unlink(req.file.path)
        return res.status(201).json({ msg: 'image Upsloaded Successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'hubo un error' })
    }
}

// mostrar imagenes
export const getAllMultipleImages = async (req, res) => {
    try {
        const files = await CarruselImage.find()
        res.status(200).json(files)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'hubo un error' })
    }
}

// eliminar imagen seleccionada...
export const deleteFileById = async (req, res) => {
    const { arrayId, imageId } = req.params

    try {
        // devuelve el array de la imagen que fue enviada por el params
        const arrayImages = await CarruselImage.findById(arrayId)

        if (!arrayImages) return res.status(500).send('la imagen no existe');

        // si hay un solo elemento en el array o varios....
        (arrayImages.files.length === 1) ?
            await CarruselImage.findByIdAndDelete(arrayId) :
            await CarruselImage.updateOne({ "_id": arrayId }, { $pull: { files: { _id: imageId } } })

        return res.status(200).json({ msg: 'se a eliminado correctamente la imagen' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'hubo un error' })
    }
}
