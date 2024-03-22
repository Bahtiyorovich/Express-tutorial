import express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import './configs/db.config.mjs';
import './strategies/local-strategy.mjs';

const app = express();
// MongoDB ga bog'lanish

app.use(express.json());
app.use(cookieParser('my-cookie'));
app.use(session({
  secret: 'mySession', // Express sessionni shifrlash uchun sirret so`z
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000 * 60,
    // secure: true
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`));

