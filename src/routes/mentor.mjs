import { Router } from "express";
import { query, validationResult, matchedData, checkSchema } from 'express-validator'
// import { resolveIndexByPupilId } from "../middlewares/resolveIdByPupil.mjs";
import { createValidationSchema } from "../utils/validationSchemas.mjs";
import { Mentor }  from "../models/mentor.model.mjs";
import { hashedPassword } from "../utils/helpers.mjs";

const router = Router();

// query parameters for filter
// router.get('/mentors', async (req, res) => {
//     const { query: {
//       filter, value
//     },} = req;
// });

router.get('/mentors', async (req, res) => {
  try {
    const mentors = await Mentor.find()
    if( !mentors ) return res.sendStatus(404);
    return res.status(200).send(mentors)
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
});


// POST Method
router.post('/auth/register', checkSchema(createValidationSchema), async (req, res) => {
  const result = validationResult(req);
  if(!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  
  data.password = hashedPassword(data.password)
  const newMentor = new Mentor(data);
  try {
    const savedMentor = await newMentor.save();
    return res.status(201).send(savedMentor);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
})

// PUT method
router.put('/pupils/:id', (req, res) => {
  const { body, findPupilIndex } = req;
  pupils[findPupilIndex] = {id: pupils[findPupilIndex].id, ...body}
  return res.status(200)
})
 
// pupils[findPupilIndex] = { id: "1", username: "muhammadali"}
  
// PATCH method

router.patch('/pupils/:id',(req, res) => {
  const { body, findPupilIndex } = req;
  pupils[findPupilIndex] = {...pupils[findPupilIndex], ...body}
  return res.status(200).send({msg: "OK"})
})

// DELETE method
router.delete('/pupils/:id',(req, res) => {
  const { findPupilIndex } = req;
  pupils.splice(findPupilIndex, 1)
  return res.sendStatus(200)
})

export default router;

