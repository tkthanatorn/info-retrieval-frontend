import { DefaultResponse, LoginBody, LoginResult, RegisterBody, User } from "../types";
import { fetchPrivate, fetchPublic } from "./client";

export const loginAPI = async (body: LoginBody) => {
    return await fetchPublic.post<DefaultResponse<LoginResult>>("/auth/login", body)
}

export const registerAPI = async (body: RegisterBody) => {
    return await fetchPublic.post<DefaultResponse>("/auth/register", body)
}

export const getUserAPI = async () => {
    return await fetchPrivate.get<DefaultResponse<User>>("/user")
}