import {DeleteIcon} from "@/components/shared/Svg";
import {cn} from "@/lib/utils";
import {IDoCard} from "@interfaces/DoCardInterfaces";
import DeleteDoCardModal from "@components/routes/kids/modal/DeleteDoCardModal";
import FormModal from "@components/shared/FormModal";
import {useState} from "react";

interface IPenaltyCard {
    isCompleted?: boolean;
    isMandatory?: boolean;
    doCard: IDoCard;
}
const PenaltyCard = ({isCompleted, doCard, isMandatory}: IPenaltyCard) => {
    const width = (doCard?.paid / doCard?.points) * 100;
    const [showDeleteDoCardModal, setShowDeleteDoCardModal] = useState(false);

    return (
        <div className={cn(
            "bg-primary p-3 rounded-2xl border border-purple",
            isMandatory && "border border-yellow",
            isCompleted && "border border-green"
            )}>
            <div className={"flex-column gap-2"}>
                <div className={"font-medium flex-center-between"}>
                    <p className={"text-primary capitalize"}>{doCard.purpose}</p>
                    {doCard?.paid <= 0 && <button onClick={() => setShowDeleteDoCardModal(true)}>{DeleteIcon}</button>}
                </div>

                <div className={"flex-center gap-6 text-sm font-medium text-primary"}>
                    <div>
                        <p className={"text-secondary text-xs font-light"}>Points</p>
                        <p>{doCard.points}pts</p>
                    </div>
                    <div>
                        <p className={"text-secondary text-xs font-light"}>Paid</p>
                        <p>{isCompleted ? "Completed" : `${doCard?.paid}pts`}</p>
                    </div>
                </div>


                <div className={"flex-center gap-2 my-2"}>
                    <div className={"bg-[#ECECEC] h-4 flex-1 rounded-xl"}>
                        {isCompleted && <p className={"bg-green h-full w-full rounded-xl"}/>}
                        {isMandatory && <p style={{width: `${width}%`}} className={`bg-yellow h-full rounded-xl`}/>}
                        {(!isCompleted && !isMandatory) && <p style={{width: `${width}%`}} className={`bg-purple h-full rounded-xl`}/>}
                    </div>

                    {isCompleted && <p className={"text-sm text-green font-medium"}>100%</p>}
                    {isMandatory && <p className={"text-sm text-yellow font-medium"}>{width}%</p>}
                    {(!isCompleted && !isMandatory) && <p className={"text-sm text-purple font-medium"}>{width}%</p>}
                </div>
            </div>

            <FormModal isOpen={showDeleteDoCardModal} style={"lg:w-[450px] w-[95%] rounded-3xl mb-8 lg:rounded-t-3xl max-h-full overflow-y-auto lg:mb-0"}>
                <DeleteDoCardModal type={"penalty"} isMandatory={!!isMandatory} doCard={doCard} closeModal={() => setShowDeleteDoCardModal(false)}/>
            </FormModal>
        </div>
    );
};

export default PenaltyCard;