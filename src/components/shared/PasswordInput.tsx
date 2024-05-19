import {ClosedPasswordIcon} from "@/components/shared/Svg";
import {useState} from "react";

const PasswordInput = ({label="Enter Password"}: {label: string}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div>
            <label className={"auth-label"} htmlFor="">{label}</label>
            <div className={"w-full relative rounded-[100px]"}>
                <input className={`password-input`} type={isOpen ? "text" : "password"} placeholder={"••••••••••"}/>
                <button onClick={() => setIsOpen(!isOpen)}
                        className={"w-fit absolute top-1/2 right-4 -translate-y-1/2"}>
                    {isOpen ? ClosedPasswordIcon : ClosedPasswordIcon}
                </button>
            </div>


            <span className={"text-xs font-medium text-[#667085] mt-2 inline-block"}>Must be at-least 8 characters</span>
        </div>
    );
};

export default PasswordInput;