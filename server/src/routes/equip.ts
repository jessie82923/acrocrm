import express from 'express';
import { AppDataSource } from '../index';
import { Equip } from '../entities/Equip';

const router = express.Router();
const repo = () => AppDataSource.getRepository(Equip);

router.get('/', async (req, res) => {
    const data = await repo().find({ relations: ['customer', 'product'] });
    res.json(data);
});

router.post('/', async (req, res) => {
    const e = repo().create(req.body);
    await repo().save(e);
    res.json(e);
});

router.put('/:id', async (req, res) => {
    await repo().update(req.params.id, req.body);
    const e = await repo().findOneBy({ id: Number(req.params.id) });
    res.json(e);
});

router.delete('/:id', async (req, res) => {
    await repo().delete(req.params.id);
    res.json({ success: true });
});

export default router;
