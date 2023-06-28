import express from "express";
import http from "http";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8081, () => {
  console.log("Server Run On http://localhost:8081/");
});
