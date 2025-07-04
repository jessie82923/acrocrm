import express from 'express';
import { AppDataSource } from '../index';
import { Product } from '../entities/Product';

const router = express.Router();
const repo = () => AppDataSource.getRepository(Product);

router.get('/', async (req, res) => {
    const data = await repo().find();
    res.json(data);
});

router.post('/', async (req, res) => {
    const p = repo().create(req.body);
    await repo().save(p);
    res.json(p);
});

router.put('/:id', async (req, res) => {
    await repo().update(req.params.id, req.body);
    const p = await repo().findOneBy({ id: Number(req.params.id) });
    res.json(p);
});

router.delete('/:id', async (req, res) => {
    await repo().delete(req.params.id);
    res.json({ success: true });
});

export default router;
