export type UserType = {
    _id: string;
    points: number
    avatar: string
    suspended: boolean
    isVerified: boolean
    isSubscribed: boolean
    hasSeenOnboarding: boolean
    passwordChangeAt: string
    lastName: string
    firstName: string
    lastLogin: string
    email: string
    username: string
    device: string
    role: string
    fcmTokens: string[];
    createdAt: string;
    updatedAt: number;
    __v: number
} | null;

export interface IUserStats {
    kids: number;
    tasks: number;
    docards: number;
}