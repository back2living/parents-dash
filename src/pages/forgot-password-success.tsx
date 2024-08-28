import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
import {useResendVerificationEmail} from "@/hooks/useResendVerificationEmail";

const ForgotPasswordSuccess = () => {
    const userEmail =  typeof window !== "undefined" ? (localStorage.getItem("forgotPasswordEmail") as string) : null;
    const clearStorage = () => localStorage.removeItem("forgotPasswordEmail");
    const {mutate} = useResendVerificationEmail();

    const handleResendEmail = () => mutate({email: userEmail!});

    return (
        <AuthLayout title={"Forgot Password "}>
            <div className={"max-w-[450px]"}>
                <Link href={"/signin"}>
                    <button onClick={clearStorage}><img src="/assets/images/logo.svg" alt=""/></button>
                </Link>

                <div className={"mt-24 "}>
                    <div>
                        <p className={"auth-title"}>Check your email</p>
                        <p className={"auth-text mt-4 text-secondary"}>We have sent an email to you with a link to reset your password</p>
                    </div>

                    <p className={"mt-12 text-secondary text-center"}>I did not receive a mail. <button onClick={handleResendEmail} className={"text-orange"}>Try again?</button></p>
                </div>
            </div>
            <p className={"text-grey text-sm text-center"}>Having troubles? Please contact Support at <Link className={"text-[#F07846]"} href="/">help@playground.co</Link></p>
        </AuthLayout>
    );
};
export default ForgotPasswordSuccess;