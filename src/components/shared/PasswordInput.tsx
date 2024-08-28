import {ClosedPasswordIcon} from "@/components/shared/Svg";
import {useState} from "react";
import {FieldErrors, UseFormRegister, Path, FieldValues} from "react-hook-form";

interface IPasswordInput<FormValues extends FieldValues> {
    label?: string;
    errors: FieldErrors<FormValues>;
    name: Path<FormValues>;
    register: UseFormRegister<FormValues>;
    type?: string;
}

const PasswordInput = <FormValues extends Record<string, unknown>>({label = "Enter Password", errors, name, register, type,}: IPasswordInput<FormValues>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            <label className={"auth-label"} htmlFor="">{label}</label>
            <div className={"w-full relative rounded-[100px]"}>
                <input {...register(name)} autoComplete={"off"} className={`password-input`}
                       type={isOpen ? "text" : "password"} placeholder={"••••••••••"}/>
                <button type={"button"} onClick={() => setIsOpen(!isOpen)}
                        className={"w-fit absolute top-1/2 right-4 -translate-y-1/2"}>
                    {isOpen ? ClosedPasswordIcon : ClosedPasswordIcon}
                </button>
            </div>

            {!type && errors?.password && <span className={"auth-form-error mt-2"}>{errors?.password?.message as string}</span>}
            {type === "confirmPassword" && errors?.confirmPassword &&
                <span className={"auth-form-error mt-2"}>{errors?.confirmPassword?.message as string}</span>}
        </div>
    );
};

export default PasswordInput;