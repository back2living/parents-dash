import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
import PasswordInput from "@/components/shared/PasswordInput";
import {useState} from "react";
import VerifyEmail from "@/components/routes/verify-email/verify-email";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signupSchema} from "@/lib/helpers";
import instance, {baseUrl} from "@/api/instance";
import toast from "react-hot-toast";
import Button from "@/components/shared/Button";
import axios from "axios";

interface CustomError extends Error {
    response: {
        data: {
            message: string;
        };
    };
}

interface ValidationError {
    message: string;
    errors: Record<string, string[]>
}

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const Signup = () => {
    const [showVerifyEmailForm, setShowVerifyEmailForm] = useState(false);
    const [token, setToken] = useState("");

    const form = useForm<FormValues>({mode: "onChange", resolver: zodResolver(signupSchema)});
    const {handleSubmit, formState, register} = form;
    const {errors, isValid, isSubmitting} = formState;

    const signUpUser: SubmitHandler<FormValues> = async (userData) => {
        const {firstName, lastName, email, password} = userData;
        const payload = {firstName, lastName, email, password}
        try {
            const {data} = await instance.post(`${baseUrl}/auth/signup`, payload);
            toast.success(data?.message);
            setToken(data?.data?.token);
            localStorage.setItem("userRegistrationEmail", email);
            setShowVerifyEmailForm(true);
        } catch (err: CustomError | unknown) {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(err)) {
                toast.error(err?.response?.data?.message || "")
            } else {
                toast.error("An error occurred");
                console.error(err);
            }
        }
    }

    return (
        <AuthLayout title={"Sign up"}>
            <div className={"lg:max-w-[500px] w-full mx-auto overflow-auto"}>
                <Link href={"/signin"}><img src="/assets/images/logo.svg" alt=""/></Link>
                {!showVerifyEmailForm && <div className={"mt-12 lg:mt-6 xl:mt-14"}>
                    <div>
                        <p className={"auth-title"}>Sign up</p>
                        <p className={"auth-text mt-2"}>Already have an account? <Link className={"text-[#F07846]"} href={"/signin"}>Log in</Link></p>
                    </div>
                    <form action={""} onSubmit={handleSubmit(signUpUser)} noValidate className={"lg:mt-6 xl:mt-12 flex flex-col gap-6"}>
                        <div>
                            <label className={"auth-label"} htmlFor="email">Email Address</label>
                            <input {...register("email")} className={"auth-input"} type="email" placeholder={"name@email.com"}/>
                            {errors?.email && <span className={"auth-form-error mt-1"}>{errors?.email?.message}</span>}
                        </div>
                        <div className={"flex-center-between gap-4"}>
                            <div className={"flex-1 relative"}>
                                <label className={"auth-label"} htmlFor="">First name</label>
                                <input {...register("firstName")} className={"auth-input"} type="text" placeholder={"John"}/>
                                {errors?.firstName && <span className={"auth-form-error mt-1 absolute"}>{errors?.firstName?.message}</span>}
                            </div>

                            <div className={"flex-1 relative"}>
                                <label className={"auth-label"} htmlFor="">Last name</label>
                                <input {...register("lastName")} className={"auth-input"} type="text" placeholder={"Doe"}/>
                                {errors?.lastName && <span className={"auth-form-error mt-1 absolute"}>{errors?.lastName?.message}</span>}
                            </div>
                        </div>

                        <PasswordInput
                            label={"Password"}
                            errors={errors}
                            name={"password"}
                            register={register}
                        />

                        <Button className={"mt-6"} type={"submit"} isLoading={isSubmitting} isValid={isValid} name={"Continue"} />
                    </form>
                </div>}
                {showVerifyEmailForm && <VerifyEmail token={token} />}
            </div>

            {!showVerifyEmailForm && <p className={"text-grey text-sm text-center"}>By continuing, you agree to our {" "}<Link className={"text-[#F07846]"} href="/">Terms of Service</Link> and <Link className={"text-[#F07846]"} href="/">Privacy Policy</Link></p>}
        </AuthLayout>
    );
};
export default Signup;