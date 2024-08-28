import {CircleCloseIcon} from "@/components/shared/Svg";
import Button from "@/components/shared/Button";
import {IDoCard} from "@interfaces/DoCardInterfaces";
import {useAcknowledgeDoCard} from "@hooks/useDocards";
import {useCurrentKid} from "@store/kid/kidStore";

const ApproveDoCardModal = ({doCard, closeModal, isAcknowledged}: {doCard: IDoCard; closeModal: () => void; isAcknowledged: boolean}) => {
    const {mutate, isPending} = useAcknowledgeDoCard(closeModal);
    const currentKid = useCurrentKid();

    const handleAcknowledgeDoCard = () => {
        mutate({
            kidId: currentKid?._id,
            doCardId: doCard?._id,
            isAcknowledged,
        })
    }

    return (
        <div className={"relative modal-content pt-6"}>
            <button onClick={closeModal} className={"absolute top-4 right-4"}>{CircleCloseIcon}</button>
            <h3 className={"form-modal-title text-center"}>{isAcknowledged ? "Approve" : "Deny"} goal request?</h3>
            <p className={"text-secondary text-center mt-4"}>Are you sure you want to {isAcknowledged ? "approve" : "deny"} this do-cards goal request?</p>

            <div className={"flex lg:flex-row flex-col-reverse gap-2 lg:gap-6 mt-8"}>
                <button onClick={closeModal} className={"white-btn py-4"}>Cancel</button>
                <Button isValid={true} handleClick={handleAcknowledgeDoCard} isLoading={isPending} name={`${isAcknowledged ? "Yes, Approve" : "No, Deny"}`} />
            </div>
        </div>
    );
};

export default ApproveDoCardModal;