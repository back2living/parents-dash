import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    approveOrRejectKidChecklistsTask,
    fetchAKidChecklistsTasks,
    fetchAllKidsChecklistsTasks,
    fetchKidChecklistsTasks
} from "@/api/tasks.api";
import toast from "react-hot-toast";
import {IChecklistTask, IChecklistTaskCategory, IChecklistTaskKid} from "@/interfaces/TaskInterface";
import {CustomError} from "@interfaces/ErrorInterface";

export const useFetchKidsChecklistTasks = () => {
    return useQuery({
        queryKey: ["kidsChecklistTasks"],
        queryFn: () => fetchAllKidsChecklistsTasks()
    }) as {data: {data: IChecklistTaskKid[]}, isPending: boolean, isRefetching: boolean};
}
export const useFetchKidChecklistTasks = (id: string) => {
    return useQuery({
        queryKey: ["kidChecklistTasks", id],
        queryFn: () => fetchKidChecklistsTasks(id)
    }) as {data: {data: IChecklistTaskCategory[]}, isPending: boolean, isRefetching: boolean};
}
export const useFetchAKidChecklistTasks = (id: string, status: string, currentPage: number) => {
    return useQuery({
        queryKey: ["aKidChecklistTasks", id, status, currentPage],
        queryFn: () => fetchAKidChecklistsTasks(id, status, currentPage)
    }) as {data: {data: IChecklistTask[], meta: {pages: number; page: number}}, isPending: boolean, isRefetching: boolean};
}
export const useApproveOrRejectKidChecklistTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, approved}: { id: string; approved: boolean; kidId?: string; status?:string; currentPage?: number }) => approveOrRejectKidChecklistsTask(id, approved),
        onSuccess: async (data, variables) => {
            // TODO: TAKE CARE OF ONE AND REPLACE IT WITH THE CURRENT PAGE.
            await queryClient.invalidateQueries({ queryKey: ["aKidChecklistTasks", variables?.kidId, variables?.status, variables?.currentPage || 1] });
            await queryClient.invalidateQueries({ queryKey: ["kidChecklistTasks", variables?.kidId] });
            await queryClient.invalidateQueries({ queryKey: ["kidsChecklistTasks"] });
            toast.success(data?.message);
        },
        onError: (error: CustomError) => toast.error(error?.response?.data?.message)
    })
}