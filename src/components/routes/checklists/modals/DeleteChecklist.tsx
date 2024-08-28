import {CircleCloseIcon} from "@/components/shared/Svg";
import {useRemoveChecklistById} from "@/hooks/useChecklists";
import Button from "@/components/shared/Button";
import {IChecklist} from "@interfaces/ChecklistInterface";

type DeleteChecklistType = {
    closeModal: () => void;
    selectedChecklist: null | IChecklist;
    kidId?: string | undefined;
}

const DeleteChecklist = ({closeModal, selectedChecklist, kidId}: DeleteChecklistType) => {
    const {mutate, isPending} = useRemoveChecklistById(closeModal, kidId);

    const handleDeleteChecklist = () => {
        if (selectedChecklist?._id) {
            mutate({
                id: selectedChecklist?._id
            });
        }
    }

    return (
        <div className={"relative modal-content pt-6"}>
            <button onClick={closeModal} className={"absolute top-4 right-4"}>{CircleCloseIcon}</button>
            <h3 className={"form-modal-title text-center"}>Delete checklist?</h3>
            <p className={"text-secondary text-center mt-4"}>Are you sure you want to permanently remove this checklist from it’s category? This action is not reversible.</p>

            <div>
                <div className={"flex-center gap-6 mt-8"}>
                    <button onClick={closeModal} className={"white-btn"}>No, Keep it</button>
                    <Button type={"submit"} isValid={true} handleClick={handleDeleteChecklist} isLoading={isPending} name={"Yes, delete checklist"} />
                </div>
            </div>
        </div>
    );
};

export default DeleteChecklist;