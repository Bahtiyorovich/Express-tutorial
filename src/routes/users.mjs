import { Router } from "express";
import { query, validationResult, body, matchedData, checkSchema } from 'express-validator'
import { resolveIndexByPupilId } from "../middlewares/resolveIdByPupil.mjs";
import { createPupilValidationSchema } from "../utils/validationSchemas.mjs";
import { pupils } from "../utils/constants.mjs";

const router = Router();

// query parameters for filter
router.get('/filtered', 
  query("filter")
  .isString()
  .notEmpty().withMessage("Must not be empty")
  .isLength({min:3, max: 15}).withMessage("Must be at least 3-15 characters"), 
  (req, res) => {
    console.log(req.session.id);
    req.sessionStore.get(req.session.id, (err, sessionData) => {
      if(err) {
        console.log(err);
        throw err;
      }

      console.log(sessionData);
    })
    const result = validationResult(req);
    console.log(result);
    const { query: {
      filter, value
    },} = req;

    if(filter && value) return res.send(
      pupils.filter(pupil => pupil[filter].includes(value))
    )
});

router.get('/pupils', (req, res) => {
  res.status(201).send(pupils);
});


// POST Method
router.post('/pupils', 
  checkSchema(createPupilValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
      return res.status(400).send({ error: result.array() });
    }
    const data = matchedData(req);
    const newPupil = {...data}
    pupils.push(newPupil)
    return res.status(201).send(newPupil)
})

// PUT method
router.put('/pupils/:id', resolveIndexByPupilId, (req, res) => {
  const { body, findPupilIndex } = req;
  pupils[findPupilIndex] = {id: pupils[findPupilIndex].id, ...body}
  return res.status(200)
})

// PATCH method

router.patch('/pupils/:id', resolveIndexByPupilId, (req, res) => {
  const { body, findPupilIndex } = req;
  pupils[findPupilIndex] = {...pupils[findPupilIndex], ...body}
  return res.status(200).send({msg: "OK"})
})

// DELETE method
router.delete('/pupils/:id', resolveIndexByPupilId, (req, res) => {
  const { findPupilIndex } = req;
  pupils.splice(findPupilIndex, 1)
  return res.sendStatus(200)
})

export default router;

