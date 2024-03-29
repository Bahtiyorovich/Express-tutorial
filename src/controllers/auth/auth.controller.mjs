
// Passport-local authentication
export const getAuth = async (req, res) => {
  req.session.visited = true;
  res.cookie('token', 'myToken', { maxAge: 10000000, signed: true });
  res.status(200).send({msg: "Welcome to your account!"});
}

export const getAuthStatus = (req, res) => {
   req.mentor ? res.send(req.mentor) : res.sendStatus(401);
}

export const authenticate = async (req, res) => {
   await res.sendStatus(200);
}

export const logOut = async (req, res) => {
  if(!req.mentor) return res.sendStatus(401)

 await req.logout(err => {
    if(err) return res.sendStatus(400)
    res.send(200)
  })
}

export const createCartItem = async (req, res) => {
  if(!req.session.mentor) return res.status(401)
  const { body : item} = req;
  const {cart} = req.session;
  try {
      await cart.push(item)
      cart ? cart.push(item): req.session.cart = [item];

    return res.status(201).send(item)
    
  } catch (error) {
    return res.status(500) 
  }
}

export const getCartItems = async (req, res) => {
  if(!req.session.mentor) return res.status(401)
  return await res.send(req.session.cart ?? [])
}
// Passport-discord authentication

export const getAuthDiscord = async (req, res) => {
    return res.sendStatus(200);
}
