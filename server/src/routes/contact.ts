import express from 'express';
import { AppDataSource } from '../index';
import { Contact } from '../entities/Contact';

const router = express.Router();
const repo = () => AppDataSource.getRepository(Contact);

router.get('/', async (req, res) => {
    const data = await repo().find({ relations: ['customer'] });
    res.json(data);
});

router.post('/', async (req, res) => {
    const c = repo().create(req.body);
    await repo().save(c);
    res.json(c);
});

router.put('/:id', async (req, res) => {
    await repo().update(req.params.id, req.body);
    const c = await repo().findOneBy({ id: Number(req.params.id) });
    res.json(c);
});

router.delete('/:id', async (req, res) => {
    await repo().delete(req.params.id);
    res.json({ success: true });
});

export default router;
