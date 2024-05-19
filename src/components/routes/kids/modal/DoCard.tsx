import {CloseIcon, SelectedCircle, Circle} from "@/components/shared/Svg";
import {useState} from "react";
import {cn} from "@/lib/utils";

const DoCard = ({closeModal}: {closeModal: () => void}) => {
    const [isMandatory, setIsMandatory] = useState<boolean>(false);

    return (
        <div>
            <div className={"flex-center-between"}>
                <p className={"form-modal-title"}>Assign Do-Card</p>
                <button onClick={closeModal}>{CloseIcon}</button>
            </div>

            <div className={"mt-10 flex-column gap-6"}>
                <div>
                    <label className={"auth-label text-[#515151]"} htmlFor="">Purpose</label>
                    <div className={"w-full relative rounded-[100px]"}>
                        <input className={`auth-input`} type={"text"} placeholder={"Enter the purpose here"}/>
                    </div>
                </div>

                <div>
                    <label className={"auth-label text-[#515151]"} htmlFor="">Penalty</label>
                    <div className={"w-full relative rounded-[100px]"}>
                        <input className={`password-input`} type={"text"} placeholder={"0.00"}/>
                        <p className={"w-fit absolute top-1/2 right-4 -translate-y-1/2 text-[#B1B1B1] font-medium"}>pts</p>
                    </div>
                </div>

                <div>
                    <label className={"auth-label text-[#515151]"} htmlFor="">Mandatory</label>
                    <div className={"flex-center gap-4"}>
                        <button onClick={() => setIsMandatory(false)} className={cn(
                            "bg-primary flex-center justify-center py-3.5 px-4 rounded-xl min-w-[140px] border-2 border-[#ECECEC] transition-all",
                            !isMandatory && "bg-[#FCE4DA] border-[#F07846]"
                        )}>
                            <span className={`flex-center gap-2 ${!isMandatory ? "text-[#363636]" : "text-secondary-dark"}`}>
                                {!isMandatory ? SelectedCircle : Circle} No
                            </span>
                        </button>
                        <button onClick={() => setIsMandatory(true)} className={cn(
                            "bg-primary flex-center justify-center py-3.5 px-4 rounded-xl min-w-[140px] border-2 border-[#ECECEC] transition-all",
                            isMandatory && "bg-[#FCE4DA] border-[#F07846]"
                        )}>
                             <span
                                 className={`flex-center gap-2 ${isMandatory ? "text-[#363636]" : "text-secondary-dark"}`}>
                                {isMandatory ? SelectedCircle : Circle} Yes
                            </span>
                        </button>
                    </div>
                    <p className={"text-sm text-secondary mt-3"}>Non-mandatory do-cards are paid in 10-folds</p>
                </div>

                <div className={"flex-center gap-6 mt-10"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <button className={"primary-btn"}>Add money</button>
                </div>
            </div>
        </div>
    );
};

export default DoCard;