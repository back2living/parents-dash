import {z} from "zod";

export const signInSchema = z.object({
    email: z.string().email("Invalid Email Address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .regex(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
});
export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid Email Address"),
});
export const signupSchema = z.object({
    firstName: z.string().min(1, "Please enter your first name").regex(/^[a-zA-Z\s]+$/, "Full Name cannot contain special characters or numbers. ").max(150),
    lastName: z.string().min(1, "Please enter your last name").regex(/^[a-zA-Z\s]+$/, "Full Name cannot contain special characters or numbers. ").max(150),
    email: z.string().email("Invalid Email Address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .regex(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
});
export const changePasswordSchema = z.object({
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .regex(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});
export const changeUserPasswordSchema = z.object({
    oldPassword: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .regex(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .regex(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});
export const addKidSchema = z.object({
    username: z.string().min(4, "Username must be at least four letters").max(150),
    firstName: z.string().min(1, "Please enter your first name").regex(/^[a-zA-Z\s]+$/, "Full Name cannot contain special characters or numbers. ").max(150),
    lastName: z.string().min(1, "Please enter your last name").regex(/^[a-zA-Z\s]+$/, "Full Name cannot contain special characters or numbers. ").max(150),
    points: z
        .number({
            required_error: "required field",
            invalid_type_error: "Points must be at least 1",
        })
        .min(1)
        .max(10000000000),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .regex(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
});

export const formatDate = (date: Date) => {
    const day = date?.getDate().toString().padStart(2, "0");
    const month = (date?.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date?.getFullYear();

    return `${day}-${month}-${year}`;
}