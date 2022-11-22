import shortid from 'shortid'
import { CarruselImageRepo } from "../repositories/Repository"
const carruselImageRepo = new CarruselImageRepo()
//  ----------------------------------CARROUSEL------------------------------------

// Sube una o varias imagenes
export const multiUpload = async (req, res) => {
    const {images} = req.files
    // TODO : correjir poner express validator
    //  TODO : hacer que devuelva un json con los productos y corregir en el fron tambien para que no haga siempre peticiones
    if (!images) return res.status(404).json({ msg: "la imagen no existe" })
    try {
        let files = [];
        req.files.images.forEach(element => {
            const image = {
                _id: shortid.generate(), fileName: element.filename,
                filePath: element.path,
            }
            files.push(image);
        });


        const newsImages = await carruselImageRepo.create({files})
        if (!newsImages) return res.json({ msg: "no se a podido guardar las imagenes" });
        return res.status(201).json({ msg: 'image Upsloaded Successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'hubo un error' })
    }
}

// mostrar imagenes
export const getAllMultipleImages = async (req, res) => {
    try {
        const files = await carruselImageRepo.get({})
        console.log(files)
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
        const arrayImages = await carruselImageRepo.get({_id: arrayId})
        if (!arrayImages) return res.status(500).send('la imagen no existe');
        // si hay un solo elemento en el array o varios....
        (arrayImages.length === 1) ?
            await carruselImageRepo.delete(arrayId) :
            await carruselImageRepo.update({ "_id": arrayId }, { $pull: { files: { _id: imageId } } })

        return res.status(200).json({ msg: 'se a eliminado correctamente la imagen' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'hubo un error' })
    }
}
