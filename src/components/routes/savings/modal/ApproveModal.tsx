import {CircleCloseIcon} from "@/components/shared/Svg";

const ApproveModal = ({closeModal}: {closeModal: () => void}) => {
    return (
        <div className={"relative"}>
            <button onClick={closeModal} className={"absolute top-0 right-0"}>{CircleCloseIcon}</button>
            <h3 className={"form-modal-title text-center"}>Approve savings request</h3>
            <p className={"text-secondary text-center mt-4 "}>Are you sure you want to approve this savings goal request?</p>

            <div className={"flex-center gap-6 mt-12"}>
                <button onClick={closeModal} className={"white-btn"}>No, Cancel</button>
                <button className={"primary-btn"}>Yes, Approve</button>
            </div>
        </div>
    );
};

export default ApproveModal;