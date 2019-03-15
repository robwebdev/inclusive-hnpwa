import "isomorphic-fetch";

import appConfig from "./common/app";
import express from "express";
import wrapApp from "./lib/express";

let app = express();
app.use(express.static("dist"));
app.use(express.static("public"));
app = wrapApp(app, appConfig);
app.listen(3000);
