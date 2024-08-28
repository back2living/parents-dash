import instance, {baseUrl} from "@/api/instance";
import {IAddKid} from "@/hooks/useKids";

export const fetchKid = async (kidId: string) => {
    const {data} = await instance.get(`${baseUrl}/users/kid/${kidId}`);
    return data;
}

export const fetchKids = async () => {
    const {data} = await instance.get(`${baseUrl}/users/kids`);
    return data;
}

export const addKid = async ({avatar, dob, points, username, lastName, firstName, password, gender}: IAddKid) => {
    const {data} = await instance.post(`${baseUrl}/users/kid`, {avatar, dob, points, username, lastName, firstName, password, gender});
    return data;
}

export const removeKid = async ({id}: {id: string}) => {
    const {data} = await instance.delete(`${baseUrl}/users/kid/${id}`);
    return data;
}

export const addKidPoints = async ({id, points}: { id: string; points: number }) => {
    const {data} = await instance.put(`${baseUrl}/users/kid/${id}/points`, {points});
    return data;
}
export const updateKidProfileImage = async ({avatar, id}: {avatar: string; id: string}) => {
    const {data} = await instance.put(`${baseUrl}/users/kid/${id}`, {avatar});
    return data;
}