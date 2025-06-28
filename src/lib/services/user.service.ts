import { CreateUserSchema } from "@/schemas/create-user.schema";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "@/types/User";
import axios, { AxiosError } from "axios";
import api from "../api";

export const signUp = async (user: CreateUserSchema): Promise<ApiResponse<User>> => {
    try {

        const response = await api.post('/auth/signup', user);

        return {
            status: response.status,
            success: true,
            message: response.data.message,
            data: response.data.data
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError;
            if (axiosError.response) {
                return {
                    status: axiosError.response.status,
                    success: false,
                    message: (axiosError.response.data as { details?: string })?.details || "An error occurred"
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

export const signIn = async (user: CreateUserSchema): Promise<ApiResponse<User>> => {
    try {

        const response = await api.post('/auth/signin', user);

        return {
            status: response.status,
            success: true,
            message: response.data.message,
            data: response.data.data
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError;
            if (axiosError.response) {
                return {
                    status: axiosError.response.status,
                    success: false,
                    message: (axiosError.response.data as { details?: string })?.details || "An error occurred"
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