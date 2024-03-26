import { Router } from 'express'
import passport from 'passport';

const router = Router();

router.get('/', (req, res) => {
  console.log(req.session)
  console.log(req.session.id)
  req.session.visited = true;
  res.cookie('token', 'myToken', { maxAge: 10000000, signed: true });
  res.status(200).send({msg: "Welcome to your account!"});
})

router.get('/status', (req, res) => {
  
})

router.post('/login', passport.authenticate('local'), 
  (req, res) => {
    res.sendStatus(200);
});

router.post('/logout', (req, res) => {
  if(!req.user) return res.sendStatus(401)

  req.logout(err => {
    if(err) return res.sendStatus(400)
    res.send(200)
  })
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