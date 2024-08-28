import useOtpInput from "@/hooks/useOtpInput";
import useCountdown from "@/hooks/useCountdown";
import {useEffect, useState} from "react";
import instance, {baseUrl} from "@/api/instance";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import Button from "@/components/shared/Button";
import axios from "axios";

interface IProps {
    token: string;
}
const styles = {
    active: "opacity-100 cursor-pointer pointer-events-auto text-orange ml-1",
    inactive: "opacity-50 pointer-events-none text-orange ml-1",
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CustomError extends Error {
    response: {
        data: {
            message: string;
        };
    };
}


interface ValidationError {
    message: string;
    errors: Record<string, string[]>
}

const VerifyEmail = ({token}: IProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {otp, inputRefs, handleInputChange, handleBackspace, isButtonActive, otpCode} = useOtpInput(4);
    const {start, secondsLeft} = useCountdown();

    useEffect(() => {
        start(59);
    }, []);

    const formattedTime = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;
    const userEmail =  localStorage.getItem("userRegistrationEmail");

    const verifyUserEmail = async () => {
        setIsLoading(true)
        try {
            const {data} = await instance.put(`${baseUrl}/auth/verification`, {token, code: otpCode});
            toast.success(data?.message);
            await router.push("/signin");
        } catch (err: CustomError | unknown) {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(err)) {
                toast.error(err?.response?.data?.message || "")
            } else {
                toast.error("An error occurred");
                console.error(err);
            }
        } finally {
            setIsLoading(false);
        }
    }
    const resendEmailVerificationLink = async () => {
        setIsLoading(true);
        try {
            const {data} = await instance.post(`${baseUrl}/auth/verification`, {email: userEmail});
            toast.success(data?.message);
        } catch (err: CustomError | unknown) {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(err)) {
                toast.error(err?.response?.data?.message || "")
            } else {
                toast.error("An error occurred");
                console.error(err);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleResendVerification = async () => {
        start(59);
        await resendEmailVerificationLink();
    }

    return (
        <div>
            <div className={"mt-32 flex-column gap-12"}>
                <div>
                    <p className={"auth-title"}>Verify your email</p>
                    <p className={"auth-text mt-2"}>Enter the OTP code sent to <span className={"text-primary"}>{userEmail}</span>.</p>
                </div>

                <div>
                    <div className={"flex-center justify-center gap-4"}>
                        {otp.map((digit, index) => (
                            <input
                                className={"bg-primary text-center grid place-items-center text-primary w-16 h-14 rounded-lg outline-0"}
                                key={index}
                                ref={inputRefs[index]}
                                type="password"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Backspace") {
                                        handleBackspace(index);
                                    }
                                }}
                            />
                        ))}
                    </div>

                    <p className={"mt-4 text-center text-secondary dark:text-secondary-dark"}>Didn’t get the code?
                        <button onClick={handleResendVerification} className={`${secondsLeft === 0 ? styles.active : styles.inactive}`}>Try again.</button> {secondsLeft > 0 && <span>0:{formattedTime}</span>}
                    </p>
                </div>

                <Button handleClick={verifyUserEmail} isLoading={isLoading} isValid={isButtonActive} name={"Submit"} />
                {/*<button onClick={verifyUserEmail} disabled={!isValid || isLoading} className={"primary-btn"}>{!isLoading ? "Submit" : <span className={"animate-spin"}>{SpinnerIcon}</span>}</button>*/}

            </div>
        </div>
    );
};

export default VerifyEmail;