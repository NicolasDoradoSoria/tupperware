import clienteAxios from "../config/axios";

export default class Service {

    async updaterFile(image) {
        let formData = new FormData();
        formData.append('photoURL', image);

        const result = await clienteAxios.post(`/api/images/single-upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        return result
    }

    //--------------------------------------------CARROUSEL------------------------

    async multiUpdatFiles(images) {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append('files', images[i]);
        }

        const result = await clienteAxios.post(`/api/images/multi-upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        return result
    }

    async getMultiUpdaterFiles() {
        const result = await clienteAxios.get(`/api/images/getMultipleFiles`)
        return result
    }

    async deleteImage(idArray, idImage) {
        const result = await clienteAxios.delete(`/api/images/${idArray}/${idImage}`);
        return result
    }

    //----------------------------------------------PUBLICATION--------------------------------
    async postMultiPostImages(imagas) {
        let imag = imagas[0]
        const formData = new FormData();
        for (let i = 0; i < imagas[0].length; i++) {
            formData.append('files', imag[i]);
        }
        const result = await clienteAxios.post(`/api/images/createProductItem`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        return result
    }

    async getMultiPostFiles() {
        const result = await clienteAxios.get(`/api/images/getMultiplePostFiles`)
        return result
    }

}