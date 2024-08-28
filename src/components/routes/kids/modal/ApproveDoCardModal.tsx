import {CircleCloseIcon} from "@/components/shared/Svg";
import {IDoCard} from "@interfaces/DoCardInterfaces";
import {useApproveKidDoCardPayment} from "@hooks/useDocards";
import {useCurrentKid} from "@store/kid/kidStore";
import Button from "@components/shared/Button";

const ApproveDoCardModal = ({doCard, closeModal}: {doCard: IDoCard; closeModal: () => void}) => {
    const currentKid = useCurrentKid();

    const {isPending, mutate} = useApproveKidDoCardPayment(closeModal);

    const handleApproveDoCard = () => {
        mutate({
            doCardId: doCard?._id,
            kidId: currentKid?._id,
            type: "goal",
            status: "processing",
            isMandatory: false
        })
    }

    return (
        <div className={"relative modal-content pt-6"}>
            <button onClick={closeModal} className={"absolute top-4 right-4"}>{CircleCloseIcon}</button>
            <h3 className={"form-modal-title text-center"}>Approve goal request</h3>
            <p className={"text-secondary text-center mt-4 "}>
                Are you sure you want to approve this do-cards goal request?
            </p>

            <div className={"flex gap-6 mt-12"}>
                <button onClick={closeModal} className={"white-btn"}>No, Cancel</button>
                <Button type={"submit"} isValid={true} handleClick={handleApproveDoCard} name={"Yes, Approve"} className={"primary-btn"} isLoading={isPending}/>
            </div>
        </div>
    );
};

export default ApproveDoCardModal;