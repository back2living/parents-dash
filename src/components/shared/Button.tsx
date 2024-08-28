import {SpinnerIcon} from "@/components/shared/Svg";

interface IButton {
    isValid?: boolean;
    isLoading: boolean;
    name: string;
    type?: "button" | "submit";
    handleClick?:() => void;
    className?: string;
}

const Button = ({isLoading, isValid, name, handleClick, type="button", className}: IButton) => {
    return (
        <button type={type} onClick={handleClick} disabled={!isValid || isLoading} className={`primary-btn min-h-[64px] ${className}`}>{!isLoading ? name :
            <span className={"animate-spin"}>{SpinnerIcon}</span>}
        </button>
    );
};

export default Button;