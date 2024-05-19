import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
const ForgotPasswordSuccess = () => {
    return (
        <AuthLayout>
            <div className={"max-w-[450px]"}>
                <Link href={"/signin"}>
                    <img src="/assets/images/logo.svg" alt=""/>
                </Link>

                <div className={"mt-24 "}>
                    <div>
                        <p className={"auth-title"}>Check your email</p>
                        <p className={"auth-text mt-4 text-secondary"}>We have sent an email to you with a link to reset
                            your password</p>
                    </div>

                    <p className={"mt-12 text-secondary text-center"}>I did not receive a mail. <span className={"text-orange"}>Try again?</span></p>
                </div>
            </div>

            <p className={"text-grey text-sm text-center"}>Having troubles? Please contact Support at <Link
                className={"text-[#F07846]"} href="/">help@playground.co</Link></p>
        </AuthLayout>
    );
};
export default ForgotPasswordSuccess;