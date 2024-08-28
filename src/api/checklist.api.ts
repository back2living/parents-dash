import instance, {baseUrl} from "@/api/instance";

export interface IAddChecklistCategory {
    title: string;
    icon: string;
}
export interface IAddChecklist {
    title: string;
    icon: string;
    reward: number;
    penalty: number;
    categoryId: string;
    intervals: number;
}
export interface IAddKidChecklist extends IAddChecklist{
    kidId: string;
}
export interface IUpdateChecklistCategory extends IAddChecklistCategory {
    categoryId: string;
}
export interface IAddKidCategory extends IAddChecklistCategory {
    kidId: string;
}

// checklist category
export const addChecklist = async ({categoryId, title, icon, reward, penalty, intervals}: IAddChecklist) => {
    const {data} = await instance.post(`${baseUrl}/checklists/checklist/category/${categoryId}`, {title, icon, reward, penalty, intervals});
    return data;
}
export const addChecklistCategory = async ({title, icon}: IAddChecklistCategory) => {
    const {data} = await instance.post(`${baseUrl}/checklists/category`, {title, icon});
    return data;
}
export const updateChecklistCategory = async ({categoryId, title, icon}: IUpdateChecklistCategory) => {
    const {data} = await instance.put(`${baseUrl}/checklists/category/${categoryId}`, {title, icon});
    return data;
}
export const updateKidChecklistCategory = async ({categoryId, title, icon}: IUpdateChecklistCategory) => {
    const {data} = await instance.put(`${baseUrl}/checklists/category/${categoryId}`, {title, icon});
    return data;
}
export const removeChecklistCategory = async ({id}: {id: string}) => {
    const {data} = await instance.delete(`${baseUrl}/checklists/category/${id}`);
    return data;
}
export const removeChecklistFromCategory = async ({id}: {id: string}) => {
    const {data} = await instance.delete(`${baseUrl}/checklists/category/${id}/checklists`);
    return data;
}

// checklist
export const removeChecklistById = async ({id}: {id: string}) => {
    const {data} = await instance.delete(`${baseUrl}/checklists/checklist/${id}`);
    return data;
}
export const updateChecklistById = async ({categoryId, title, icon, reward, penalty, intervals}: IAddChecklist) => {
    const {data} = await instance.put(`${baseUrl}/checklists/checklist/${categoryId}`, {title, icon, reward, penalty, intervals});
    return data;
}
export const fetchChecklistsCategories = async (withChecklists= true) => {
    const {data} = await instance.get(`${baseUrl}/checklists/categories?withChecklists=${withChecklists}`);
    return data;
}

// kid checklist
export const fetchKidChecklistsCategories = async (withChecklists: boolean, kidId: string) => {
    const {data} = await instance.get(`${baseUrl}/checklists/categories/kid/${kidId}?withChecklists=${withChecklists}`);
    return data;
}
export const addKidChecklistCategory = async ({title, icon, kidId}: IAddKidCategory) => {
    const {data} = await instance.post(`${baseUrl}/checklists/category/kid/${kidId}`, {title, icon});
    return data;
}
export const addChecklistForKid = async ({categoryId, title, icon, reward, penalty, kidId, intervals}: IAddKidChecklist) => {
    const {data} = await instance.post(`${baseUrl}/checklists/checklist/category/${categoryId}/kid/${kidId}`, {title, icon, reward, penalty, kidId, intervals});
    return data;
}



// export const fetchChecklistById = async (id: any) => {
//     const {data} = await instance.get(`${baseUrl}/checklists/checklist/${id}`);
//     return data;
// }
// export const fetchChecklistsCategoryById = async (categoryId: string) => {
//     const {data} = await instance.get(`${baseUrl}/checklists/category/${categoryId}}`);
//     return data;
// }
// export const fetchKidChecklists = async ({kidId}: any) => {
//     const {data} = await instance.get(`${baseUrl}/checklists/kid/${kidId}`);
//     return data;
// }
// export const fetchChecklistsByCategory = async (categoryId: any) => {
//     const {data} = await instance.get(`${baseUrl}/checklists/checklist/category/${categoryId}`);
//     return data;
// }