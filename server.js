"use strict";

import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import { CounterModel } from "./schema/likeCounter.mjs";
import { like } from "./service/like.mjs";
import { dislike } from "./service/dislike.mjs";
import { ERR_MSG } from "./utils/constants.mjs";
import { getJokeById } from "./service/getJokeById.mjs";
config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(json());

await mongoose.connect(process.env.DB_URL);

app.post("/like", async (req, res) => {
  try {
    const { jokeId } = req.body;
    const doc = await like(Number(jokeId));
    return res.status(201).send({ message: "Liked", doc });
  } catch (e) {
    return res.status(500).send({ message: ERR_MSG, error: e });
  }
});

app.post("/dislike", async (req, res) => {
  try {
    const { jokeId } = req.body;
    const doc = await dislike(Number(jokeId));
    return res.status(201).send({ message: "Disliked", doc });
  } catch (e) {
    return res.status(500).send({ message: ERR_MSG, error: e });
  }
});

app.get("/:jokeId", async (req, res) => {
  try {
    const { jokeId } = req.params;
    const doc = await getJokeById(jokeId);
    return res.status(200).send({ message: "Successful", doc });
  } catch (e) {
    return res.status(500).send({ message: ERR_MSG, error: e });
  }
});

app.listen(PORT, () => {
  console.log(`Listening to the port ${PORT}`);
});
