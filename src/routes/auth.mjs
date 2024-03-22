import { Router } from 'express'
import passport from 'passport';
import { Mentor } from '../models/mentor.model.mjs';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { loginValidationSchema } from '../utils/validationSchemas.mjs';

const router = Router();

router.get('/', (req, res) => {
  console.log(req.session)
  console.log(req.session.id)
  req.session.visited = true;
  res.cookie('token', 'myToken', { maxAge: 10000000, signed: true });
  res.status(200).send({msg: "Welcome to your account!"});
})

router.post(
  '/auth/login', 
  passport.authenticate('local'), 
  (req, res) => {
    res.sendStatus(200);
});

router.post('/auth/logout', (req, res) => {
  if(!req.user) return res.sendStatus(401)

  req.logout(err => {
    if(err) return res.sendStatus(400)
    res.send(200)
  })
})

router.get('/auth/status', (req, res) => {
  // req.sessionStore.get(req.sessionID, (err, session) => {
  //   console.log(session);
  // })
  // return req.session.mentor
  //   ? res.status(200).send(req.session.mentor) 
  //   : res.status(401).send({ msg:"Not Authenticated"});
  console.log('Inside /auth/status endpoint',)
  console.log(req.user);
  console.log(req.session);
  return req.user ? res.send(req.user) : res.sendStatus(401)
})

router.post('/cart', (req, res) => {
  if(!req.session.mentor) return res.status(401)
  const { body : item} = req;
  const {cart} = req.session;
  if(cart) {
    cart.push(item)
  }else {
    req.session.cart = [item];
  }
  return res.status(201).send(item)
})

router.get('/cart', (req, res) => {
  if(!req.session.mentor) return res.status(401)
  return res.send(req.session.cart ?? [])
})

export default router;