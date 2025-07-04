import { useCallback, useState } from 'react';
import type { Customer } from '../types';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../api/customer';
import { useList } from '../hooks/useList';

interface CustomerPageProps {
    token: string;
}

export default function CustomerPage({ token }: CustomerPageProps) {
    const fetchList = useCallback(() => fetchCustomers(token), [token]);
    const { items: customers, addItem, updateItem, removeItem, loading, error } = useList<Customer>(fetchList);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    const handleCustomerSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        if (editingCustomer) {
            const updated = await updateCustomer(editingCustomer.id, { name, email }, token);
            updateItem(updated, (a, b) => a.id === b.id);
            setEditingCustomer(null);
        } else {
            const created = await createCustomer({ name, email }, token);
            addItem(created);
        }
        form.reset();
    }, [editingCustomer, addItem, updateItem, token]);

    const handleDeleteCustomer = useCallback(async (id: number) => {
        await deleteCustomer(id, token);
        removeItem({ id } as Customer, (a, b) => a.id === b.id);
    }, [removeItem, token]);

    return (
        <div>
            <h2>客戶資料</h2>
            {error && <div style={{ color: 'red' }}>載入失敗：{error.message}</div>}
            <form onSubmit={handleCustomerSubmit} className="form" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <input name="name" placeholder="姓名" defaultValue={editingCustomer?.name || ''} required style={{ maxWidth: 300, marginBottom: 12 }} />
                <input name="email" placeholder="Email" defaultValue={editingCustomer?.email || ''} required style={{ maxWidth: 300, marginBottom: 12 }} />
                <div style={{ display: 'flex', gap: 12 }}>
                    <button type="submit" disabled={loading}>{editingCustomer ? '儲存' : '新增'}</button>
                    {editingCustomer && <button type="button" onClick={() => setEditingCustomer(null)}>取消</button>}
                </div>
            </form>
            <table>
                <thead><tr><th>姓名</th><th>Email</th><th>操作</th></tr></thead>
                <tbody>
                    {customers.map(c => (
                        <tr key={c.id}>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>
                                <button onClick={() => setEditingCustomer(c)}>編輯</button>
                                <button onClick={() => handleDeleteCustomer(c.id)}>刪除</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
