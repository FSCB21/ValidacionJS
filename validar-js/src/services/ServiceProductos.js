import axios from "axios";

const URL = `${process.env.REACT_APP_API_URL}productos`

export class ServiceProductos {

    getProductos(page, size){
        return axios.get(`${URL}?page=${page}&size=${size}`)
    }

    setProducto(data){
        return axios.post(URL, data)
    }

    updateProducto(data){
        return axios.put(URL, data)
    }

    deleteProducto(id){
        return axios.delete(`${URL}/${id}`)
    }
}