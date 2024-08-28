export interface IChecklist {
    avatar: string;
    icon: string;
    title: string;
    penalty: number;
    reward: number;
    intervals: number;
    _id: string;
}

export interface IChecklistCategory {
    _id: string
    isGlobal: boolean
    isDeleted: boolean
    icon: string
    title: string
    kid: null
    guardian: string
    createdAt: string
    updatedAt: string
    __v: number
    checklists: IChecklist[]
}

export type FetchChecklistCategory = {
    data: IChecklistCategory[]
}