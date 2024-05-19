import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
const AccountSetup = () => {
    return (
        <AuthLayout>
            <div className={"max-w-[450px]"}>
                <Link href={"/signin"}>
                    <img src="/assets/images/logo.svg" alt=""/>
                </Link>

                <div className={"mt-24 "}>
                    <div>
                        <p className={"auth-title"}>Account information</p>
                        <p className={"auth-text text-secondary"}>Email Verified! Let's finish setting up your
                            account.</p>
                    </div>

                    <div className={"mt-12"}>
                        <div className={"flex items-center gap-4"}>
                            <div className={"flex flex-col gap-2 flex-1"}>
                                <label htmlFor="">Email Address</label>
                                <input className={"auth-input"} type="email" placeholder={"name@email.com"}/>
                            </div>

                            <div className={"flex flex-col gap-2 flex-1"}>
                                <label htmlFor="">Email Address</label>
                                <input className={"auth-input"} type="email" placeholder={"name@email.com"}/>
                            </div>
                        </div>

                        <div className={"flex flex-col gap-2 mt-6"}>
                            <label htmlFor="">Email Address</label>
                            <input className={"auth-input"} type="email" placeholder={"name@email.com"}/>
                        </div>

                        <button className={"mt-6 primary-btn"}>Submit</button>
                    </div>
                </div>
            </div>

            <p className={"text-grey text-sm text-center"}>Having troubles? Please contact Support at <Link
                className={"text-[#F07846]"} href="/">help@playground.co</Link></p>
        </AuthLayout>
    );
};
export default AccountSetup;