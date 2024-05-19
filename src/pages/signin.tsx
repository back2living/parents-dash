import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
import PasswordInput from "@/components/shared/PasswordInput";
import {useRouter} from "next/router";

const Signin = () => {
    const router = useRouter();

    return (
        <AuthLayout>
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

                    <div className={"mt-16 flex-column gap-6 "}>
                       <div className={"flex-column gap-2"}>
                            <label htmlFor="">Email Address</label>
                            <input className={"auth-input"} type="email" placeholder={"name@email.com"}/>
                        </div>

                        <div className={"flex-column gap-2"}>
                            <PasswordInput label={""} />
                            <Link href={"/forgot-password"} className={"text-xs text-[#F07846] font-medium"}>Forgot password?</Link>
                        </div>


                        <button onClick={() => router.push("/dashboard")} className={"primary-btn"}>Log in</button>
                    </div>
                </div>
            </div>
            <p className={"text-grey text-sm text-center mt-12 lg:mt-0"}>Having troubles? Please contact Support
                at <Link className={"text-[#F07846]"} href="/">help@playground.co</Link></p>
        </AuthLayout>
    );
};

export default Signin;