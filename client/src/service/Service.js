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
            formData.append('images', images[i]);
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


    //----------------------------------------------PRODUCT--------------------------------
    async postAddProduct(productNew, images,productPercentageUpload) {
        const formData = new FormData();
        const { name, descripcion, price, stock,category, checkedOffer, originalPrice } = productNew
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        formData.append('name', name);
        formData.append('descripcion', descripcion);
        formData.append('price', price);
        formData.append('checkedOffer', checkedOffer);
        formData.append('originalPrice', originalPrice);
        formData.append('stock', stock);
        formData.append('category', category);
        const result = await clienteAxios.post('api/products/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onDownloadProgress(progressEvent){
                const {total, loaded} = progressEvent
                productPercentageUpload(parseInt((loaded*100) / total))  
            }
        });
        return result
    }

    async getProducts() {
        const result = await clienteAxios.get("/api/products");
        return result
    };

}