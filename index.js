require("isomorphic-fetch");
const wrapApp = require("./lib/express");
const express = require("express");
const appConfig = require("./common/app");
let app = express();

app.use(express.static("dist"));
app.use(express.static("public"));
app = wrapApp(app, appConfig);

app.listen(3000);
