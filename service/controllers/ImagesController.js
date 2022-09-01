import shortid from 'shortid'
import { carruselImageModel } from "../models"

//  ----------------------------------CARROUSEL------------------------------------


// Sube una o varias imagenes
const multiUpload = async (req, res) => {
    if (!req.files.images) {
        return res.status(404).json({ msg: "el producto no existe" });
    }
    try {
        let files = [];
        req.files.images.forEach(element => {
            const image = {
                _id: shortid.generate(),
                fileName: element.filename,
                filePath: element.path,
            }
            files.push(image);
        });
        const images = new carruselImageModel({ files });
        await images.save();
        return res.status(201).send('image Upsloaded Successfully');
    } catch (error) {
        console.log(error)
    }
}

// mostrar imagenes
const getAllMultipleImages = async (req, res) => {
    try {
        const files = await carruselImageModel.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
// eliminar imagen seleccionada...
const deleteFileById = async (req, res) => {
    const { arrayId, imageId } = req.params


    try {
        // devuelve el array de la imagen que fue enviada por el params
        const arrayImages = await carruselImageModel.findById(arrayId)

        if (!arrayImages) {
            return res.status(500).send('la imagen no existe');
        }

        // si hay un solo elemento en el array o varios....
        if (arrayImages.files.length === 1) {
            await carruselImageModel.findByIdAndDelete(arrayId)
        }
        else {
            await carruselImageModel.updateOne({ "_id": arrayId }, { $pull: { files: { _id: imageId } } })
        }
        return res.status(200).send('se a eliminado correctamente la imagen');
    } catch (err) {
        // handle the error
        return res.status(400).send(err.message);
    }
}

module.exports = { deleteFileById, getAllMultipleImages, multiUpload }