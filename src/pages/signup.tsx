import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
import PasswordInput from "@/components/shared/PasswordInput";
import {useState} from "react";
import VerifyEmail from "@/components/routes/verify-email/verify-email";

const Signup = () => {
    const [showVerifyEmailForm, setShowVerifyEmailForm] = useState(false);

    return (
        <AuthLayout>
            <div className={"max-w-[450px]"}>
                <Link href={"/signin"}>
                    <img src="/assets/images/logo.svg" alt=""/>
                </Link>
                {!showVerifyEmailForm && <div className={"mt-14"}>
                    <div>
                        <p className={"auth-title"}>Sign up</p>
                        <p className={"auth-text mt-2"}>Already have an account? <Link className={"text-[#F07846]"}
                                                                                       href={"/signin"}>Log in</Link>
                        </p>
                    </div>

                    <div className={"mt-12 flex flex-col gap-6"}>
                        <div>
                            <label className={"auth-label"} htmlFor="">Email Address</label>
                            <input className={"auth-input"} type="text" placeholder={"name@email.com"}/>
                        </div>
                        <div className={"flex-center-between gap-4"}>
                            <div className={"flex-1"}>
                                <label className={"auth-label"} htmlFor="">First name</label>
                                <input className={"auth-input"} type="text" placeholder={"John"}/>
                            </div>

                            <div className={"flex-1"}>
                                <label className={"auth-label"} htmlFor="">Last name</label>
                                <input className={"auth-input"} type="text" placeholder={"Doe"}/>
                            </div>
                        </div>

                        <PasswordInput label={""}/>

                        <button onClick={() => setShowVerifyEmailForm(true)} className={"mt-6 primary-btn"}>Continue
                        </button>
                    </div>
                </div>}

                {showVerifyEmailForm && <VerifyEmail />}

            </div>

            {!showVerifyEmailForm && <p className={"text-grey text-sm text-center"}>By continuing, you agree to our {" "}<Link className={"text-[#F07846]"} href="/">Terms of Service</Link> and <Link className={"text-[#F07846]"} href="/">Privacy Policy</Link></p>}
        </AuthLayout>
    );
};
export default Signup;