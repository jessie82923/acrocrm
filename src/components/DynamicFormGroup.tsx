import React from 'react';

interface Field {
    key: string;
    label: string;
    type: 'select' | 'radio' | 'number';
    options?: string[];
}

interface Group {
    label: string;
    fields: Field[];
}

interface DynamicFormGroupProps {
    groups: Group[];
    values: Record<string, any>;
    onChange: (key: string, value: any) => void;
}

const DynamicFormGroup: React.FC<DynamicFormGroupProps> = ({ groups, values, onChange }) => (
    <div style={{ background: '#f8fafc', borderRadius: 8, padding: 16, marginBottom: 16, border: '1px solid #e0e7ff' }}>
        {groups.map((group, gi) => (
            <div key={gi} style={{ marginBottom: 18 }}>
                <div className="group-label" style={{ fontWeight: 600, color: '#222', marginBottom: 6 }}>{group.label}</div>
                {group.fields.map(f => (
                    <div key={f.key} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                        <label style={{ minWidth: 180 }}>{f.label}</label>
                        {f.type === 'select' ? (
                            <select value={values[f.key] || ''} onChange={e => onChange(f.key, e.target.value)} style={{ minWidth: 120 }}>
                                {f.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        ) : f.type === 'radio' ? (
                            <>
                                <label style={{ marginLeft: 8 }}>
                                    <input type="radio" checked={values[f.key] === 'Enable'} onChange={() => onChange(f.key, 'Enable')} /> Enable
                                </label>
                                <label style={{ marginLeft: 16 }}>
                                    <input type="radio" checked={values[f.key] === 'Disable'} onChange={() => onChange(f.key, 'Disable')} /> Disable
                                </label>
                            </>
                        ) : (
                            <input type="number" value={values[f.key] || ''} onChange={e => onChange(f.key, e.target.value)} style={{ minWidth: 80 }} />
                        )}
                    </div>
                ))}
            </div>
        ))}
    </div>
);

export default DynamicFormGroup;
