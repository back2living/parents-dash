import FormModal from "@/components/shared/FormModal";
import ApproveDoCardModal from "@/components/routes/kids/modal/ApproveDoCardModal";
import {useState} from "react";
import {IDoCard} from "@interfaces/DoCardInterfaces";

const RequestDoCard = ({doCard}: {doCard: IDoCard}) => {
    const [showApproveModal, setShowApproveModal] = useState(false);

    return (
        <>
            <div className={"bg-primary p-3 rounded-2xl"}>
                <div className={"w-full h-[150px] rounded-xl"}>
                    <img
                        className={"w-full h-full object-cover rounded-xl"}
                        src={doCard?.avatar}
                        alt={doCard?.purpose}
                    />
                </div>

                <div className={"mt-3 flex-column gap-2"}>
                    <p className={"text-primary font-medium"}>Sneakers</p>

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


                    <div className={"font-medium text-sm flex-center gap-4"}>
                        <button onClick={() => setShowApproveModal(true)} className={"text-green"}>Approve</button>
                    </div>
                </div>
            </div>

            <FormModal isOpen={showApproveModal} style={`lg:w-[450px] w-[95%] max-h-full overflow-y-auto mb-8 lg:mb-0 rounded-3xl`}>
                <ApproveDoCardModal doCard={doCard} closeModal={() => setShowApproveModal(false)}/>
            </FormModal>
        </>
    );
};

export default RequestDoCard;