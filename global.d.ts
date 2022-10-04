type UserType = {
    id?: string;
    email?: string;
    name?: string;
    password?: string;
    admin?: number;
}

type PlanType = {
    id: number;
    name: string;
    category: number;
    price: number;
    iconUrl: string;
    dataAmount: string;
    smsAmount: string;
    callAmount: string;
    dataIcon: string;
    smsIcon: string;
    callsIcon: string;
    subCategory: number;
    categoryLabel?: string;
    categoryName?: string;
    categoryId?: number;
}