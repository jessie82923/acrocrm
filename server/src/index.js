import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { DataSource } from 'typeorm';
import { Customer } from './entities/Customer.js';
import { Contact } from './entities/Contact.js';
import { Product } from './entities/Product.js';
import { License } from './entities/License.js';
import { Equip } from './entities/Equip.js';

const app = express();
app.use(cors());
app.use(express.json());

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres', // 請依實際環境修改
  password: 'postgres', // 請依實際環境修改
  database: 'cfm',
  synchronize: true,
  logging: false,
  entities: [Customer, Contact, Product, License, Equip],
});

AppDataSource.initialize().then(() => {
  app.listen(4000, () => {
    console.log('CFM API server running on http://localhost:4000');
  });
}).catch((err) => {
  console.error('DB connection error:', err);
});

// --- API routes ---
import customerRouter from './routes/customer.js';
import contactRouter from './routes/contact.js';
import productRouter from './routes/product.js';
import licenseRouter from './routes/license.js';
import equipRouter from './routes/equip.js';

app.use('/api/customers', customerRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/products', productRouter);
app.use('/api/licenses', licenseRouter);
app.use('/api/equips', equipRouter);
