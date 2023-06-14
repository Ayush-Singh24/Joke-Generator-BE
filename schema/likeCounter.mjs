import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const LikeCounter = new Schema({
  id: ObjectId,
  jokeId: { type: Number, unique: true },
  like: { type: Number },
  dislike: { type: Number },
});

export const CounterModel = mongoose.model("Rating", LikeCounter);
