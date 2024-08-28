import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
import PasswordInput from "@/components/shared/PasswordInput";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signInSchema} from "@/lib/helpers";
import {useSetCurrentUser} from "@/store/auth/authStore";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {signIn} from "@/api/auth.api";
import Button from "@/components/shared/Button";
import {CustomError} from "@interfaces/ErrorInterface";

export type EmailFormValues = {
    email: string;
    password: string;
}

const Signin = () => {
    const router = useRouter();
    const form = useForm<EmailFormValues>({mode: "onChange", resolver: zodResolver(signInSchema)});
    const {handleSubmit, formState, register} = form;
    const {errors, isValid} = formState;

    const setCurrentUser = useSetCurrentUser();
    const {mutate, isPending} = useMutation({
        mutationFn: ({email, password}: EmailFormValues) => signIn({email, password}),
        onSuccess: (data) => {
            toast.success(data?.message);
            setCurrentUser(data?.data);
            Cookies.set("pgCurrentUser", JSON.stringify(data?.data), {sameSite: "None", secure: true});
            router.push("/dashboard");
        },
        onError: (error: CustomError) => {
            toast.error(error?.response?.data?.message);
        }
    });

    const handleSignIn = (data: EmailFormValues) => {
        mutate({
            email: data.email,
            password: data.password
        });
    }

    return (
        <AuthLayout title={`Sign in`}>
            <div>
                <Link href={"/signin"}>
                    <img src="/assets/images/logo.svg" alt=""/>
                </Link>

                <div className={"mt-16 max-w-[500px]"}>
                    <div>
                        <p className={"auth-title"}>Log in</p>
                        <p className={"auth-text font-normal"}>Don’t have an account? <Link className={"text-[#F07846] font-medium"} href={"/signup"}>Sign up</Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(handleSignIn)} className={"mt-16 flex-column gap-6"}>
                       <div className={"flex-column gap-2"}>
                            <label htmlFor="email">Email Address</label>
                            <input {...register("email")} className={"auth-input"} type="email" placeholder={"name@email.com"}/>
                           {errors?.email && <span className={"auth-form-error mt-1"}>{errors?.email?.message}</span>}
                        </div>

                        <div className={"flex-column gap-2"}>
                            <PasswordInput
                                label={"Password"}
                                errors={errors}
                                name={"password"}
                                register={register}
                            />
                            <Link href={"/forgot-password"} className={"text-xs text-[#F07846] font-medium"}>Forgot password?</Link>
                        </div>

                        <Button className={"mt-0"} type={"submit"} isLoading={isPending} isValid={isValid} name={"Log in"} />
                    </form>
                </div>
            </div>
            <p className={"text-grey text-sm text-center mt-12 lg:mt-0"}>Having troubles? Please contact Support at <Link className={"text-[#F07846]"} href="/">help@playground.co</Link></p>
        </AuthLayout>
    );
};
export default Signin;