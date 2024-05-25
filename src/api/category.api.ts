import axiosInstance from "@/api/axios.instance.ts";

export default {
    getCategories() {
        return axiosInstance.get('/categories')
    }
}