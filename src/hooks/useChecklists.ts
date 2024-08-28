import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    addChecklist,
    addChecklistCategory, addChecklistForKid, addKidChecklistCategory,
    fetchChecklistsCategories,
    // fetchChecklistById, fetchChecklistsByCategory, fetchChecklistsCategoryById,
    // fetchKidChecklists,
    fetchKidChecklistsCategories,
    IAddChecklist,
    IAddChecklistCategory, IAddKidCategory, IAddKidChecklist,
    IUpdateChecklistCategory,
    removeChecklistById,
    removeChecklistCategory, removeChecklistFromCategory, updateChecklistById,
    updateChecklistCategory, updateKidChecklistCategory
} from "@/api/checklist.api";
import toast from "react-hot-toast";
import {FetchChecklistCategory} from "@/interfaces/ChecklistInterface";
import {CustomError} from "@interfaces/ErrorInterface";

export const useAddChecklist = (closeModal: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({reward, icon, penalty, title, categoryId, intervals}: IAddChecklist) => addChecklist({categoryId, title, icon, penalty, reward, intervals}),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["checklistsCategories"] });
            toast.success(data?.message || "Checklist added successfully.");
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}
export const useAddKidChecklist = (closeModal: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({reward, icon, penalty, title, categoryId, kidId, intervals}: IAddKidChecklist) => addChecklistForKid({categoryId, title, icon, reward, penalty, kidId, intervals}),
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries({ queryKey: ["kidChecklistsCategories", variables.kidId] });
            toast.success(data?.message);
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}

export const useAddChecklistCategory = (closeModal: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({icon, title}: IAddChecklistCategory) => addChecklistCategory({title, icon}),
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({ queryKey: ["checklistsCategories"] });
            toast.success(`Category ${variables?.title} has been created.`);
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}
export const useUpdateChecklistCategory = (closeModal: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({icon, title, categoryId}: IUpdateChecklistCategory) => updateChecklistCategory({categoryId, title, icon}),
        onSuccess: async (data) => {
            toast.success(data?.message)
            await queryClient.invalidateQueries({ queryKey: ["checklistsCategories"] });
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}
export const useUpdateKidChecklistCategory = (closeModal: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({icon, title, categoryId}: IUpdateChecklistCategory) => updateKidChecklistCategory({categoryId, title, icon}),
        onSuccess: async (variables) => {
            await queryClient.invalidateQueries({ queryKey: ["kidChecklistsCategories", variables.kidId], });
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}
export const useRemoveChecklistCategory = (closeModal: () => void, kidId: string | undefined) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id}: { id: string }) => removeChecklistCategory({id}),
        onSuccess: async (data) => {
            toast.success(data.message);
            if (kidId) {
                await queryClient.invalidateQueries({ queryKey: ["kidChecklistsCategories", kidId] });
            } else {
                await queryClient.invalidateQueries({ queryKey: ["checklistsCategories"] });
            }
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}
export const useRemoveAllChecklistFromCategory = (closeModal: () => void, kidId: string | undefined) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id}: { id: string }) => removeChecklistFromCategory({id}),
        onSuccess: async (data) => {
            toast.success(data.message);
            if (kidId) {
                await queryClient.invalidateQueries({ queryKey: ["kidChecklistsCategories", kidId] });
            } else {
                await queryClient.invalidateQueries({ queryKey: ["checklistsCategories"] });
            }
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}

export const useFetchChecklistsCategories = (withChecklists: boolean) => {
    return useQuery({
        queryKey: ["checklistsCategories"],
        queryFn: () => fetchChecklistsCategories(withChecklists)
    }) as {data: FetchChecklistCategory; isPending: boolean; isRefetching: boolean};
}
export const useRemoveChecklistById = (closeModal: () => void, kidId: string | undefined) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id}: { id: string }) => removeChecklistById({id}),
        onSuccess: async (data) => {
            if (kidId) {
                await queryClient.invalidateQueries({ queryKey: ["kidChecklistsCategories", kidId] });
            } else {
                await queryClient.invalidateQueries({ queryKey: ["checklistsCategories"] });
            }
            toast.success(data?.message);
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}
export const useUpdateChecklistById = (closeModal: () => void, kidId: string | undefined) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({icon, title, categoryId, reward, penalty, intervals}: IAddChecklist) => updateChecklistById({categoryId, title, icon, reward, penalty, intervals}),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["checklistsCategories"] });
            await queryClient.invalidateQueries({ queryKey: ["kidChecklistsCategories", kidId] });
            toast.success("Checklist updated")
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}

export const useAddKidChecklistCategory = (closeModal: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({icon, title, kidId}: IAddKidCategory) => addKidChecklistCategory({title, icon, kidId}),
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({ queryKey: ["kidChecklistsCategories", variables.kidId], });
            toast.success(`Checklist has been created.`);
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}
export const useFetchKidChecklistsCategories = (withChecklists: boolean, kidId: string) => {
    return useQuery({
        queryKey: ["kidChecklistsCategories", kidId],
        queryFn: () => fetchKidChecklistsCategories(withChecklists, kidId)
    }) as {data: FetchChecklistCategory; isPending: boolean; isRefetching: boolean};
}





// export const useFetchChecklistById = (id: any) => {
//     return useQuery({
//         queryKey: ["checklistsId", id],
//         queryFn: () => fetchChecklistById(id)
//     });
// }
// export const useFetchChecklistsCategoryById = (categoryId: string) => {
//     return useQuery({
//         queryKey: ["checklistsCategory", categoryId],
//         queryFn: () => fetchChecklistsCategoryById(categoryId)
//     });
// }
// export const useFetchKidChecklists = (kidId: string) => {
//     return useQuery({
//         queryKey: ["kidChecklistsCategories"],
//         queryFn: () => fetchKidChecklists(kidId)
//     });
// }
// export const useFetchChecklistByCategory = (categoryId: string) => {
//     return useQuery({
//         queryKey: ["checklistsByCategory"],
//         queryFn: () => fetchChecklistsByCategory(categoryId)
//     });
// }