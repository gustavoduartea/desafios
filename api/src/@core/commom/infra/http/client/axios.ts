import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import ClientHttp, { ClientHttpResponse } from "./protocol";

export default class AxiosClientHttpAdapter implements ClientHttp {
    async get<T>(url: string, options?: RequestInit): Promise<ClientHttpResponse<T>> {
        try {
            const response: AxiosResponse<T> = await axios.get(url, options as AxiosRequestConfig);
            return { data: response.data, statusCode: response.status };
        } catch (error: any) {
            return this.handleError<T>(error);
        }
    }

    async post<T, U>(url: string, body: U, options?: RequestInit): Promise<ClientHttpResponse<T>> {
        try {
            const response: AxiosResponse<T> = await axios.post(url, body, options as AxiosRequestConfig);
            return { data: response.data, statusCode: response.status };
        } catch (error: any) {
            return this.handleError<T>(error);
        }
    }

    async put<T, U>(url: string, body: U, options?: RequestInit): Promise<ClientHttpResponse<T>> {
        try {
            const response: AxiosResponse<T> = await axios.put(url, body, options as AxiosRequestConfig);
            return { data: response.data, statusCode: response.status };
        } catch (error: any) {
            return this.handleError<T>(error);
        }
    }

    async delete<T>(url: string, options?: RequestInit): Promise<ClientHttpResponse<T>> {
        try {
            const response: AxiosResponse<T> = await axios.delete(url, options as AxiosRequestConfig);
            return { data: response.data, statusCode: response.status };
        } catch (error: any) {
            return this.handleError<T>(error);
        }
    }

    private handleError<T>(error: any): ClientHttpResponse<T> {
        if (error.response) {
            return {
                data: error.response.data,
                statusCode: error.response.status,
            };
        } else if (error.request) {
            return {
                data: {} as T,
                statusCode: 0, 
            };
        } else {
            return {
                data: {} as T,
                statusCode: 0,
            };
        }
    }
}
