import {CircleCloseIcon} from "@/components/shared/Svg";
import {useSetCurrentUser} from "@/store/auth/authStore";
import {useRouter} from "next/router";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {logout} from "@/api/auth.api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Button from "@/components/shared/Button";

const LogoutModal = ({closeModal}: {closeModal: () => void}) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const setCurrentUser = useSetCurrentUser();

    const {mutate, isPending} = useMutation({
        mutationFn: () => logout(),
        onMutate: async () => {
            Cookies.remove("pgCurrentUser");
            await router.push("/signin");
        },
        onSuccess: async (data) => {
            toast.success(data.message);
            queryClient.clear();
            Cookies.remove("pgCurrentUser");
            setCurrentUser(null);
            await router.push("/signin");
        },
        onError: async () => {
            queryClient.clear();
            Cookies.remove("pgCurrentUser");
            await router.push("/signin");
        }
    });
    const handleLogout = () => mutate();

    return (
        <div className={"relative modal-content pt-6"}>
            <button onClick={closeModal} className={"absolute top-4 right-4"}>{CircleCloseIcon}</button>
            <h3 className={"form-modal-title text-center"}>Logout?</h3>
            <p className={"text-secondary text-center mt-4"}>You’re about to logout, are you sure?</p>

            <div className={"flex lg:flex-row flex-col-reverse gap-2 lg:gap-6 mt-8"}>
                <button onClick={closeModal} className={"white-btn py-4"}>Cancel</button>
                <Button isValid={true} handleClick={handleLogout} isLoading={isPending} name={"Logout"} />
            </div>
        </div>
    );
};

export default LogoutModal;