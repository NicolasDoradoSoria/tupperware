import React from 'react';
import clienteAxios from "../config/axios";

export default class Service {

    async updaterFile(file) {
        let formData = new FormData();
        formData.append('photoURL', file);

        const result = await clienteAxios.post(`/api/images/single-upload`,formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        })
        
        return result
    }

    async multiUpdatFiles(files) {
        const formData = new FormData();
        
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        const result = await clienteAxios.post(`/api/images/multi-upload`,formData, {
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

}