import { useState, useEffect, useRef } from "react";

const useOtpInput = (length: number) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

    // Create an array of refs, one for each input field
    const inputRefs = Array.from({ length }, () => useRef<HTMLInputElement | null>(null));

    // Handle input change
    const handleInputChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;

        // Move to the next input field if the current input has a value
        if (index < inputRefs.length - 1 && value !== "") {
            inputRefs[index + 1].current?.focus();
        }

        setOtp(newOtp);
    };

    // Handle backspace
    const handleBackspace = (index: number) => {
        const newOtp = [...otp];

        if (newOtp[index] === "" && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else {
            newOtp[index] = "";
            setOtp(newOtp);
        }
    };

    // Focus on the first input field on mount
    useEffect(() => {
        inputRefs[0]?.current?.focus();
    }, []);

    // Check if the button should be active (all inputs are filled)
    const isButtonActive = otp.every((val) => val !== "");
    // Join the OTP array into a single string
    const otpCode = otp.join("");

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


// import { useState, useEffect, useRef } from "react";
//
// const useOtpInput = (length: number) => {
//     const [otp, setOtp] = useState(Array(length).fill(""));
//     const inputRefs = Array.from({ length }, () => useRef());
//     // const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));
//
//     const handleInputChange = (index: number, value: string) => {
//         const newOtp = [...otp];
//         newOtp[index] = value;
//
//         if (index < inputRefs.length - 1 && value !== "") {
//             inputRefs[index + 1].current.focus();
//         }
//
//         setOtp(newOtp);
//     };
//
//     const handleBackspace = (index: number) => {
//         const newOtp = [...otp];
//
//         if (newOtp[index] === "" && index > 0) {
//             inputRefs[index - 1].current.focus();
//         } else {
//             newOtp[index] = "";
//             setOtp(newOtp);
//         }
//     };
//
//     useEffect(() => {
//         inputRefs[0]?.current?.focus();
//     }, []);
//
//     const isButtonActive = !!otp.at(-1);
//     const otpCode = otp.join("");
//
//     return {
//         otp,
//         inputRefs,
//         handleInputChange,
//         handleBackspace,
//         isButtonActive,
//         otpCode,
//     };
// };
//
// export default useOtpInput;
