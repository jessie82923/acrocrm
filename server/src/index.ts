import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { DataSource } from 'typeorm';
import { Customer } from './entities/Customer';
import { Contact } from './entities/Contact';
import { Product } from './entities/Product';
import { License } from './entities/License';
import { Equip } from './entities/Equip';

const app = express();
app.use(cors());
app.use(express.json());

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres', // 請依實際環境修改
  password: 'acrored', // 請依實際環境修改
  database: 'acrocrm',
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
import customerRouter from './routes/customer';
import contactRouter from './routes/contact';
import productRouter from './routes/product';
import licenseRouter from './routes/license';
import equipRouter from './routes/equip';

app.use('/api/customers', customerRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/products', productRouter);
app.use('/api/licenses', licenseRouter);
app.use('/api/equips', equipRouter);
