import { Router } from 'express'
import passport from 'passport';
import { authenticate,  getAuth, getAuthDiscord, getAuthStatus,  logOut } from '../controllers/auth/auth.controller.mjs';

const router = Router();

router.get('/auth', getAuth);
router.get('/auth/status', getAuthStatus);
router.post('/auth/login', passport.authenticate('local'), authenticate);
router.post('/auth/logout', logOut);
router.get('/auth/discord', passport.authenticate('discord'))
router.get('/auth/discord/redirect', passport.authenticate('discord'), getAuthDiscord);
export default router;