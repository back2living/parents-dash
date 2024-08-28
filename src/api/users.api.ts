import instance, {baseUrl} from "@/api/instance";

export const fetchStats = async () => {
    const {data} = await instance.get(`${baseUrl}/users/stats`);
    return data;
}

export const changeKidPassword = async ({password, id}: {password: string; id:string}) => {
    const {data} = await instance.put(`${baseUrl}/users/kid/${id}`, {password});
    return data;
}

export const changeGuardianPassword = async ({password, oldPassword}: {password: string; oldPassword: string}) => {
    const {data} = await instance.put(`${baseUrl}/auth/user`, {password, oldPassword});
    return data;
}