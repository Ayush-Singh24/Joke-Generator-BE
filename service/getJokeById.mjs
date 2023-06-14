import mongoose from "mongoose";
import { CounterModel } from "../schema/likeCounter.mjs";

export const getJokeById = async (jokeId) => {
  const doc = await CounterModel.findOne({
    jokeId,
  });

  if (!doc) {
    return {
      jokeId,
      like: 0,
      dislike: 0,
    };
  } else {
    return doc;
  }
};
