import { Schema, model } from "mongoose";

const DiscordMentorSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  discordId: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
});

export const DiscordMentor = model('discordMentor', DiscordMentorSchema);