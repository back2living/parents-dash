import PasswordInput from "@/components/shared/PasswordInput";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {changeUserPasswordSchema} from "@/lib/helpers";
import Button from "@components/shared/Button";
import {useMutation} from "@tanstack/react-query";
import {changeGuardianPassword} from "@api/users.api";
import toast from "react-hot-toast";
import {CustomError} from "@interfaces/ErrorInterface";

export type ChangePasswordFormValues = {
    oldPassword: string;
    password: string;
    confirmPassword?: string;
}

const Security = () => {
    const form = useForm<ChangePasswordFormValues>({mode: "onChange", resolver: zodResolver(changeUserPasswordSchema)});
    const {handleSubmit, formState, register} = form;
    const {errors, isValid} = formState;

    const {mutate, isPending} = useMutation({
        mutationFn: ({password, oldPassword}: {password: string;  oldPassword: string}) => changeGuardianPassword({password, oldPassword}),
        onSuccess: (data) => {
            toast.success(data?.message);
        },
        onError: (error: CustomError) => toast.error(error?.response?.data?.message)
    });

    const handleChangePassword = (data: ChangePasswordFormValues) => {
        delete data.confirmPassword;
        console.log(data);
        mutate({
            oldPassword: data.oldPassword,
            password: data.password
        });
    }


    return (
        <div className={"max-w-[450px]"}>
            <p className={"text-md text-primary font-semibold"}>Change Password</p>

            <form onSubmit={handleSubmit(handleChangePassword)} className={"mt-10"}>
                <PasswordInput
                    label={"Current Password"}
                    // errors={errors}
                    name={"oldPassword"}
                    register={register}
                />
                <div className="border border-[#F7F7F7] my-10"/>
                <div className={"flex-column gap-6"}>
                    <PasswordInput
                        label={"Create New Password"}
                        errors={errors}
                        name={"password"}
                        register={register}
                    />
                    <PasswordInput
                        label={"Confirm Password"}
                        errors={errors}
                        name={"confirmPassword"}
                        register={register}
                        type={"confirmPassword"}
                    />
                </div>

                <Button className={"mt-6"} type={"submit"} isLoading={isPending} isValid={isValid} name={"Change Password"} />
                {/*<button className={"primary-btn mt-6"}>Change password</button>*/}
            </form>
        </div>
    );
};

export default Security;