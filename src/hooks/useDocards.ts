import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    acknowledgeDoCard,
    addDoCard, approveKidDoCard, deleteDoCard,
    fetchAllDoCards, fetchAllKidDoCards,
    IAddDoCard, IApproveKidDoCard, IUpdateDoCard, updateDoCard,
} from "@/api/docards.api";
import toast from "react-hot-toast";
import {IDoCard} from "@interfaces/DoCardInterfaces";
import {CustomError} from "@interfaces/ErrorInterface";

export const useFetchAllDoCards = (status: string, type: string) => {
    return useQuery({
        queryKey: ["allDoCards"],
        queryFn: () => fetchAllDoCards(status, type)
    }) as {data: {data: IDoCard[]}; isPending: boolean;};
}
export const useFetchAllKidDoCards = (status: string, type: string, kidId: string, isMandatory?: boolean, pageNum?: number) => {
    return useQuery({
        queryKey: ["allKidDoCards", kidId, status, type, isMandatory],
        queryFn: () => fetchAllKidDoCards(status, type, kidId, isMandatory, pageNum!)
    }) as {data: {data: IDoCard[], meta: {pages: number; page: number}}; isPending: boolean;};
}
export const useAddDoCard = (handleRouteToKidProfile: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({kidId, storefrontItemId, points, type, purpose, isMandatory, avatar}: IAddDoCard) => addDoCard({kidId, storefrontItemId, purpose, points, isMandatory, type, avatar}),
        onSuccess: async (data) => {
            handleRouteToKidProfile();
            await queryClient.invalidateQueries({ queryKey: ["allDoCards"] });
            toast.success(data?.message);
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message || "")
    });
}
export const useUpdateDoCard = (handleRouteToKidProfile: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({doCardId, points, type, purpose, isMandatory, avatar}: IUpdateDoCard) => updateDoCard({purpose, points, isMandatory, type, avatar, doCardId}),
        onSuccess: async (data, variables) => {
            handleRouteToKidProfile();
            await queryClient.invalidateQueries({ queryKey: ["allKidDoCards", variables.kidId, "pending", variables.type, variables.isMandatory] });
            toast.success(data?.message);
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message || "")
    });
}
export const useAcknowledgeDoCard = (closeModal: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({doCardId, isAcknowledged}: { kidId?: string; doCardId: string;isAcknowledged: boolean }) => acknowledgeDoCard({doCardId, isAcknowledged}),
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries({ queryKey: ["allKidDoCards", variables.kidId, "pending", "goal", false] });
            toast.success(data?.message);
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message || "")
    });
}
export const useApproveKidDoCardPayment = (closeModal: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({doCardId}: IApproveKidDoCard) => approveKidDoCard({doCardId}),
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries({ queryKey: ["allKidDoCards", variables.kidId, variables.status, variables.type, variables.isMandatory] });
            toast.success(data?.message);
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}
export const useDeleteDoCard = (closeModal: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({doCardId}: { doCardId: string; kidId?:string; type?: string; isMandatory?:boolean }) => deleteDoCard({doCardId}),
        onSuccess: async (data, variables) => {
            closeModal();
            await queryClient.invalidateQueries({ queryKey: ["allKidDoCards", variables.kidId, "pending", variables.type, variables.isMandatory]});
            toast.success(data?.message);
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message || "")
    });
}


// export const useAddKidDoCardPayment = (closeModal: () => void) => {
//     const queryClient = useQueryClient();
//
//     return useMutation({
//         mutationFn: ({doCardId, kidId, points}: IAddKidDoCardPayment) => addKidDoCardPayment({doCardId, kidId, points}),
//         onSuccess: async (data, variables) => {
//             await queryClient.invalidateQueries({ queryKey: ["allDocCards"] });
//             toast.success("Category added successfully.");
//             closeModal();
//         },
//         onError: (error: any) =>  toast.error(error?.response?.data?.message)
//     })
// }
// export const useUpdateDoCard = (closeModal: () => void) => {
//     const queryClient = useQueryClient();
//
//     return useMutation({
//         mutationFn: ({doCardId, points, type, purpose, isMandatory}: IUpdateStorefrontDoCard) => updateDoCard({isMandatory, purpose, type, points, doCardId}),
//         onSuccess: async (data, variables) => {
//             await queryClient.invalidateQueries({ queryKey: ["allDoCards"] });
//             toast.success("Category added successfully.");
//             closeModal();
//         },
//         onError: (error: any) =>  toast.error(error?.response?.data?.message)
//     })
// }
// export const useDeleteDoCard = (closeModal: () => void) => {
//     const queryClient = useQueryClient();
//
//     return useMutation({
//         mutationFn: ({doCardId}: { doCardId: string }) => deleteDoCard({doCardId}),
//         onSuccess: async (data, variables) => {
//             await queryClient.invalidateQueries({ queryKey: ["allDoCards"] });
//             toast.success("Category added successfully.");
//             closeModal();
//         },
//         onError: (error: any) =>  toast.error(error?.response?.data?.message)
//     })
// }