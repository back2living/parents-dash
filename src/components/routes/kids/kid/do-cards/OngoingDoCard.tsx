import {IDoCard} from "@interfaces/DoCardInterfaces";
import {DeleteIcon} from "@components/shared/Svg";
import FormModal from "@components/shared/FormModal";
import {useState} from "react";
import EditDoCardModal from "@components/routes/kids/modal/EditDoCardModal";
import ApproveDoCardModal from "@components/routes/kids/modal/ApproveDoCard";
import DeleteDoCardModal from "@components/routes/kids/modal/DeleteDoCardModal";

const OngoingDoCard = ({doCard}: {doCard: IDoCard}) => {
    const [showApproveDoCardModal, setShowApproveDoCardModal] = useState(false);
    const [showDeleteDoCardModal, setShowDeleteDoCardModal] = useState(false);
    const [acknowledgeDoCard, setAcknowledgeDoCard] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const width = (doCard?.paid / doCard?.points) * 100;
    const isCompleted = false;
    const showEditButton = doCard?.paid <= 0 && !doCard?.storefront;
    const isAcknowledged = doCard?.isAcknowledged;

    const handleShowApproveModal = (acknowledgedState: boolean) => {
        setAcknowledgeDoCard(acknowledgedState)
        setShowApproveDoCardModal(true);
    }

    return (
        <div className={"bg-primary p-3 rounded-2xl"}>
            <div className={"w-full h-[150px] rounded-xl"}>
                <img
                    className={"w-full h-full object-cover rounded-xl"}
                    src={doCard.avatar}
                    alt={doCard.purpose}
                />
            </div>
            <div className={"mt-3 flex-column gap-2"}>
                <p className={"text-primary capitalize font-medium"}>{doCard.purpose}</p>

                <div className={"flex justify-between"}>
                    <div className={"flex-center gap-6 text-sm font-medium text-primary"}>
                        <div>
                            <p>{doCard?.paid}pts</p>
                            <p className={"text-secondary text-xs font-light"}>Saved</p>
                        </div>
                        <div>
                            <p>{doCard?.points}pts</p>
                            <p className={"text-secondary text-xs font-light"}>Target</p>
                        </div>
                    </div>
                    {showEditButton && <button onClick={() => setShowEditModal(true)} className={"text-sm text-orange"}>Edit</button>}
                </div>
                <div className={"flex-center gap-2 my-2"}>
                    <div className={"bg-[#ECECEC] h-4 flex-1 rounded-xl"}>
                        {!isCompleted && <p style={{width: `${width}%`}} className={`bg-orange h-full rounded-xl`}/>}
                    </div>
                    {!isCompleted && <p className={"text-sm text-orange font-medium"}>{width}%</p>}
                </div>
                {(doCard?.paid <= 0 || !isAcknowledged) && <div className={"flex-center-between"}>
                    <div
                        className={`flex-center gap-2 text-sm font-medium ${isAcknowledged ? "opacity-0" : "opacity-100"}`}>
                        <button onClick={() => handleShowApproveModal(true)} className={"text-green"}>Acknowledge</button>
                        <button onClick={() => handleShowApproveModal(false)} className={"text-orange"}>Decline</button>
                    </div>
                    {doCard?.paid <= 0 && <button onClick={() => setShowDeleteDoCardModal(true)}>{DeleteIcon}</button>}
                </div>}
            </div>

            <FormModal isOpen={showApproveDoCardModal} style={"lg:w-[450px] w-[95%] rounded-3xl mb-8 lg:rounded-t-3xl max-h-full overflow-y-auto lg:mb-0"}>
                <ApproveDoCardModal isAcknowledged={acknowledgeDoCard} doCard={doCard} closeModal={() => setShowApproveDoCardModal(false)}/>
            </FormModal>

            <FormModal isOpen={showDeleteDoCardModal} style={"lg:w-[450px] w-[95%] rounded-3xl mb-8 lg:rounded-t-3xl max-h-full overflow-y-auto lg:mb-0"}>
                <DeleteDoCardModal type={"goal"} isMandatory={false} doCard={doCard} closeModal={() => setShowDeleteDoCardModal(false)}/>
            </FormModal>

            <FormModal isOpen={showEditModal} style={`lg:w-[550px] w-[95%] max-h-full overflow-y-auto mb-8 lg:mb-0 rounded-3xl`}>
                <EditDoCardModal doCard={doCard} closeModal={() => setShowEditModal(false)}/>
            </FormModal>
        </div>
    );
};

export default OngoingDoCard;