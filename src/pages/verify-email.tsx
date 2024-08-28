import AuthLayout from "@/layouts/AuthLayout";
import Link from "next/link";
import {useRouter} from "next/router";
import {useMutation} from "@tanstack/react-query";
import {useEffect} from "react";
import {verifyUserEmail} from "@/api/auth.api";

const VerifyEmail = () => {
    const router = useRouter();
    const code = router?.query?.code as string;
    const token = router?.query?.token as string;

    const {mutate} = useMutation({
        mutationFn: async ({token, code}: {token: string; code: string}) => await verifyUserEmail({token, code}),
        onSuccess: () => router.push("/verify-email-success"),
        onError: () => router.push("/verify-email-failure")
    })

    useEffect(() => {
        if (token) {
            mutate({token, code});
        }
    }, [token]);

    return (
        <AuthLayout title={"Verify Email"}>
            <div className={"max-w-[450px]"}>
                <Link href={"/signin"}>
                    <img src="/assets/images/logo.svg" alt=""/>
                </Link>

                <div className={"mt-24 "}>
                    <div className={"flex-column gap-6 items-center justify-center"}>
                        <p className={"text-lg text-primary font-semibold"}>Verifying Email....</p>
                        <div className={"email-loader"}/>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};
export default VerifyEmail;