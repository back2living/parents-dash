import {CircleCloseIcon} from "@/components/shared/Svg";

const DeleteChecklist = ({closeModal}: {closeModal: () => void}) => {
    return (
        <div className={"relative modal-content pt-6"}>
            <button onClick={closeModal} className={"absolute top-4 right-4"}>{CircleCloseIcon}</button>
            <h3 className={"form-modal-title text-center"}>Delete checklist?</h3>
            <p className={"text-secondary text-center mt-4"}>Are you sure you want to permanently remove this checklist from it’s category? This action is not reversible.</p>

            <div>

                <div className={"flex-center lg:flex-row flex-col gap-2 mt-8"}>
                    <button onClick={closeModal} className={"white-btn py-4"}>No, Keep it</button>
                    <button className={"primary-btn py-4"}>Yes, delete checklist</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteChecklist;