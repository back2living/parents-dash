import {CircleCloseIcon} from "@/components/shared/Svg";

const RemoveItem = ({closeModal}: {closeModal: () => void}) => {
    return (
        <div className={"relative"}>
            <button onClick={closeModal} className={"absolute top-0 right-0"}>{CircleCloseIcon}</button>
            <h3 className={"form-modal-title text-center"}>Remove item?</h3>
            <p className={"text-secondary text-center mt-4 "}>Are you sure you want to remove this item from the store? This action is not reversible. </p>

            <div className={"flex-center gap-6 mt-8"}>
                <button onClick={closeModal} className={"white-btn"}>No, Keep it</button>
                <button className={"primary-btn"}>Yes, Remove item</button>
            </div>
        </div>
    );
};

export default RemoveItem;