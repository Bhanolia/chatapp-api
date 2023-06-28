import express from "express";
import http from "http";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { Error } from "mongoose";

const app = express();
dotenv.config();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8081, () => {
  console.log("Server Run On http://localhost:8081/");
});


mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO);
mongoose.connection.on('error', (error:Error) => {
  console.log(error);
});
