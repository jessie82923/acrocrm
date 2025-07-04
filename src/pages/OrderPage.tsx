import { useState, useEffect } from 'react';
import type { Order, Customer } from '../types';

const API = 'http://localhost:4000/api';

export default function OrderPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);

    useEffect(() => {
        fetch(`${API}/orders`).then(r => r.json()).then(setOrders);
        fetch(`${API}/customers`).then(r => r.json()).then(setCustomers);
    }, []);

    const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const customerId = Number(formData.get('customerId'));
        const product = formData.get('product') as string;
        const quantity = Number(formData.get('quantity'));
        if (editingOrder) {
            const res = await fetch(`${API}/orders/${editingOrder.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customerId, product, quantity })
            });
            const updated = await res.json();
            setOrders(os => os.map(o => o.id === updated.id ? updated : o));
            setEditingOrder(null);
        } else {
            const res = await fetch(`${API}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customerId, product, quantity })
            });
            const created = await res.json();
            setOrders(os => [...os, created]);
        }
        form.reset();
    };

    const handleDeleteOrder = async (id: number) => {
        await fetch(`${API}/orders/${id}`, { method: 'DELETE' });
        setOrders(os => os.filter(o => o.id !== id));
    };

    return (
        <div>
            <h2>客戶訂單</h2>
            <form onSubmit={handleOrderSubmit} className="form" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <select name="customerId" defaultValue={editingOrder?.customerId || ''} required style={{ maxWidth: 300, marginBottom: 12 }}>
                    <option value="" disabled>選擇客戶</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input name="product" placeholder="產品" defaultValue={editingOrder?.product || ''} required style={{ maxWidth: 300, marginBottom: 12 }} />
                <input name="quantity" type="number" placeholder="數量" defaultValue={editingOrder?.quantity || ''} required style={{ maxWidth: 300, marginBottom: 12 }} />
                <div style={{ display: 'flex', gap: 12 }}>
                    <button type="submit">{editingOrder ? '儲存' : '新增'}</button>
                    {editingOrder && <button type="button" onClick={() => setEditingOrder(null)}>取消</button>}
                </div>
            </form>
            <table>
                <thead><tr><th>客戶</th><th>產品</th><th>數量</th><th>操作</th></tr></thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o.id}>
                            <td>{customers.find(c => c.id === o.customerId)?.name || '未知'}</td>
                            <td>{o.product}</td>
                            <td>{o.quantity}</td>
                            <td>
                                <button onClick={() => setEditingOrder(o)}>編輯</button>
                                <button onClick={() => handleDeleteOrder(o.id)}>刪除</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
