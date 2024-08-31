import instance, {baseUrl} from "@/api/instance";

export interface IAddDoCard {
    kidId: string;
    points: number;
    isMandatory?: boolean;
    purpose: string;
    storefrontItemId?: string;
    type: string;
    avatar?:string;
}
export interface IUpdateDoCard {
    kidId?: string;
    doCardId: string;
    isMandatory: boolean;
    purpose: string;
    type: string;
    points: number;
    avatar?: string;
}
export interface IApproveKidDoCard {
    doCardId: string;
    status?: string;
    kidId?: string;
    type?: string;
    isMandatory?: boolean;
}

export const fetchAllDoCards = async (status: string, type="") => {
    const {data} = await instance.get(`${baseUrl}/docards?status=${status}&type=${type}`);
    return data;
}
export const fetchAllKidDoCards = async (status: string, type="", kidId: string, isMandatory?: boolean, pageNum?: number) => {
    const {data} = await instance.get(`${baseUrl}/docards/kid/${kidId}?status=${status}&type=${type}&isMandatory=${isMandatory}&size=5&page=${pageNum}`);
    return data;
}
export const addDoCard = async ({kidId, storefrontItemId, purpose, points, isMandatory, type, avatar}: IAddDoCard) => {
    const {data} = await instance.post(`${baseUrl}/docards/kid/${kidId}`, {isMandatory, purpose, type, points, storefront: storefrontItemId, avatar});
    return data;
}
export const acknowledgeDoCard = async ({doCardId, isAcknowledged}: {doCardId:string; isAcknowledged: boolean}) => {
    const {data} = await instance.patch(`${baseUrl}/docards/docard/${doCardId}`, {isAcknowledged});
    return data;
}
export const updateDoCard = async ({isMandatory, purpose, type, points, doCardId, avatar}: IUpdateDoCard) => {
    const {data} = await instance.put(`${baseUrl}/docards/docard/${doCardId}`, {isMandatory, purpose, type, points, avatar});
    return data;
}
export const approveKidDoCard = async ({doCardId}: IApproveKidDoCard) => {
    const {data} = await instance.post(`${baseUrl}/docards/docard/${doCardId}`);
    return data;
}
export const deleteDoCard = async ({doCardId}: { doCardId: string }) => {
    const {data} = await instance.delete(`${baseUrl}/docards/docard/${doCardId}`);
    return data;
}