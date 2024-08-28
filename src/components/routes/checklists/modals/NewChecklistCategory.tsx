import ModalTop from "@/components/shared/ModalTop";
import {CircleCloseIcon} from "@/components/shared/Svg";
import {useState} from "react";
import IconComponent from "@/components/shared/IconComponent";
import {useAddChecklistCategory, useAddKidChecklistCategory} from "@/hooks/useChecklists";
import Button from "@/components/shared/Button";
import {IKid} from "@/hooks/useKids";

interface IChecklistCategoryModal {
    closeModal: () => void;
    isKid?: boolean;
    kidData?: IKid;
}

const NewChecklistCategoryModal = ({closeModal, kidData}: IChecklistCategoryModal) => {
    const [emoji, setEmoji] = useState("");
    const [categoryName, setCategoryName] = useState("");

    const {isPending, mutate: addChecklistCategory} = useAddChecklistCategory(closeModal);
    const {isPending: isAddKidCategoryPending, mutate: addKidChecklistCategory} = useAddKidChecklistCategory(closeModal);

    const handleAddCategory = () => {
        if (kidData) {
            addKidChecklistCategory({
                title: categoryName,
                icon: emoji,
                kidId: kidData._id
            });
        } else {
            addChecklistCategory({
                title: categoryName,
                icon: emoji
            });
        }
    }

    const isValid = !!(categoryName && emoji);

    return (
        <div className={"relative"}>
            <ModalTop title={"New category"} Icon={CircleCloseIcon} closeModal={closeModal} />
            <div className={"modal-content"}>
                <IconComponent emoji={emoji} setEmoji={setEmoji} />
                <div className={"mt-6"}>
                    <label className={"auth-label"} htmlFor="">Category name</label>
                    <input value={categoryName} onChange={e => setCategoryName(e.target.value)} placeholder={"e.g sneakers"} className={"auth-input"} type="text"/>
                </div>
                <div className={"flex gap-6 mt-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <Button type={"submit"} isValid={isValid} handleClick={handleAddCategory} isLoading={isPending || isAddKidCategoryPending} name={"Add Category"} />
                </div>
            </div>
        </div>
    );
};

export default NewChecklistCategoryModal;