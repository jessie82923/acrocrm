import React, { useState, useEffect } from 'react';
import LICENSE_GROUPS from '../config/licenseGroups';
import DynamicFormGroup from '../components/DynamicFormGroup';
import { parseLicenseKey, stringifyLicenseKey } from '../utils/licenseKey';
import type { Customer, License } from '../types';

const API = 'http://localhost:4000/api';

interface LicensePageProps {
    customers: Customer[];
    licenses: License[];
    setLicenses: React.Dispatch<React.SetStateAction<License[]>>;
}

const LicensePage: React.FC<LicensePageProps> = ({ customers, licenses, setLicenses }) => {
    const [editingLicense, setEditingLicense] = useState<License | null>(null);
    const [licenseFields, setLicenseFields] = useState<Record<string, any>>({});

    useEffect(() => {
        if (editingLicense) {
            const parsed = parseLicenseKey(editingLicense.licenseKey);
            setLicenseFields(parsed);
        } else {
            setLicenseFields({});
        }
    }, [editingLicense]);

    const handleLicenseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const customerId = Number(formData.get('customerId'));
        const validUntil = formData.get('validUntil') as string;
        const licenseKey = stringifyLicenseKey(licenseFields);
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
        setLicenseFields({});
    };

    const handleDeleteLicense = async (id: number) => {
        await fetch(`${API}/licenses/${id}`, { method: 'DELETE' });
        setLicenses(ls => ls.filter(l => l.id !== id));
    };

    return (
        <div>
            <h2>授權資料</h2>
            <form onSubmit={handleLicenseSubmit} className="form" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <select name="customerId" defaultValue={editingLicense?.customerId || ''} required
                    onChange={e => {
                        const cid = Number(e.target.value);
                        const found = licenses.find(l => l.customerId === cid);
                        if (found) {
                            setEditingLicense(found);
                        } else {
                            setEditingLicense(null);
                            setLicenseFields({});
                        }
                    }}
                    style={{ maxWidth: 300, marginBottom: 12 }}
                >
                    <option value="" disabled>選擇客戶</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input name="validUntil" type="date" defaultValue={editingLicense?.validUntil || ''} required style={{ maxWidth: 300, marginBottom: 12 }} />
                <DynamicFormGroup groups={LICENSE_GROUPS} values={licenseFields} onChange={(k, v) => setLicenseFields(f => ({ ...f, [k]: v }))} />
                <div style={{ display: 'flex', gap: 12 }}>
                    <button type="submit">{editingLicense ? '儲存' : '新增'}</button>
                    {editingLicense && <button type="button" onClick={() => { setEditingLicense(null); setLicenseFields({}); }}>取消</button>}
                </div>
            </form>
            <table>
                <thead><tr><th>客戶</th><th>授權內容</th><th>有效期限</th><th>操作</th></tr></thead>
                <tbody>
                    {licenses.map(l => (
                        <tr key={l.id}>
                            <td>{customers.find(c => c.id === l.customerId)?.name || '未知'}</td>
                            <td>
                                {LICENSE_GROUPS.map(group => (
                                    <div key={group.label} style={{ marginBottom: 4 }}>
                                        <b>{group.label}</b>
                                        {group.fields.map(f => (
                                            <div key={f.key} style={{ marginLeft: 12 }}>
                                                <span style={{ color: '#2563eb', fontWeight: 500 }}>{f.label}</span>：{parseLicenseKey(l.licenseKey)[f.key] ?? ''}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </td>
                            <td>{l.validUntil}</td>
                            <td>
                                <button onClick={() => { setEditingLicense(l); }}>編輯</button>
                                <button onClick={() => handleDeleteLicense(l.id)}>刪除</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LicensePage;
