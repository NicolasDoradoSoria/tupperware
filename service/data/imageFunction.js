const shortid = require('shortid');

const deleteImageFunction = (model) => async (req, res) => {
    const { arrayId, imageId } = req.params
    if (!arrayId && !imageId) {
        message = "Error! in image delete.";
        return res.status(500).json('error in delete');
    }
    try {
        const arrayImages = await model.findById(arrayId)
        if (arrayImages.files.length === 1) {
            await model.findByIdAndDelete(arrayId)
            return res.status(200).send('se a eliminado correctamente la imagen');
        }

        await model.updateOne({ "_id": arrayId }, { $pull: { files: { _id: imageId } } })
        return res.status(200).send('se a eliminado correctamente la imagen');
    } catch (err) {
        // handle the error
        return res.status(400).send(err);
    }
}

const createImageFunction = (model) => async (req, res) => {
    try {
        let files = [];
        req.files.forEach(element => {
            const image = {
                _id: shortid.generate(),
                fileName: element.filename,
                filePath: element.path,
            }
            files.push(image);
        });
        const images = new model({ files });
        await images.save();
        return res.json(images)
        // return res.status(201).send('Files Upsloaded Successfully');
    } catch (error) {
        console.log(error)
    }
}

module.exports = { deleteImageFunction, createImageFunction }