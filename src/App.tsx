import { useState, useEffect } from 'react';
import './App.css';

// 客戶資料型別
interface Customer {
  id: number;
  name: string;
  email: string;
}
// 訂單型別
interface Order {
  id: number;
  customerId: number;
  product: string;
  quantity: number;
}
// 授權資料型別
interface License {
  id: number;
  customerId: number;
  licenseKey: string;
  validUntil: string;
}

type Tab = 'customers' | 'orders' | 'licenses';

const API = 'http://localhost:4000/api';

function App() {
  const [tab, setTab] = useState<Tab>('customers');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [editingLicense, setEditingLicense] = useState<License | null>(null);

  // 取得所有資料
  useEffect(() => {
    fetch(`${API}/customers`).then(r => r.json()).then(setCustomers);
    fetch(`${API}/orders`).then(r => r.json()).then(setOrders);
    fetch(`${API}/licenses`).then(r => r.json()).then(setLicenses);
  }, []);

  // 客戶表單提交
  const handleCustomerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    if (editingCustomer) {
      // 修改
      const res = await fetch(`${API}/customers/${editingCustomer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      const updated = await res.json();
      setCustomers(cs => cs.map(c => c.id === updated.id ? updated : c));
      setEditingCustomer(null);
    } else {
      // 新增
      const res = await fetch(`${API}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      const created = await res.json();
      setCustomers(cs => [...cs, created]);
    }
    form.reset();
  };

  const handleDeleteCustomer = async (id: number) => {
    await fetch(`${API}/customers/${id}`, { method: 'DELETE' });
    setCustomers(cs => cs.filter(c => c.id !== id));
  };

  // 訂單表單提交
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

  // 授權表單提交
  const handleLicenseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const customerId = Number(formData.get('customerId'));
    const licenseKey = formData.get('licenseKey') as string;
    const validUntil = formData.get('validUntil') as string;
    if (editingLicense) {
      const res = await fetch(`${API}/licenses/${editingLicense.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, licenseKey, validUntil })
      });
      const updated = await res.json();
      setLicenses(ls => ls.map(l => l.id === updated.id ? updated : l));
      setEditingLicense(null);
    } else {
      const res = await fetch(`${API}/licenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, licenseKey, validUntil })
      });
      const created = await res.json();
      setLicenses(ls => [...ls, created]);
    }
    form.reset();
  };

  const handleDeleteLicense = async (id: number) => {
    await fetch(`${API}/licenses/${id}`, { method: 'DELETE' });
    setLicenses(ls => ls.filter(l => l.id !== id));
  };

  return (
    <div className="container">
      <h1>CFM 客戶/訂單/授權管理</h1>
      <div className="tabs">
        <button onClick={() => setTab('customers')} className={tab === 'customers' ? 'active' : ''}>客戶資料</button>
        <button onClick={() => setTab('orders')} className={tab === 'orders' ? 'active' : ''}>客戶訂單</button>
        <button onClick={() => setTab('licenses')} className={tab === 'licenses' ? 'active' : ''}>授權資料</button>
      </div>
      {tab === 'customers' && (
        <div>
          <h2>客戶資料</h2>
          <form onSubmit={handleCustomerSubmit} className="form">
            <input name="name" placeholder="姓名" defaultValue={editingCustomer?.name || ''} required />
            <input name="email" placeholder="Email" type="email" defaultValue={editingCustomer?.email || ''} required />
            <button type="submit">{editingCustomer ? '儲存' : '新增'}</button>
            {editingCustomer && <button type="button" onClick={() => setEditingCustomer(null)}>取消</button>}
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
      )}
      {tab === 'orders' && (
        <div>
          <h2>客戶訂單</h2>
          <form onSubmit={handleOrderSubmit} className="form">
            <select name="customerId" defaultValue={editingOrder?.customerId || ''} required>
              <option value="" disabled>選擇客戶</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input name="product" placeholder="產品名稱" defaultValue={editingOrder?.product || ''} required />
            <input name="quantity" type="number" min="1" defaultValue={editingOrder?.quantity || 1} required />
            <button type="submit">{editingOrder ? '儲存' : '新增'}</button>
            {editingOrder && <button type="button" onClick={() => setEditingOrder(null)}>取消</button>}
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
      )}
      {tab === 'licenses' && (
        <div>
          <h2>授權資料</h2>
          <form onSubmit={handleLicenseSubmit} className="form">
            <select name="customerId" defaultValue={editingLicense?.customerId || ''} required>
              <option value="" disabled>選擇客戶</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input name="licenseKey" placeholder="授權碼" defaultValue={editingLicense?.licenseKey || ''} required />
            <input name="validUntil" type="date" defaultValue={editingLicense?.validUntil || ''} required />
            <button type="submit">{editingLicense ? '儲存' : '新增'}</button>
            {editingLicense && <button type="button" onClick={() => setEditingLicense(null)}>取消</button>}
          </form>
          <table>
            <thead><tr><th>客戶</th><th>授權碼</th><th>有效期限</th><th>操作</th></tr></thead>
            <tbody>
              {licenses.map(l => (
                <tr key={l.id}>
                  <td>{customers.find(c => c.id === l.customerId)?.name || '未知'}</td>
                  <td>{l.licenseKey}</td>
                  <td>{l.validUntil}</td>
                  <td>
                    <button onClick={() => setEditingLicense(l)}>編輯</button>
                    <button onClick={() => handleDeleteLicense(l.id)}>刪除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
