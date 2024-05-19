import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";

const ResetPassword = () => {
    return (
        <AuthLayout>
            <div className={"max-w-[450px]"}>
                <Link href={"/signin"}>
                    <img src="/assets/images/logo.svg" alt=""/>
                </Link>

                <div className={"mt-24 "}>
                    <div>
                        <p className={"auth-title"}>Reset password</p>
                        <p className={"auth-text"}>Enter your new password below</p>
                    </div>

                    <div className={"mt-12"}>
                        <div className={"flex flex-col gap-2"}>
                            <label htmlFor="">Create new password</label>
                            <input className={"auth-input"} type="password" placeholder={"••••••••••"}/>
                        </div>

                        <div className={"flex flex-col gap-2 mt-6"}>
                            <label htmlFor="">Confirm password</label>
                            <input className={"auth-input"} type="password" placeholder={"••••••••••"}/>
                        </div>

                        <button className={"mt-6 primary-btn"}>Continue</button>
                    </div>
                </div>
            </div>

            <p className={"text-grey text-sm text-center"}>Having troubles? Please contact Support at <Link
                className={"text-[#F07846]"} href="/">help@playground.co</Link></p>
        </AuthLayout>
    );
};

export default ResetPassword;