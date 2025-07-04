import type { Customer } from '../types';

const API = 'http://localhost:4000/api/customers';

export async function fetchCustomers(token: string): Promise<Customer[]> {
    const res = await fetch(API, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
}

export async function createCustomer(data: Omit<Customer, 'id'>, token: string): Promise<Customer> {
    const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateCustomer(id: number, data: Omit<Customer, 'id'>, token: string): Promise<Customer> {
    const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteCustomer(id: number, token: string): Promise<void> {
    await fetch(`${API}/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
}
