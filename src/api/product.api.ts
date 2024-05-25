import axiosInstance from "@/api/axios.instance.ts";
import { RequestParamsType } from "@/types/index.type.ts";
import { ProductType } from "@/types/product.type.ts";

export default {
    getProducts(params: RequestParamsType) {
        return axiosInstance.get('/products', {
            params
        })
    },

    deleteProduct(id: number) {
        return axiosInstance.delete(`/products/${id}`)
    },

    updateProduct(id: number, payload: ProductType) {
        return axiosInstance.put(`/products/${id}`, payload)
    },

    createProduct(payload: ProductType) {
        return axiosInstance.post('/products', payload)
    }
}