import {CloseIcon} from "@/components/shared/Svg";
import PasswordInput from "@/components/shared/PasswordInput";

const ChangePassword = ({closeModal}: any) => {
    return (
        <div>
            <div className={"flex-center-between"}>
                <p className={"form-modal-title"}>Change Password</p>
                <button onClick={closeModal}>{CloseIcon}</button>
            </div>

            <div className={"mt-6 flex-column gap-6"}>
                <PasswordInput />
                <PasswordInput />

                <div className={"flex gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <button className={"primary-btn"}>Done</button>
                </div>
            </div>

        </div>
    );
};

export default ChangePassword;