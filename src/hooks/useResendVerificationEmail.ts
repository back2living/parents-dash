import {useMutation} from "@tanstack/react-query";
import {resendEmailVerificationLink} from "@/api/auth.api";
import toast from "react-hot-toast";
import {CustomError} from "@interfaces/ErrorInterface";

export const useResendVerificationEmail = () => {
    return useMutation({
        mutationFn: async ({email}: {email: string}) =>  await resendEmailVerificationLink({email}),
        onSuccess: (data) => toast.success(data?.message),
        onError: (error: CustomError) => toast.error(error?.response?.data?.message),
    });
}