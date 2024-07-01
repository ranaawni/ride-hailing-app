import { Request, Response } from "express";
import initializeDB from "./database/index";
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes")
import { errorHandler } from "./common/ErrorMiddleware";

require("dotenv").config();
const hostname = process.env.HOST || "0.0.0.0";

async function main() {
    const app = express();
    await initializeDB();
    app.use(bodyParser.json({ limit: "5mb" }));
    app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

    app.use(function (req: Request, res: Response, next: any) {
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        next();
      });
      app.use("/", router.router);
      app.use(errorHandler)


      app.get("/", (_req: any, Response: any) => {
        Response.send("hi ");
      });

      const port = process.env.PORT || 5000;
      app.listen(port, hostname, () =>
        console.log(`Server is running on http://${hostname}:${port}`)
      );

}

main()
