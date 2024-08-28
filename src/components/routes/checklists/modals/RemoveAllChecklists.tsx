import {CircleCloseIcon} from "@/components/shared/Svg";
import {useRemoveAllChecklistFromCategory} from "@/hooks/useChecklists";
import Button from "@/components/shared/Button";
import {IChecklistCategory} from "@/interfaces/ChecklistInterface";

interface IRemoveChecklists {
    closeModal: () => void,
    kidId?: string | undefined;
    category: IChecklistCategory;
}
const RemoveAllChecklist = ({closeModal, kidId, category}: IRemoveChecklists) => {
    const {mutate, isPending} = useRemoveAllChecklistFromCategory(closeModal, kidId);
    const handleRemoveAllChecklists = () => mutate({id: category._id});

    return (
        <div className={"relative modal-content pt-6"}>
            <button onClick={closeModal} className={"absolute top-4 right-4"}>{CircleCloseIcon}</button>
            <h3 className={"form-modal-title text-center"}>Remove all checklists?</h3>
            <p className={"text-secondary text-center mt-4"}>
                Are you sure you want to remove  all checklists from this category?</p>
            <div>

                <div className={"flex gap-6 mt-8"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <Button type={"submit"} isValid={true} handleClick={handleRemoveAllChecklists}  isLoading={isPending} name={"Remove all?"} />
                </div>
            </div>
        </div>
    );
};

export default RemoveAllChecklist;