import {CircleCloseIcon} from "@/components/shared/Svg";
import ModalTop from "@/components/shared/ModalTop";
import {useState} from "react";
import Button from "@/components/shared/Button";
import {useAddStorefrontCategory} from "@/hooks/useStorefront";

const NewCategory = ({closeModal}: {closeModal: () => void}) => {
    const [categoryName, setCategoryName] = useState("");

    const {mutate, isPending} = useAddStorefrontCategory(closeModal);

    const handleAddCategory = () => {
        mutate({
            title: categoryName
        });
    };

    return (
        <div className={"relative"}>
            <ModalTop title={"Add new category"} Icon={CircleCloseIcon} closeModal={closeModal} />

            <div className={"modal-content"}>
                <div className={""}>
                    <label className={"auth-label"} htmlFor="">Category name</label>
                    <input value={categoryName} onChange={e => setCategoryName(e.target.value)} placeholder={"e.g sneakers"} className={"auth-input"} type="text"/>
                </div>

                <div className={"flex gap-6 mt-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <Button isValid={!!categoryName} handleClick={handleAddCategory} isLoading={isPending} type={"button"} name={"Add category"} className={"primary-btn"}/>
                </div>
            </div>
        </div>
    );
};

export default NewCategory;