import AuthLayout from "@/layouts/AuthLayout";
import Link from "next/link";
const VerifyEmail = () => {

    return (
        <AuthLayout>
            <div className={"max-w-[450px]"}>
                <Link href={"/signin"}>
                    <img src="/assets/images/logo.svg" alt=""/>
                </Link>

                <div className={"mt-24 "}>
                    <div>
                        <p className={"auth-title"}>Check your email</p>
                        <p className={"auth-text mt-4 text-secondary"}>
                            We have sent an email to you with a link to verify your email address.
                        </p>
                    </div>

                    <p className={"mt-12 text-secondary text-center"}>I did not receive a mail. <span
                        className={"text-orange"}>Try again?</span></p>
                </div>
            </div>
        </AuthLayout>
    );
};
export default VerifyEmail;