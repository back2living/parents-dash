import {IChecklist} from "@/interfaces/ChecklistInterface";

export interface IChecklistTask {
    checklistInfo: IChecklist;
    _id: string;
    status: string;
}
export interface IChecklistTaskKid {
    lastName: string
    role: string
    gender: string
    isVerified: boolean
    passwordResetToken: string
    points: number
    fcmTokens: string[]
    hasSeenOnboarding: boolean
    createdAt: string
    password: string
    isSubscribed: boolean
    isDeleted: boolean
    __v: number
    guardian: string
    email: string
    tasks: IChecklistTask[]
    updatedAt: string
    passwordChangeAt: string
    avatar: string
    suspended: boolean
    firstName: string
    dob: {
        month: number;
        year: number;
        day: number
    }
    _id: string
    device: string
    username: string
}
export interface IChecklistTaskCategory {
    title: string
    icon: string
    tasks: IChecklistTask[]
}