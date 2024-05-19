import {CloseIcon, EditKidIcon, SelectedCircle, Circle} from "@/components/shared/Svg";
import {DatePickerForm} from "@/components/shared/DatePicker";
import {cn} from "@/lib/utils";
import {useState} from "react";
import PasswordInput from "@/components/shared/PasswordInput";

const AddKid = ({closeModal}: any) => {
    const [isMandatory, setIsMandatory] = useState<boolean>(false);

    return (
        <div>
            <div className={"flex-center-between"}>
                <p className={"form-modal-title"}>Add a kid</p>
                <button onClick={closeModal}>{CloseIcon}</button>
            </div>
            <div className={"mt-6"}>
                <div className={"flex-column gap-6"}>
                    <div>
                        <label className={"auth-label"} htmlFor="">Photo</label>
                        <div className={"w-20 h-20 rounded-full relative"}>
                            <img className={"w-full h-full"} src="/assets/images/kid-avatar.svg" alt=""/>
                            <span className={"absolute top-0 right-0"}>{EditKidIcon}</span>
                        </div>
                    </div>
                    <div className={"flex-center gap-4"}>
                        <div className={"flex-1"}>
                            <label className={"auth-label"} htmlFor="">First name</label>
                            <input placeholder={"John Doe"} className={"auth-input"} type="text"/>
                        </div>
                        <div className={"flex-1"}>
                            <label className={"auth-label"} htmlFor="">Last name</label>
                            <input placeholder={"John Doe"} className={"auth-input"} type="text"/>
                        </div>
                    </div>
                    <DatePickerForm/>
                    <div className={"flex-center gap-4"}>
                        <div className={"flex-1"}>
                            <label className="auth-label">Username</label>
                            <input type="text" placeholder={"Enter username"} className={"auth-input"}/>
                        </div>
                        <div className={"flex-1"}>
                            <label className={"auth-label text-[#515151]"} htmlFor="">Gender</label>
                            <div className={"flex-center gap-4"}>
                                <button onClick={() => setIsMandatory(false)} className={cn(
                                    "bg-primary flex-center justify-center h-12 px-4 rounded-xl min-w-[140px] border-2 border-[#ECECEC] transition-all",
                                    !isMandatory && "bg-[#FCE4DA] border-[#F07846]"
                                )}>
                            <span
                                className={`flex-center gap-2 ${!isMandatory ? "text-[#363636]" : "text-secondary-dark"}`}>
                                {!isMandatory ? SelectedCircle : Circle} No
                            </span>
                                </button>
                                <button onClick={() => setIsMandatory(true)} className={cn(
                                    "bg-primary flex-center justify-center h-12 px-4 rounded-xl min-w-[140px] border-2 border-[#ECECEC] transition-all",
                                    isMandatory && "bg-[#FCE4DA] border-[#F07846]"
                                )}>
                             <span
                                 className={`flex-center gap-2 ${isMandatory ? "text-[#363636]" : "text-secondary-dark"}`}>
                                {isMandatory ? SelectedCircle : Circle} Yes
                            </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <PasswordInput label={""}/>
                    <div className={"flex-center gap-6"}>
                        <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                        <button className={"primary-btn"}>Add money</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddKid;