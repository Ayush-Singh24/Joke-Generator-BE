import mongoose from "mongoose";
import { CounterModel } from "../schema/likeCounter.mjs";

export const like = async (jokeId) => {
  const doc = await CounterModel.findOne({
    jokeId,
  });

  if (!doc) {
    const instance = new CounterModel();
    instance.jokeId = jokeId;
    instance.like = 1;
    instance.dislike = 0;
    await instance.save();
    return instance;
  } else {
    doc.like++;
    await doc.save();
    return doc;
  }
};
