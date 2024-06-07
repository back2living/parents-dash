import {CloseIcon} from "@/components/shared/Svg";
import ModalTop from "@/components/shared/ModalTop";

const RemoveKid = ({closeModal}: {closeModal: () => void}) => {
    return (
        <div>
            <ModalTop title={"Remove kid"} Icon={CloseIcon} closeModal={closeModal} />

            <div className={"modal-content flex-column gap-10"}>
                <div className={"w-[41%] max-w-[150px] mx-auto"}>
                    <img className={"max-w-full"} src="/assets/images/remove-kid.png" alt=""/>
                </div>
                <div>
                    <p className={"text-lg text-primary text-center font-semibold"}>Remove kid</p>
                    <p className={"mt-2 text-secondary-dark font-medium text-center"}>Are you sure you want to remove [Name] from the team? Keep in mind, this action can't be undone!</p>
                </div>


                <div className={"flex-center gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <button className={"primary-btn"}>Remove kid</button>
                </div>
            </div>
        </div>
    );
};

export default RemoveKid;