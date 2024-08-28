import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
import {useRouter} from "next/router";
import {useMutation} from "@tanstack/react-query";
import {forgotPassword} from "@/api/auth.api";
import toast from "react-hot-toast";
import Button from "@/components/shared/Button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {forgotPasswordSchema} from "@/lib/helpers";

export type FormValues = {
    email: string;
}
const ForgotPassword = () => {
    const router = useRouter();
    const form = useForm<FormValues>({mode: "onChange", resolver: zodResolver(forgotPasswordSchema)});
    const {formState, register, handleSubmit} = form;
    const {errors, isValid} = formState;

    const {mutate, isPending} = useMutation({
        mutationFn: ({email}: FormValues) => forgotPassword({email}),
        onSuccess: async (data, variables) => {
            toast.success(data?.message);
            localStorage.setItem("forgotPasswordEmail", variables?.email);
            await router.push("/forgot-password-success");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message)
        }
    });

    const handleForgotPassword = (data: FormValues) => {
        mutate({email: data.email});
    }

    return (
        <AuthLayout title={"Playground - Forgot Password"}>
            <div className={"max-w-[450px]"}>
                <Link href={"/signin"}>
                    <img src="/assets/images/logo.svg" alt=""/>
                </Link>

                <div className={"mt-24 "}>
                    <div>
                        <p className={"auth-title"}>Forgot password</p>
                        <p className={"auth-text"}>We will send you instructions on how to reset your password by
                            email.</p>
                    </div>

                    <form onSubmit={handleSubmit(handleForgotPassword)} className={"mt-12"}>
                        <div className={"flex flex-col gap-2"}>
                            <label htmlFor="">Email Address</label>
                            <input {...register("email")} className={"auth-input"} type="email" placeholder={"name@email.com"}/>
                            {errors?.email && <span className={"auth-form-error mt-1"}>{errors?.email?.message}</span>}
                        </div>

                        <Button isValid={isValid} isLoading={isPending} className={"mt-6"} name={"Submit"} type={"submit"} />
                    </form>
                </div>
            </div>

            <p className={"text-grey text-sm text-center"}>Having troubles? Please contact Support at <Link className={"text-[#F07846]"} href="/">help@playground.co</Link></p>
        </AuthLayout>
    );
};
export default ForgotPassword;