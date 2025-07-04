import type { License } from '../types';

const API = 'http://localhost:4000/api/licenses';

export async function fetchLicenses(): Promise<License[]> {
    const res = await fetch(API);
    return res.json();
}

export async function createLicense(data: Omit<License, 'id'>): Promise<License> {
    const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateLicense(id: number, data: Omit<License, 'id'>): Promise<License> {
    const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteLicense(id: number): Promise<void> {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
}
