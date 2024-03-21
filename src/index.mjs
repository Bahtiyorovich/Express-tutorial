import express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { mentors } from './utils/constants.mjs';

const app = express();

app.use(cookieParser("my-cookie"));
app.use(express.json());
app.use(session({
  secret: 'mySession', // Express sessionni shifrlash uchun sirret so`z
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000 * 60,
  },
}));

// Routers
app.use(routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`));

app.get('/', (req, res) => {
  console.log(req.session)
  console.log(req.session.id)
  req.session.visited = true;
  res.cookie('token', 'myToken', { maxAge: 10000000, signed: true });
  res.status(200).send({msg: "Welcome to your account!"});
})

app.post('/api/auth', (req, res) => {
  const { body: { name, password} } = req;

  const findMentor = mentors.find(mentor => mentor.name === name)
  if(!findMentor || findMentor.password !== password) return res.status(401).send({ msg:"BAD CREDENTIALS"});

  req.session.mentor = findMentor
  return res.status(200).send(findMentor)
}) 

app.get('/api/auth/status', (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session);
  })
  return req.session.mentor
    ? res.status(200).send(req.session.mentor) 
    : res.status(401).send({ msg:"Not Authenticated"});
})

app.get('/api/cart', (req, res) => {
  if(!req.session.mentor) return res.status(401)
})