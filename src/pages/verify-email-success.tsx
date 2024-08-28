import AuthLayout from "@/layouts/AuthLayout";
import Link from "next/link";
const VerifyEmailSuccess = () => {

    return (
        <AuthLayout title={"Verification Success"}>
            <div className={"max-w-[450px]"}>
                <Link href={"/signin"}>
                    <img src="/assets/images/logo.svg" alt=""/>
                </Link>

                <div className={"mt-24 "}>
                    <div className={"flex-column gap-10 items-center justify-center"}>
                        <div className={"text-center"}>
                            <p className={"text-lg text-primary font-semibold"}>Email Address Verified!</p>
                            <p className={"text-secondary mt-2"}>Your account is now verified, now let’s get you back to your account</p>
                        </div>
                        <Link href="/signin" className={"primary-btn"}>Sign in</Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};
export default VerifyEmailSuccess;