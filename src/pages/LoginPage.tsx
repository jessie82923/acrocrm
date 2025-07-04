import { useState } from 'react';
import { login } from '../api/auth';

export default function LoginPage({ onLogin }: { onLogin: (token: string) => void }) {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const token = await login(username, password);
            onLogin(token);
        } catch (err: any) {
            setError(err.message || '登入失敗');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 340, margin: '80px auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 16px #0001', padding: 32 }}>
            <h2 style={{ textAlign: 'center', marginBottom: 24 }}>登入</h2>
            <form onSubmit={handleSubmit} className="form">
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="帳號" required />
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="密碼" required />
                <button type="submit" disabled={loading} style={{ marginTop: 12 }}>登入</button>
                {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            </form>
        </div>
    );
}
