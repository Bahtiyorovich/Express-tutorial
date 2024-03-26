import { Router } from 'express';
import { Pupil } from '../models/pupil.model.mjs';

const router = Router();

router.get('/pupils', async (req, res) => {
  try {
    const pupils = await Pupil.find();
    if(!pupils) return res.sendStatus(404);
    if(!pupils.length) return res.send('We do not have any users yet')
    return res.status(200).send(pupils)
  } catch (error) {
    throw new Error(error.message)
  }
})

export default router;