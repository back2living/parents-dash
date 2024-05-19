import {CircleCloseIcon} from "@/components/shared/Svg";
import ModalTop from "@/components/shared/ModalTop";

const NewCategory = ({closeModal}: {closeModal: () => void}) => {
    return (
        <div className={"relative"}>
            <ModalTop title={"Add new category"} Icon={CircleCloseIcon} closeModal={closeModal} />
            
            <div className={"mt-10"}>
                <label className={"auth-label"} htmlFor="">Category name</label>
                <input placeholder={"e.g sneakers"} className={"auth-input"} type="text"/>
            </div>

            <div className={"flex-center gap-6 mt-6"}>
                <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                <button className={"primary-btn"}>Add category</button>
            </div>
        </div>
    );
};

export default NewCategory;