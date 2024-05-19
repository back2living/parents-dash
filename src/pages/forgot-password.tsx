import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
import {useRouter} from "next/router";
const ForgotPassword = () => {
    const router = useRouter();

    const handleSubmit = () => router.push("/forgot-password-success");

    return (
        <AuthLayout>
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

                    <div className={"mt-12"}>
                        <div className={"flex flex-col gap-2"}>
                            <label htmlFor="">Email Address</label>
                            <input className={"auth-input"} type="email" placeholder={"name@email.com"}/>
                        </div>

                        <button onClick={handleSubmit} className={"mt-6 primary-btn"}>Submit</button>
                    </div>
                </div>
            </div>

            <p className={"text-grey text-sm text-center"}>Having troubles? Please contact Support at <Link className={"text-[#F07846]"} href="/">help@playground.co</Link></p>
        </AuthLayout>
    );
};
export default ForgotPassword;