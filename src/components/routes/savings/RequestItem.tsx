import FormModal from "@/components/shared/FormModal";
import {useState} from "react";
import ApproveModal from "@/components/routes/savings/modal/ApproveModal";
import DeclineModal from "@/components/routes/savings/modal/DeclineModal";
import InfoModal from "@/components/shared/InfoModal";
import EditSavingGoalsModal from "@/components/routes/savings/modal/EditModal";

type GoalProps = {
    goal: {
        itemImg: string;
        name: string;
        points: number | string;
        target: number | string;
        profileImage?: string;
    }
}
type ModalActionType = "edit" | "approve" | "decline";

const RequestItem = ({goal}: GoalProps) => {
    const [requestModal, setRequestModal] = useState({approve: false, decline: false, edit: false});
    const [goalRequest, setGoalRequest] = useState<null | {}>(null);

    const isModalOpen = requestModal.approve || requestModal.decline

    const handleOpenModal = (modalType: ModalActionType) => setRequestModal((prevState) => ({...prevState, [modalType]: true}));
    const handleCloseModal = (modalType: ModalActionType) => {
        setRequestModal((prevState) => ({
            ...prevState,
            [modalType]: false,
        }));
    };

    return (
        <div className={"flex-between items-start gap-6 bg-primary rounded-xl p-3"}>
            <div className={"flex items-center flex-1 gap-6"}>
                <div className="w-32 h-24 lg:w-[200px] lg:h-[120px] rounded-xl gap-2 bg-white">
                    <img className={"w-full h-full rounded-xl object-cover"} src={goal.itemImg} alt=""/>
                </div>
                <div className={"w-full"}>
                    <div className={"flex justify-between"}>
                        <p className={"font-medium text-primary"}>{goal.name}</p>
                        <button onClick={() => {
                            handleOpenModal("edit");
                            setGoalRequest(goal);
                        }} className={"text-sm text-orange font-semibold"}>Edit</button>
                    </div>
                    <div className={"flex-center gap-6 my-2"}>
                        <div>
                            <p className={"text-primary text-sm font-medium"}>{goal.points}pts</p>
                            <p className={"text-secondary text-xs font-light"}>Target</p>
                        </div>
                        <div>
                            <p className={"text-primary text-sm font-medium"}>{goal.target}pts</p>
                            <p className={"text-secondary text-xs font-light"}>Daily</p>
                        </div>
                    </div>
                    <div className={"flex-center-between"}>
                        <img className={"w-8 h-8 rounded-full object-cover"} src={goal.profileImage} alt={"profile-img"}/>

                        <div className={"flex-center gap-4 text-sm font-semibold"}>
                            <button onClick={() => handleOpenModal("approve")} className={"text-[#09C2B2]"}>Approve</button>
                            <button onClick={() => handleOpenModal("decline")} className={"text-secondary"}>Decline</button>
                        </div>
                    </div>
                </div>
            </div>

            <FormModal isOpen={isModalOpen} style={`lg:w-[450px] max-h-full overflow-y-auto lg:mb-0 rounded-t-3xl`}>
                {requestModal.approve && <ApproveModal closeModal={() => handleCloseModal("approve")}/>}
                {requestModal.decline && <DeclineModal closeModal={() => handleCloseModal("decline")}/>}
            </FormModal>

            <InfoModal isOpen={requestModal.edit} style={"w-full lg:w-[400px] h-full overflow-y-auto"}>
                <EditSavingGoalsModal goal={goal} closeModal={() => handleCloseModal("edit")} />
            </InfoModal>
        </div>
    );
};

export default RequestItem;