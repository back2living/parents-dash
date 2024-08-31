import instance, {baseUrl} from "@/api/instance";

export interface IAddStorefrontCategory {
    title: string;
}

export interface IAddStorefrontCategoryItem {
    name: string;
    id: string;
    avatar: string;
    points: number;
    description: string;
}

export const fetchStorefrontsWithCategories = async () => {
    const {data} = await instance.get(`${baseUrl}/storefronts/categories?withItems=true`);
    return data;
}
export const fetchStorefrontsCategories = async () => {
    const {data} = await instance.get(`${baseUrl}/storefronts/categories`);
    return data;
}
export const addStorefrontCategory = async ({title}: IAddStorefrontCategory) => {
    const {data} = await instance.post(`${baseUrl}/storefronts/category`, {title});
    return data;
}
export const addStorefrontCategoryItem = async ({name, description, avatar, points, id}: IAddStorefrontCategoryItem) => {
    const {data} = await instance.post(`${baseUrl}/storefronts/category/${id}/item`, {name, description, avatar, points});
    return data;
}
export const editStorefrontCategoryItem = async ({name, description, avatar, points, id}: IAddStorefrontCategoryItem) => {
    const {data} = await instance.put(`${baseUrl}/storefronts/storefront/${id}`, {name, description, avatar, points});
    return data;
}
export const deleteStorefrontCategoryItem = async ({id}: { id: string }) => {
    const {data} = await instance.delete(`${baseUrl}/storefronts/storefront/${id}`);
    return data;
}
export const fetchStorefrontPurchases = async (id: string, status?: string, pageNum?: number) => {
    const {data} = await instance.get(`${baseUrl}/storefronts/purchases/kid/${id}${status ? `?status=${status}&size=5&page=${pageNum}` : `?size=5&page=${pageNum}`}`);
    return data;
}
export const approveOrRejectKidPurchase = async (id: string, approved: boolean) => {
    const {data} = await instance.put(`${baseUrl}/storefronts/purchase/${id}`, {approved});
    return data;
}



// export const addKidStorefrontDoCardPayment = async ({doCardId, kidId, points}: IAddKidDoCardPayment) => {
//     const {data} = await instance.post(`${baseUrl}/storefronts/docard/${doCardId}/kid/${kidId}/payment`, {points});
//     return data;
// }
// export const updateStorefrontDoCard = async ({isMandatory, purpose, type, points, doCardId}: IUpdateStorefrontDoCard) => {
//     const {data} = await instance.put(`${baseUrl}/storefronts/docard/${doCardId}`, {isMandatory, purpose, type, points});
//     return data;
// }
// export const deleteStorefrontDoCard = async ({doCardId}: { doCardId: string }) => {
//     const {data} = await instance.delete(`${baseUrl}/storefronts/docard/${doCardId}`);
//     return data;
// }