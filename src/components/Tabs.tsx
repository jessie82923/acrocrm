import React from 'react';

interface Tab {
    key: string;
    label: string;
}

interface TabsProps {
    tabs: Tab[];
    active: string;
    onChange: (key: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, active, onChange }) => (
    <div className="tabs">
        {tabs.map(tab => (
            <button
                key={tab.key}
                className={active === tab.key ? 'active' : ''}
                onClick={() => onChange(tab.key)}
            >
                {tab.label}
            </button>
        ))}
    </div>
);

export default Tabs;
