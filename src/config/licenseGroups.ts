const LICENSE_GROUPS = [
    {
        label: '1. 主機雲',
        fields: [
            { key: 'AcroServer', label: 'AcroServer', type: 'select', options: ['Standard', 'Advanced'] },
            { key: '授權節點數', label: '授權節點數', type: 'number' },
            { key: '混合主機', label: '混合主機', type: 'radio' },
            { key: '運算主機', label: '運算主機', type: 'radio' },
            { key: '儲存主機', label: '儲存主機', type: 'radio' },
        ],
    },
    {
        label: '2. 桌面雲',
        fields: [
            { key: '桌面雲', label: '桌面雲', type: 'radio' },
            { key: '雲桌面授權數', label: '雲桌面授權數', type: 'number' },
        ],
    },
    {
        label: '3. 智能桌面雲',
        fields: [
            { key: '智能桌面雲', label: '智能桌面雲', type: 'radio' },
            { key: 'Type2智能主機授權數', label: 'Type2智能主機授權數', type: 'number' },
            { key: 'Type1智能主機授權數', label: 'Type1智能主機授權數', type: 'number' },
        ],
    },
    {
        label: '4. 資料保全',
        fields: [
            { key: '輕量備份', label: '輕量備份', type: 'radio' },
            { key: '快照/排程快照', label: '快照/排程快照', type: 'radio' },
        ],
    },
    {
        label: '5. 停電防護',
        fields: [
            { key: '斷電防護裝置系統', label: '斷電防護裝置系統', type: 'radio' },
        ],
    },
    {
        label: '6. 資訊安全',
        fields: [
            { key: '安全連線', label: '安全連線', type: 'radio' },
            { key: '二次因子驗證', label: '二次因子驗證', type: 'radio' },
        ],
    },
];

export default LICENSE_GROUPS;
