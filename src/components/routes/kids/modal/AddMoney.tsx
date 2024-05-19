import {CloseIcon} from "@/components/shared/Svg";

const AddMoney = ({closeModal}: any) => {
    return (
        <div>
            <div className={"flex-center-between"}>
                <p className={"form-modal-title"}>Add money</p>
                <button onClick={closeModal}>{CloseIcon}</button>
            </div>

            <div className={"mt-10"}>
                <div>
                    <label className={"auth-label text-[#515151]"} htmlFor="">Amount</label>
                    <div className={"w-full relative rounded-[100px]"}>
                        <input className={`password-input`} type={"text"} placeholder={"How much"}/>
                        <p className={"w-fit absolute top-1/2 right-4 -translate-y-1/2 text-[#B1B1B1] font-medium"}>pts</p>
                    </div>
                </div>

                <div className={"flex-center gap-6 mt-10"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <button className={"primary-btn"}>Add money</button>
                </div>
            </div>
        </div>
    );
};

export default AddMoney;