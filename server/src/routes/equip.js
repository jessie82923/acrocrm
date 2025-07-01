import express from 'express';
import { AppDataSource } from '../index.js';
import { Equip } from '../entities/Equip.js';
import { Customer } from '../entities/Customer.js';
import { Product } from '../entities/Product.js';

const router = express.Router();
const repo = () => AppDataSource.getRepository(Equip);

router.get('/', async (req, res) => {
  const data = await repo().find({ relations: ['customer', 'product'] });
  res.json(data);
});

router.post('/', async (req, res) => {
  const equip = repo().create(req.body);
  if (req.body.customerId) {
    equip.customer = await AppDataSource.getRepository(Customer).findOneBy({ id: req.body.customerId });
  }
  if (req.body.productId) {
    equip.product = await AppDataSource.getRepository(Product).findOneBy({ id: req.body.productId });
  }
  await repo().save(equip);
  res.json(equip);
});

router.put('/:id', async (req, res) => {
  const equip = await repo().findOneBy({ id: Number(req.params.id) });
  if (req.body.customerId) {
    equip.customer = await AppDataSource.getRepository(Customer).findOneBy({ id: req.body.customerId });
  }
  if (req.body.productId) {
    equip.product = await AppDataSource.getRepository(Product).findOneBy({ id: req.body.productId });
  }
  Object.assign(equip, req.body);
  await repo().save(equip);
  res.json(equip);
});

router.delete('/:id', async (req, res) => {
  await repo().delete(req.params.id);
  res.json({ success: true });
});

export default router;
