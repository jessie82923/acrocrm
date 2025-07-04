import type { Order } from '../types';

const API = 'http://localhost:4000/api/orders';

export async function fetchOrders(): Promise<Order[]> {
    const res = await fetch(API);
    return res.json();
}

export async function createOrder(data: Omit<Order, 'id'>): Promise<Order> {
    const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateOrder(id: number, data: Omit<Order, 'id'>): Promise<Order> {
    const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteOrder(id: number): Promise<void> {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
}
