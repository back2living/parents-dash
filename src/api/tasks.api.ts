import instance, {baseUrl} from "@/api/instance";

// kid checklist tasks
export const fetchAllKidsChecklistsTasks = async () => {
    const {data} = await instance.get(`${baseUrl}/checklists/tasks`);
    return data;
}

export const fetchKidChecklistsTasks = async (id: string) => {
    const {data} = await instance.get(`${baseUrl}/checklists/tasks/kid/${id}`);
    return data;
}

export const fetchAKidChecklistsTasks = async (id: string, status:string, currentPage: number) => {
    const {data} = await instance.get(`${baseUrl}/checklists/tasks/all/kid/${id}?status=${status}&size=10&page=${currentPage}`);
    return data;
}

export const approveOrRejectKidChecklistsTask = async (id: string, approved: boolean) => {
    const {data} = await instance.put(`${baseUrl}/checklists/tasks/task/${id}`, {approved});
    return data;
}
