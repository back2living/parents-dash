import {CloseIcon} from "@/components/shared/Svg";
import PasswordInput from "@/components/shared/PasswordInput";
import ModalTop from "@/components/shared/ModalTop";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {changePasswordSchema} from "@/lib/helpers";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {changeKidPassword} from "@/api/users.api";
import Button from "@/components/shared/Button";
import {CustomError} from "@interfaces/ErrorInterface";
import {useCurrentKid} from "@store/kid/kidStore";

type ChangePasswordValues = {
    password: string;
    confirmPassword: string;
}

const ChangePassword = ({closeModal}: {closeModal: () => void}) => {
    const form = useForm<ChangePasswordValues>({mode: "onChange", resolver: zodResolver(changePasswordSchema)});
    const {handleSubmit, formState, register} = form;
    const {errors, isValid} = formState;

    const currentKid = useCurrentKid();

    const {mutate, isPending} = useMutation({
        mutationFn: ({password, id}: {password: string; id: string}) => changeKidPassword({password, id}),
        onSuccess: (data) => {
            toast.success(data?.message);
            closeModal();
        },
        onError: (error: CustomError) => toast.error(error?.response?.data?.message)
    });
    const handleChangePassword = (data: { password: string }) => {
        if (currentKid?._id) {
            mutate({
                id: currentKid._id,
                password: data.password
            });
        }
    }

    return (
        <div>
            <ModalTop title={"Change Password"} Icon={CloseIcon} closeModal={closeModal} />

            <form onSubmit={handleSubmit(handleChangePassword)} className={"modal-content flex-column gap-6"}>
                <PasswordInput
                    label={"Password"}
                    errors={errors}
                    name={"password"}
                    register={register}
                />

                <PasswordInput
                    label={"New Password"}
                    errors={errors}
                    name={"confirmPassword"}
                    register={register}
                    type={"confirmPassword"}
                />

                <div className={"flex gap-6"}>
                    <button type={"button"} onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <Button className={"mt-0"} type={"submit"} isLoading={isPending} isValid={isValid} name={"Change Password"} />
                </div>
            </form>

        </div>
    );
};

export default ChangePassword;