import { Router } from 'express';
import { products } from '../utils/constants.mjs';

const router = Router();

router.get('/products', (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  console.log(req.signedCookies.token);

  if(req.signedCookies.token && req.signedCookies.token === 'myToken')
    return res.send(products);

  return res.status(403).send({msg: "Sory! You need the correct cookie"})
})

export default router;