export async function login(username: string, password: string): Promise<string> {
    const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error('登入失敗');
    const data = await res.json();
    return data.token; // 假設後端回傳 { token: '...' }
}
