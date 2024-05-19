import { useState, useEffect, useRef } from 'react';

const useOtpInput = (length: number) => {
    const [otp, setOtp] = useState(Array(length).fill(''));
    const inputRefs: any = Array.from({ length }, () => useRef());
    const handleInputChange = (index: number, value: any) => {
        const newOtp = [...otp];
        newOtp[index] = value;

        if (index < inputRefs.length - 1 && value !== '') {
            inputRefs[index + 1].current.focus();
        }

        setOtp(newOtp);
    };

    const handleBackspace = (index: number) => {
        const newOtp = [...otp];

        if (newOtp[index] === '' && index > 0) {
            inputRefs[index - 1].current.focus();
        } else {
            newOtp[index] = '';
            setOtp(newOtp);
        }
    };

    useEffect(() => {
        inputRefs[0]?.current?.focus();
    }, []);

    const isButtonActive = !!otp.at(-1);
    const otpCode = otp.join('');

    return {
        otp,
        inputRefs,
        handleInputChange,
        handleBackspace,
        isButtonActive,
        otpCode,
    };
};

export default useOtpInput;
