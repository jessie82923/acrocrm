import express from 'express';
import { AppDataSource } from '../index.js';
import { License } from '../entities/License.js';
import { Customer } from '../entities/Customer.js';
import { Product } from '../entities/Product.js';

const router = express.Router();
const repo = () => AppDataSource.getRepository(License);

router.get('/', async (req, res) => {
  const data = await repo().find({ relations: ['customer', 'product'] });
  res.json(data);
});

router.post('/', async (req, res) => {
  const license = repo().create(req.body);
  if (req.body.customerId) {
    license.customer = await AppDataSource.getRepository(Customer).findOneBy({ id: req.body.customerId });
  }
  if (req.body.productId) {
    license.product = await AppDataSource.getRepository(Product).findOneBy({ id: req.body.productId });
  }
  await repo().save(license);
  res.json(license);
});

router.put('/:id', async (req, res) => {
  const license = await repo().findOneBy({ id: Number(req.params.id) });
  if (req.body.customerId) {
    license.customer = await AppDataSource.getRepository(Customer).findOneBy({ id: req.body.customerId });
  }
  if (req.body.productId) {
    license.product = await AppDataSource.getRepository(Product).findOneBy({ id: req.body.productId });
  }
  Object.assign(license, req.body);
  await repo().save(license);
  res.json(license);
});

router.delete('/:id', async (req, res) => {
  await repo().delete(req.params.id);
  res.json({ success: true });
});

export default router;
