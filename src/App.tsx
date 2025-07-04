import { useState, useEffect } from 'react';
import './App.css';
import Tabs from './components/Tabs';
import TABS from './config/tabs';
import CustomerPage from './pages/CustomerPage';
import OrderPage from './pages/OrderPage';
import LicensePage from './pages/LicensePage';
import LoginPage from './pages/LoginPage';
import type { Customer, License } from './types';

const API = 'http://localhost:4000/api';

function App() {
  const [tab, setTab] = useState(TABS[0].key);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/customers`).then(r => r.json()).then(setCustomers);
    fetch(`${API}/licenses`).then(r => r.json()).then(setLicenses);
  }, []);

  // 登入後才顯示主頁
  if (!token) {
    return <LoginPage onLogin={setToken} />;
  }

  return (
    <div className="container">
      <h1>CFM 管理系統</h1>
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      {tab === 'customers' && <CustomerPage token={token} />}
      {tab === 'orders' && <OrderPage token={token} />}
      {tab === 'licenses' && (
        <LicensePage customers={customers} licenses={licenses} setLicenses={setLicenses} token={token} />
      )}
    </div>
  );
}

export default App;
