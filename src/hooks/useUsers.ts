import {useMutation, useQuery} from "@tanstack/react-query";
import {fetchStats} from "@/api/users.api";
import toast from "react-hot-toast";
import {onboardUser, uploadProfileImage} from "@/api/auth.api";
import {useCurrentUser, useSetCurrentUser} from "@store/auth/authStore";
import {CustomError} from "@interfaces/ErrorInterface";
import {IUserStats, UserType} from "@interfaces/UserInterface";

export const useFetchStats = () => {
    return useQuery({
        queryKey: ["stats"],
        queryFn: () => fetchStats()
    }) as {data: {data: IUserStats}; isPending: boolean};
}
export const useOnboardUser = (setCurrentUser: (user: UserType) => void, currentUser: UserType) => {
    return useMutation({
        mutationFn: () => onboardUser(),
        onSuccess: () => setCurrentUser({...currentUser, hasSeenOnboarding: true} as UserType),
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
            setCurrentUser({...currentUser, avatar: data?.data?.avatar, updatedAt: Date.now()} as UserType);
            closeModal();
        },
        onError: (error: CustomError) =>  toast.error(error?.response?.data?.message)
    })
}