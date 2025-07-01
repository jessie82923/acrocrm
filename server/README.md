# CFM 後端 API 說明

## 啟動

1. 安裝依賴：
   ```bash
   cd server
   npm install
   ```
2. 修改 `src/index.js` 內的 PostgreSQL 連線資訊（預設帳號密碼皆為 postgres，資料庫名稱為 cfm）。
3. 啟動伺服器：
   ```bash
   npm run dev
   ```

## API 路徑
- /api/customers
- /api/contacts
- /api/products
- /api/licenses
- /api/equips

皆支援 GET（查詢）、POST（新增）、PUT（修改）、DELETE（刪除）。

## 資料表結構
- customer: id, name
- contact: id, name, tel, fk_customer_id
- product: id, name
- license: id, fk_customer_id, fk_product_id, license(json)
- equip: id, fk_customer_id, fk_product_id, detail(json)

---

如需測試，可用 Postman 或 curl 呼叫上述 API。
