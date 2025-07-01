import express from 'express';
import { AppDataSource } from '../index.js';
import { Contact } from '../entities/Contact.js';
import { Customer } from '../entities/Customer.js';

const router = express.Router();
const repo = () => AppDataSource.getRepository(Contact);

router.get('/', async (req, res) => {
  const data = await repo().find({ relations: ['customer'] });
  res.json(data);
});

router.post('/', async (req, res) => {
  const contact = repo().create(req.body);
  if (req.body.customerId) {
    contact.customer = await AppDataSource.getRepository(Customer).findOneBy({ id: req.body.customerId });
  }
  await repo().save(contact);
  res.json(contact);
});

router.put('/:id', async (req, res) => {
  const contact = await repo().findOneBy({ id: Number(req.params.id) });
  if (req.body.customerId) {
    contact.customer = await AppDataSource.getRepository(Customer).findOneBy({ id: req.body.customerId });
  }
  Object.assign(contact, req.body);
  await repo().save(contact);
  res.json(contact);
});

router.delete('/:id', async (req, res) => {
  await repo().delete(req.params.id);
  res.json({ success: true });
});

export default router;
