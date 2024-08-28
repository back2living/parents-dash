import {useMutation, useQuery} from "@tanstack/react-query";
import {fetchStats} from "@/api/users.api";
import toast from "react-hot-toast";
import {onboardUser, uploadProfileImage} from "@/api/auth.api";
import {useCurrentUser, useSetCurrentUser} from "@store/auth/authStore";
import {CustomError} from "@interfaces/ErrorInterface";
import {IUser, IUserStats} from "@interfaces/UserInterface";

export const useFetchStats = () => {
    return useQuery({
        queryKey: ["stats"],
        queryFn: () => fetchStats()
    }) as {data: {data: IUserStats}; isPending: boolean};
}
export const useOnboardUser = (setCurrentUser: (user: IUser) => void, currentUser: IUser) => {
    return useMutation({
        mutationFn: () => onboardUser(),
        onSuccess: () => setCurrentUser({...currentUser, hasSeenOnboarding: true}),
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}

export const useUpdateUserProfileImage = (closeModal: () => void ) => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    return useMutation({
        mutationFn: ({avatar}: {avatar: string}) => uploadProfileImage({avatar}),
        onSuccess: (data) => {
            toast.success(data?.message)
            setCurrentUser({...currentUser, avatar: data?.data?.avatar, updatedAt: Date.now()});
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}