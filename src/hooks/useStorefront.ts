import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    addStorefrontCategory,
    addStorefrontCategoryItem, approveOrRejectKidPurchase,
    deleteStorefrontCategoryItem,
    editStorefrontCategoryItem, fetchStorefrontPurchases,
    fetchStorefrontsCategories,
    fetchStorefrontsWithCategories,
    // addKidStorefrontDoCardPayment,
    // deleteStorefrontDoCard,
    // IAddKidDoCardPayment,
    IAddStorefrontCategory,
    IAddStorefrontCategoryItem,
    // IUpdateStorefrontDoCard,
    // updateStorefrontDoCard
} from "@/api/storefront.api";
import toast from "react-hot-toast";
import {IPurchasedStorefrontItem, StorefrontCategoryOnly} from "@/interfaces/StorefrontInterface";
import {CustomError} from "@interfaces/ErrorInterface";

export const useFetchAllStorefronts = () => {
    return useQuery({
        queryKey: ["storefronts"],
        queryFn: () => fetchStorefrontsWithCategories()
    });
}
export const useFetchAllStorefrontsCategories = () => {
    return useQuery({
        queryKey: ["storefrontsCategories"],
        queryFn: () => fetchStorefrontsCategories()
    }) as {data: {data: StorefrontCategoryOnly[]}; isPending: boolean};
}
export const useAddStorefrontCategory = (closeModal: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({title}: IAddStorefrontCategory) => addStorefrontCategory({title}),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["storefronts"] });
            toast.success(data?.message);
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}

export const useAddStorefrontCategoryItem = (closeModal: () => void, handleStopLocalLoading: () => void, handleCacheBuster: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({name, avatar, id, description, points}: IAddStorefrontCategoryItem) => addStorefrontCategoryItem({name, description,  avatar, points, id}),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["storefronts"] });
            toast.success(data?.message || "Item added successfully.");
            handleCacheBuster();
            closeModal();
            handleStopLocalLoading();
        },
        onError: (error: CustomError) => {
            toast.error(error?.response?.data?.message);
            handleStopLocalLoading();
        }
    })
}
export const useEditStorefrontCategoryItem = (closeModal: () => void, handleStopLocalLoading: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({name, avatar, id, description, points}: IAddStorefrontCategoryItem) => editStorefrontCategoryItem({name, description,  avatar, points, id}),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["storefronts"] });
            toast.success(data?.message || "Item edited successfully.");
            closeModal();
            handleStopLocalLoading();
        },
        onError: (error: CustomError) => {
            toast.error(error?.response?.data?.message);
            handleStopLocalLoading();
        }
    })
}
export const useDeleteStorefrontCategoryItem = (closeModal: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id}: { id: string }) => deleteStorefrontCategoryItem({id}),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["storefronts"] });
            toast.success(data?.message || "Item deleted successfully.");
            closeModal();
        },
        onError: (error: CustomError) => {
            toast.error(error?.response?.data?.message);
        }
    })
}

export const useFetchStorefrontPurchases = (id: string, status?:string) => {
    return useQuery({
        queryKey: ["storefrontPurchases", id, status],
        queryFn: () => fetchStorefrontPurchases(id, status)
    }) as {data: {data: IPurchasedStorefrontItem[]}; isPending: boolean; isRefetching: boolean};
}
export const useApproveOrRejectKidPurchase = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, approved}: { id: string; approved: boolean, kidId?: string, status?: string }) => approveOrRejectKidPurchase(id, approved),
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries({ queryKey: ["storefrontPurchases", variables?.kidId, variables?.status] });
            toast.success(data?.message);
        },
        onError: (error: CustomError) => toast.error(error?.response?.data?.message)
    })
}







//
// export const useAddKidStorefrontDoCardPayment = (closeModal: () => void) => {
//     const queryClient = useQueryClient();
//
//     return useMutation({
//         mutationFn: ({doCardId, kidId, points}: IAddKidDoCardPayment) => addKidStorefrontDoCardPayment({doCardId, kidId, points}),
//         onSuccess: async (data, variables) => {
//             await queryClient.invalidateQueries({ queryKey: ["storefronts"] });
//             toast.success("Category added successfully.");
//             closeModal();
//         },
//         onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
//     })
// }
// export const useUpdateStorefrontDoCard = (closeModal: () => void) => {
//     const queryClient = useQueryClient();
//
//     return useMutation({
//         mutationFn: ({doCardId, points, type, purpose, isMandatory}: IUpdateStorefrontDoCard) => updateStorefrontDoCard({isMandatory, purpose, type, points, doCardId}),
//         onSuccess: async (data, variables) => {
//             await queryClient.invalidateQueries({ queryKey: ["storefronts"] });
//             toast.success("Category added successfully.");
//             closeModal();
//         },
//         onError: (error: any) =>  toast.error(error?.response?.data?.message)
//     })
// }
// export const useDeleteStorefrontDoCard = (closeModal: () => void) => {
//     const queryClient = useQueryClient();
//
//     return useMutation({
//         mutationFn: ({doCardId}: { doCardId: string }) => deleteStorefrontDoCard({doCardId}),
//         onSuccess: async (data, variables) => {
//             await queryClient.invalidateQueries({ queryKey: ["storefronts"] });
//             toast.success("Category added successfully.");
//             closeModal();
//         },
//         onError: (error: any) =>  toast.error(error?.response?.data?.message)
//     })
// }