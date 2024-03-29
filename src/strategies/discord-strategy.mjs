import passport from "passport";
import { Strategy } from "passport-discord";
import dotenv from 'dotenv';
import { DiscordMentor } from "../models/discord.model.mjs";
dotenv.config();

passport.serializeUser((mentor, done) => {
  done(null, mentor.id);
})

passport.deserializeUser(async(id, done) => {
  try {
    const findMentor = await DiscordMentor.findById(id);
    return findMentor ? done(null, findMentor) : done(null, null);
  } catch (error) {
    return done(error, null);
  }
});

export default passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URL,
      scope: ["identify"]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let findMentor = await DiscordMentor.findOne({ discordId: profile.id });

        if (!findMentor) {
          const newMentor = new DiscordMentor({
            username: profile.username,
            discordId: profile.id
          });
          const newSavedMentor = await newMentor.save();
          return done(null, newSavedMentor);
        }

        return done(null, findMentor);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);


