import {CloseIcon} from "@/components/shared/Svg";
import PasswordInput from "@/components/shared/PasswordInput";
import ModalTop from "@/components/shared/ModalTop";

const ChangePassword = ({closeModal}: {closeModal: () => void}) => {
    return (
        <div>
            <ModalTop title={"Change Password"} Icon={CloseIcon} closeModal={closeModal} />

            <div className={"modal-content flex-column gap-6"}>
                <PasswordInput label={""} />
                <PasswordInput label={""} />

                <div className={"flex gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <button className={"primary-btn"}>Done</button>
                </div>
            </div>

        </div>
    );
};

export default ChangePassword;