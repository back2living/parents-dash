export interface INotification {
    _id: string
    subject: string
    read: boolean
    message: string
    isDeleted: boolean
    isPromotional: boolean
    label: string
    sender: string
    receiver: {
        _id: string;
        avatar: string;
        lastName: string;
        firstName: string;
    }
    createdAt: string
    updatedAt: string
}