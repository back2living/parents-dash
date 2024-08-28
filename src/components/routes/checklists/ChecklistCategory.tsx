import {
    CategoryDeleteIcon,
    CategoryEditIcon, CategoryRemoveIcon,
    VerticalIcon
} from "@/components/shared/Svg";
import {useState} from "react";
import FormModal from "@/components/shared/FormModal";
import DeleteChecklistCategory from "@/components/routes/checklists/modals/DeleteChecklistCategory";
import RemoveAllChecklist from "@/components/routes/checklists/modals/RemoveAllChecklists";
import EditChecklistCategory from "@/components/routes/checklists/modals/EditChecklistCategory";
import {IKid} from "@/hooks/useKids";
import {IChecklistCategory} from "@/interfaces/ChecklistInterface";

interface ICategory {
    isActive: boolean;
    handleChangeCategory: () => void;
    kidData?: IKid;
    category: IChecklistCategory;
}
export const style = {
    active: "flex-center-between p-3 bg-primary rounded-xl border border-[#E8E8E8] group cursor-pointer",
    inactive: "flex-center-between p-3 rounded-xl group cursor-pointer"
}

const ChecklistCategory = ({isActive, handleChangeCategory, kidData, category}: ICategory) => {
    const [isEditCategoryModal, setIsEditCategoryModal] = useState<boolean>(false);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState<boolean>(false);
    const [showRemoveChecklistModal, setShowRemoveChecklistModal] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleRemoveChecklistModal = () => {
        setShowRemoveChecklistModal(!showRemoveChecklistModal);
        setShowDropdown(false);
    }
    const handleDeleteCategoryModal = () => {
        setShowDeleteCategoryModal(!showDeleteCategoryModal);
        setShowDropdown(false);
    }

    return (
        <div onClick={handleChangeCategory} className={isActive ? style.active : style.inactive}>
            <div className={"text-[#363636] flex-center text-sm gap-1.5"}>
                <span>{category.icon}</span>
                <span>{category.title}</span>
            </div>

            <div className={"flex-center gap-2 relative"}>
                <button onClick={(e) => {e.stopPropagation();setShowDropdown(!showDropdown);}} className={"text-sm text-secondary lg:opacity-0 group-hover:opacity-100"}>{VerticalIcon}</button>
                <p className={"text-sm text-secondary"}>{category.checklists.length}</p>

                <div className={`${showDropdown ? "opacity-100" : "opacity-0 pointer-events-none"} text-primary font-medium z-50 shadow-md border text-xs p-0.5 transition-all duration-300 bg-white rounded-2xl absolute lg:top-8 right-0 top-10 lg:right-3 w-[200px]`}>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        setIsEditCategoryModal(!isEditCategoryModal);
                        setShowDropdown(false);
                    }} className={"p-3 flex-center gap-2 w-full"}>{CategoryEditIcon} Edit</button>
                    <button onClick={handleRemoveChecklistModal} className={"p-3 flex-center gap-2"}>{CategoryRemoveIcon} Remove all checklists</button>
                    <button onClick={handleDeleteCategoryModal} className={"p-3 flex-center gap-2"}>{CategoryDeleteIcon} Delete</button>
                </div>
            </div>

            <FormModal isOpen={isEditCategoryModal} style={`lg:w-[550px] max-h-full overflow-y-auto lg:mb-0 rounded-t-3xl`}>
                <EditChecklistCategory kidData={kidData} categoryId={category._id} name={category.title} icon={category.icon} closeModal={() => setIsEditCategoryModal(false)}/>
            </FormModal>
            <FormModal isOpen={showDeleteCategoryModal} style={`lg:w-[450px] w-[90%] max-h-full overflow-y-auto mb-8 lg:mb-0 rounded-3xl`}>
                <DeleteChecklistCategory category={category} kidId={kidData?._id} closeModal={() => setShowDeleteCategoryModal(false)}/>
            </FormModal>
            <FormModal isOpen={showRemoveChecklistModal} style={`lg:w-[450px] w-[90%] max-h-full overflow-y-auto mb-8 lg:mb-0 rounded-3xl`}>
                <RemoveAllChecklist category={category} closeModal={() => setShowRemoveChecklistModal(false)}/>
            </FormModal>
        </div>
    );
};

export default ChecklistCategory;