import {CircleCloseIcon} from "@/components/shared/Svg";
import {useDeleteDoCard} from "@hooks/useDocards";
import {IDoCard} from "@interfaces/DoCardInterfaces";
import Button from "@components/shared/Button";
import {useCurrentKid} from "@store/kid/kidStore";

const DeleteDoCardModal = ({closeModal, doCard, type, isMandatory}: {doCard: IDoCard; closeModal: () => void; type: string; isMandatory: boolean}) => {
    const currentKid = useCurrentKid();
    const {isPending: isDeletePending, mutate: deleteDoCard} = useDeleteDoCard(closeModal)

    const handleDeleteDoCard = () => {
        deleteDoCard({
            doCardId: doCard?._id,
            kidId: currentKid?._id,
            type,
            isMandatory
        })
    }

    return (
        <div className={"relative modal-content pt-6"}>
            <button onClick={closeModal} className={"absolute top-4 right-4"}>{CircleCloseIcon}</button>
            <h3 className={"form-modal-title text-center"}>Delete item?</h3>
            <p className={"text-secondary text-center mt-4 "}>Are you sure you want to delete this do-card?</p>

            <div className={"flex-center gap-6 mt-12"}>
                <button onClick={closeModal} className={"white-btn"}>No, Cancel</button>
                <Button isValid={true} handleClick={handleDeleteDoCard} isLoading={isDeletePending} name={"Yes, Delete"} />
            </div>
        </div>
    );
};

export default DeleteDoCardModal;