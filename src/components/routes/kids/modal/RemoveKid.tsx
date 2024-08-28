import {CloseIcon} from "@/components/shared/Svg";
import ModalTop from "@/components/shared/ModalTop";
import {useRemoveKid} from "@/hooks/useKids";
import Button from "@/components/shared/Button";
import Image from "next/image";
import {useCurrentKid} from "@store/kid/kidStore";

interface IRemoveKid {
    closeModal: () => void;
}

const RemoveKid = ({closeModal}: IRemoveKid) => {
    const currentKid = useCurrentKid();
    const {mutate, isPending} = useRemoveKid(closeModal);
    const handleRemoveKid = () => {
        if (currentKid) {
            mutate({
                id: currentKid?._id
            });
        }
    };

    return (
        <div>
            <ModalTop title={"Remove kid"} Icon={CloseIcon} closeModal={closeModal} />

            <div className={"modal-content flex-column gap-10"}>
                <Image
                    width={200}
                    height={160}
                    className={"mx-auto max-h-[160px] h-full object-cover rounded-lg"}
                    src={currentKid ? currentKid.avatar : "/assets/images/no-kid.png"}
                    alt=""
                />

                <div>
                    <p className={"text-lg text-primary text-center font-semibold"}>Remove kid</p>
                    <p className={"mt-2 text-secondary-dark font-medium text-center"}>Are you sure you want to remove {currentKid?.username} from the team? Keep in mind, this action can't be undone!</p>
                </div>

                <div className={"flex gap-4 lg:gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <Button isLoading={isPending} name={"Remove kid"} isValid={true} handleClick={handleRemoveKid} />
                </div>
            </div>
        </div>
    );
};

export default RemoveKid;