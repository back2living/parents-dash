import {CircleCloseIcon} from "@/components/shared/Svg";
import {useRemoveChecklistCategory} from "@/hooks/useChecklists";
import Button from "@/components/shared/Button";
import {IChecklistCategory} from "@/interfaces/ChecklistInterface";

interface IDeleteCategory {
    closeModal: () => void,
    kidId?: string | undefined;
    category: IChecklistCategory;
}
const DeleteChecklist = ({closeModal, kidId, category}: IDeleteCategory) => {
    const {mutate, isPending} = useRemoveChecklistCategory(closeModal, kidId);
    const handleDeleteCategory = () => mutate({id: category._id});

    return (
        <div className={"relative modal-content pt-6"}>
            <button onClick={closeModal} className={"absolute top-4 right-4"}>{CircleCloseIcon}</button>
            <h3 className={"form-modal-title text-md text-center"}>Delete "{category.title || "category"}"?</h3>
            {!category.isGlobal && <p className={"text-secondary text-center mt-4"}>Are you sure you want to permanently delete this
                category?</p>}
            {category.isGlobal && <p className={"text-secondary text-center mt-4"}>This is a global checklist category. Are you sure you want to permanently delete this category?</p>}

            <div>

                <div className={"flex gap-6 mt-8"}>
                    <button onClick={closeModal} className={"white-btn"}>No, Keep it</button>
                    <Button type={"submit"} isValid={true} handleClick={handleDeleteCategory}  isLoading={isPending} name={"Delete Category"} />
                </div>
            </div>
        </div>
    );
};

export default DeleteChecklist;