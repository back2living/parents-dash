import {CircleCloseIcon} from "@/components/shared/Svg";

const DeleteAccount = ({closeModal}: {closeModal: () => void}) => {
    return (
        <div className={"relative modal-content pt-6"}>
            <button onClick={closeModal} className={"absolute top-4 right-4"}>{CircleCloseIcon}</button>
            <h3 className={"form-modal-title text-center"}>Delete your account?</h3>
            <p className={"text-secondary text-center mt-4 "}>Are you sure you want to permanently delete all your taks, kids, store items and erase all of your personal data stored by Playground. Once completed this action cannot be undone. This deletion can take up to 30 days.</p>

            <div>
                <div className={"flex-center gap-2 my-6"}>
                    <input type="checkbox"/>
                    <label htmlFor="" className={"text-primary font-medium text-sm"}>Yes, i want to delete my
                        account.</label>
                </div>

                <div className={"flex-center gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <button className={"primary-btn"}>Delete account</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;