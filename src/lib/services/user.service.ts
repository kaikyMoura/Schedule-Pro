import { CreateUserSchema } from "@/schemas/create-user.schema";
import api from "../api";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "@/types/User";
import axios, { AxiosError } from "axios";

export const signUp = async (user: CreateUserSchema): Promise<ApiResponse<User>> => {
    try {

        const response = await api.post('/users', user);

        return {
            status: response.status,
            success: true,
            message: response.data.message,
            data: response.data.data
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<unknown>;
            if (axiosError.response) {
                return {
                    status: axiosError.response.status,
                    success: false,
                    message: axiosError.response.data.details
                };
            }
    
    }
}
    return {
        status: 500,
        success: false,
        message: "Internal server error"
    };
}