import { Schema, model } from 'mongoose'

const PupilSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  coin: {
    type: Number,
    required: false,
    trim: true,
  },
  learnDay: {
    type: String,
    required: true,
    trim: true,
  },
  learnTime: {
    type: String,
    required: true,
    trim: true,
  }
}, { timestamps: true});

export const Pupil = model('pupil', PupilSchema);