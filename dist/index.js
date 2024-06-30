"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const hostname = process.env.HOST || "0.0.0.0";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        app.use(bodyParser.json({ limit: "5mb" }));
        app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
        app.get("/", (_req, Response) => {
            Response.send("hi ");
        });
        const port = process.env.PORT || 5000;
        app.listen(port, hostname, () => console.log(`Server is running on http://${hostname}:${port}`));
    });
}
main();
