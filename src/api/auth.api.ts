import instance from "@/api/instance";
import {baseUrl} from "@/api/instance";
import {EmailFormValues} from "@/pages/signin";

export const verifyUserEmail = async ({token, code}: {token: string; code: string}) => {
    const {data} = await instance.put(`${baseUrl}/auth/verification`, {token, code});
    return data;
}
export const signIn = async ({email, password}: EmailFormValues) => {
    const {data} = await instance.post(`${baseUrl}/auth/login/guardian`, {email, password});
    return data;
}
export const logout = async () => {
    const {data} = await instance.delete(`${baseUrl}/auth/logout`);
    return data;
}

export const forgotPassword = async ({email}: {email: string}) => {
    const {data} = await instance.put(`${baseUrl}/auth/forgot-password`, {email});
    return data;
}

export const resendEmailVerificationLink = async ({email}: {email: string}) => {
    const {data} = await instance.post(`${baseUrl}/auth/verification`, {email});
    return data;
}

export const onboardUser = async () => {
    const {data} = await instance.put(`${baseUrl}/auth/user`, {hasSeenOnboarding: true});
    return data;
}

export const uploadProfileImage = async ({avatar}: {avatar: string}) => {
    const {data} = await instance.put(`${baseUrl}/auth/user`, {avatar});
    return data;
}

//
// export const verifyUserEmail = async (token) => {
//     const {data} = await instance.post(`${baseUrl}/auth/verify-email`, {verifyEmail: token});
//     return data;
// }
//
// export const resetPassword = async (payload) => {
//     const {data} = await instance.put(`${baseUrl}/auth/password-reset`, payload);
//     return data;
// }
//
// export const signIn = async (userCredentials) => {
//     const {data} = await instance.post(`${baseUrl}/auth/login`, userCredentials);
//     return data;
// }