import { CreateUserSchema } from "@/schemas/create-user.schema";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "@/types/User";
import axios, { AxiosError } from "axios";
import api from "../api";

export const signUp = async (user: User): Promise<ApiResponse<User>> => {
    try {
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password!);
        formData.append('photo', user.photo!);
        formData.append('phone', user.phone!);

        const response = await api.post('auth/signup', formData);

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

export const sendOtp = async (phone: string): Promise<ApiResponse<{ status: string , message: string }>> => {
    try {

        const response = await api.post('/auth/send-otp', { phone });

        return {
            status: response.data.status,
            success: true,
            message: response.data.message,
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

export const verifyOtp = async (phone: string, otp: string): Promise<ApiResponse<{ success: boolean , message: string }>> => {
    try {

        const response = await api.post('/auth/verify-otp', { phone, otp });

        return {
            status: response.status,
            success: response.data.success,
            message: response.data.message,
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