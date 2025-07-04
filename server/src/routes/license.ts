import express from 'express';
import { AppDataSource } from '../index';
import { License } from '../entities/License';

const router = express.Router();
const repo = () => AppDataSource.getRepository(License);

router.get('/', async (req, res) => {
    const data = await repo().find({ relations: ['customer', 'product'] });
    res.json(data);
});

router.post('/', async (req, res) => {
    const l = repo().create(req.body);
    await repo().save(l);
    res.json(l);
});

router.put('/:id', async (req, res) => {
    await repo().update(req.params.id, req.body);
    const l = await repo().findOneBy({ id: Number(req.params.id) });
    res.json(l);
});

router.delete('/:id', async (req, res) => {
    await repo().delete(req.params.id);
    res.json({ success: true });
});

export default router;
