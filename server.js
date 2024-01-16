import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/router.js";
import cookieParser from "cookie-parser";
import Query from "./model/Query.js";
import { faker } from "@faker-js/faker";

const server = express();
const port = 3000;
dotenv.config();
server.use(express.static("view/dist"));
server.use(cors({ credentials: true }));
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(router);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// for (let i = 0; i < 30; i++) {
//   const url = faker.image.imageUrl(640, 480, "cat", true);
//   const article_id = Math.floor(Math.random() * 25) + 1;
//   await Query.create("images", { article_id, url });
// }
