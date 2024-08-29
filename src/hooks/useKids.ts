import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addKid, addKidPoints, fetchKid, fetchKids, removeKid, updateKidProfileImage} from "@/api/kids.api";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {CustomError} from "@interfaces/ErrorInterface";
import {useCurrentKid, useSetCurrentKid} from "@store/kid/kidStore";

export type IKid = {
    avatar: string;
    createdAt: string;
    device: string;
    email: string;
    fcmTokens: [];
    firstName: string;
    lastName: string;
    guardian: string;
    hasSeenOnboarding: boolean;
    isSubscribed: boolean;
    isVerified: boolean;
    passwordChangeAt: string;
    points: number;
    role: string;
    suspended: boolean;
    updatedAt: number;
    username: string;
    _id: string;
    gender: string;
    dob: {
        day: number;
        month: number;
        year: number;
    }
} | null;
export interface IAddKid {
    avatar: string;
    firstName: string;
    lastName: string;
    username: string;
    dob: string;
    points: number;
    password: string;
    gender: string;
}

export const useFetchKids = () => {
    return useQuery({
        queryKey: ["kids"],
        queryFn: () => fetchKids()
    }) as {data: {data: IKid[]}; isPending: boolean; isLoading: boolean};
}
export const useFetchKid = (id: string) => {
    return useQuery({
        queryKey: ["kid", id],
        queryFn: () => fetchKid(id)
    }) as {data: {data: IKid}; isPending: boolean;};
}
export const useAddKid = (closeModal: () => void) => {
    const queryClient = useQueryClient();
    const setCurrentKid = useSetCurrentKid();
    const router = useRouter();

    return useMutation({
        mutationFn: ({avatar, dob, points, username, firstName, lastName, password, gender}: IAddKid) => addKid({avatar, dob, points, username, firstName, lastName, password, gender}),
        onSuccess: async (data, variables) => {
            setCurrentKid(data?.data);
            await router.push(`/kids/${data?.data?._id}`)
            await queryClient.invalidateQueries({ queryKey: ["kids"] });
            toast.success(`Kid ${variables?.username} has been created.`);
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}
export const useAddKidPoints = (closeModal: () => void) => {
    const currentKid = useCurrentKid();
    const setCurrentKid = useSetCurrentKid();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, points}: { id: string; points: number }) => addKidPoints({id, points}),
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries({ queryKey: ["kids"] });
            toast.success(data?.message);
            setCurrentKid({...currentKid, points: (currentKid?.points || 0) + variables?.points} as IKid)
            closeModal();
        },
        onError: (error: CustomError) => {
            toast.error(error?.response?.data?.message);
        }
    })
}
export const useRemoveKid = (closeModal: () => void) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: ({id}: {id: string}) => removeKid({id}),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["kids"] });
            toast.success(data?.message);
            await router.push("/kids")
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}
export const useUpdateKidProfileImage = (closeModal: () => void, handleStopLocalLoading: () => void) => {
    const queryClient = useQueryClient();
    const currentKid = useCurrentKid();
    const setCurrentKid = useSetCurrentKid();

    return useMutation({
        mutationFn: ({avatar, id}: {avatar: string; id: string}) => updateKidProfileImage({avatar, id}),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["kids"] });
            toast.success(data?.message)
            setCurrentKid({...currentKid, avatar: data?.data?.avatar, updatedAt: Date.now()} as IKid)
            closeModal();
            handleStopLocalLoading();
        },
        onError: (error: CustomError) => {
            toast.error(error?.response?.data?.message);
            handleStopLocalLoading();
        }
    })
}