export interface ClientHttpResponse<T> {
    data: T,
    statusCode: number
}

export default interface ClientHttp {
    get<T>(url: string, options?: RequestInit): Promise<ClientHttpResponse<T>>;
    post<T, U>(url: string, body: U, options?: RequestInit): Promise<ClientHttpResponse<T>>;
    put<T, U>(url: string, body: U, options?: RequestInit): Promise<ClientHttpResponse<T>>;
    delete<T>(url: string, options?: RequestInit): Promise<ClientHttpResponse<T>>;
}
