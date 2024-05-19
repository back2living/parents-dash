import useOtpInput from "@/hooks/useOtpInput";

const VerifyEmail = () => {
    const {otp, inputRefs, handleInputChange, handleBackspace, isButtonActive, otpCode: pinCode} = useOtpInput(4);

    return (
        <div>
            <div className={"mt-32 flex-column gap-12"}>
                <div>
                    <p className={"auth-title"}>Verify your email</p>
                    <p className={"auth-text mt-2"}>Enter the OTP code sent to <span className={"text-primary"}>sikal@gmail.com</span>.</p>
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
                                    if (e.key === 'Backspace') {
                                        handleBackspace(index);
                                    }
                                }}
                            />
                        ))}
                    </div>

                    <p className={"text-secondary mt-4 text-center"}>Didn’t get the code? <button className={"text-orange"}>Try again</button></p>
                </div>

                <button className={"primary-btn"}>Submit</button>

            </div>
        </div>
    );
};

export default VerifyEmail;