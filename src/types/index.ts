export interface Customer {
    id: number;
    name: string;
    email: string;
}

export interface Order {
    id: number;
    customerId: number;
    product: string;
    quantity: number;
}

export interface License {
    id: number;
    customerId: number;
    licenseKey: string;
    validUntil: string;
}

export type TabKey = 'customers' | 'orders' | 'licenses';
