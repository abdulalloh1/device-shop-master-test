import axiosInstance from "@/api/axios.instance.ts";
import { AuthPayloadType } from "@/types/auth.type.ts";

export default {
    async login(payload: AuthPayloadType) {
        return await axiosInstance.post('/login', payload);
    },

    async register(payload: AuthPayloadType) {
        return await axiosInstance.post('/register', payload);
    }
}