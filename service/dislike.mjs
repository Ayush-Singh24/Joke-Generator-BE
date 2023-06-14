import mongoose from "mongoose";
import { CounterModel } from "../schema/likeCounter.mjs";

export const dislike = async (jokeId) => {
  const doc = await CounterModel.findOne({
    jokeId,
  });

  if (!doc) {
    const instance = new CounterModel();
    instance.jokeId = jokeId;
    instance.like = 0;
    instance.dislike = 1;
    await instance.save();
    return instance;
  } else {
    doc.dislike++;
    await doc.save();
    return doc;
  }
};
