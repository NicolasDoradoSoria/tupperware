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
    async postMultiPostImages(postImages) {
        const formData = new FormData();
        for (let i = 0; i < postImages.length; i++) {
            formData.append('files', postImages[i]);
        }
        const result = await clienteAxios.post(`/api/images/post-image`, formData, {
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