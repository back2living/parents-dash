export interface StorefrontItem {
    avatar: string;
    points: number;
    name: string;
    description: string;
    _id: string;
    updatedAt: string
}

export interface StorefrontCategory {
    _id: string;
    title: string;
    storefronts: StorefrontItem[];
}

export interface IPurchasedStorefrontItem {
    itemInfo: {
        avatar: string;
        name: string;
        points: number;
    };
    _id: string;
    status: string;
}

export interface StorefrontCategoryOnly {
    title: string;
    _id: string;
}