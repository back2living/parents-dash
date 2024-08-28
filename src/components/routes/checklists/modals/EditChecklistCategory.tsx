import ModalTop from "@/components/shared/ModalTop";
import {CircleCloseIcon} from "@/components/shared/Svg";
import {useState} from "react";
import IconComponent from "@/components/shared/IconComponent";
import Button from "@/components/shared/Button";
import {useUpdateChecklistCategory, useUpdateKidChecklistCategory} from "@/hooks/useChecklists";
import {IKid} from "@/hooks/useKids";

type EditChecklistCategoryType = {
    closeModal: () => void;
    name: string;
    icon: string;
    categoryId: string;
    kidData?: IKid;
}

const EditChecklistCategory = ({closeModal, name, icon, categoryId, kidData}: EditChecklistCategoryType) => {
    const [emoji, setEmoji] = useState<string>(icon);
    const [categoryName, setCategoryName] = useState<string>(name);

    const {mutate, isPending} = useUpdateChecklistCategory(closeModal)
    const {mutate: updateKidChecklistCategory, isPending: updateKidCategoryPending} = useUpdateKidChecklistCategory(closeModal)

    const handleEditCategory = () => {
        if (kidData) {
            updateKidChecklistCategory({
                categoryId,
                title: categoryName,
                icon
            })
        } else {
            mutate({
                categoryId,
                title: categoryName,
                icon
            });
        }
    }

    const isValid = !!(categoryName && emoji)

    return (
        <div className={"relative"}>
            <ModalTop title={`Edit ${name}`} Icon={CircleCloseIcon} closeModal={closeModal}/>

            <div className={"modal-content flex-column gap-6"}>
                <IconComponent emoji={emoji} setEmoji={setEmoji} />
                <div>
                    <label className={"auth-label"} htmlFor="">Category name</label>
                    <input value={categoryName} onChange={e => setCategoryName(e.target.value)} placeholder={"e.g sneakers"} className={"auth-input"} type="text"/>
                </div>

                <div className={"flex-center gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <Button type={"submit"} isValid={isValid} handleClick={handleEditCategory} isLoading={isPending || updateKidCategoryPending} name={"Save Changes"} />

                </div>
            </div>
        </div>
    );
};

export default EditChecklistCategory;