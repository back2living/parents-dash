export interface IDoCard {
    _id: string;
    avatar: string;
    isMandatory: boolean;
    isAcknowledged?: boolean;
    paid: number;
    status: string;
    points: number;
    purpose: string;
    kid: {
        _id: string;
        avatar: string;
        lastName: string;
        firstName: string;
    };
    guardian: string;
    type: string;
    storefront?: string;
}