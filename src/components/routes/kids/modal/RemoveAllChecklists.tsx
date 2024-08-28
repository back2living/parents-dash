import {CircleCloseIcon} from "@/components/shared/Svg";

const RemoveAllChecklist = ({closeModal}: {closeModal: () => void}) => {
    return (
        <div className={"relative modal-content pt-6"}>
            <button onClick={closeModal} className={"absolute top-4 right-4"}>{CircleCloseIcon}</button>
            <h3 className={"form-modal-title text-center"}>Remove all tasks?</h3>
            <p className={"text-secondary text-center mt-4"}>
                Are you sure you want to remove  all checklists from this category?</p>

            <div>

                <div className={"flex gap-6 mt-8"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <button className={"primary-btn"}>Remove all?</button>
                </div>
            </div>
        </div>
    );
};

export default RemoveAllChecklist;