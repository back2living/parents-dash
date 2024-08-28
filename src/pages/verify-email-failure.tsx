import AuthLayout from "@/layouts/AuthLayout";
import Link from "next/link";
import Button from "@/components/shared/Button";
import {useResendVerificationEmail} from "@/hooks/useResendVerificationEmail";

const VerifyEmailFailure = () => {
    const userEmail =  localStorage.getItem("userRegistrationEmail");

    const {mutate, isPending} = useResendVerificationEmail();
    const handleResendEmail = () => mutate({email: userEmail!});

    return (
        <AuthLayout title={"Verification Failure"}>
            <div className={"max-w-[450px]"}>
                <Link href={"/signin"}><img src="/assets/images/logo.svg" alt=""/></Link>

                <div className={"mt-24 "}>
                    <div className={"flex-column gap-10 items-center justify-center"}>
                        <div className={"text-center"}>
                            <p className={"text-lg text-primary font-semibold"}>Sorry, Verification Failed!</p>
                            <p className={"text-secondary mt-2"}>Your email address could not be verified, please request a new verification link.</p>
                        </div>
                        <Button name={"Resend Link"} isLoading={isPending} isValid={true} handleClick={handleResendEmail} className={"primary-btn"}/>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};
export default VerifyEmailFailure;