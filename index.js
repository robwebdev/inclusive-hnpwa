require("isomorphic-fetch");
const express = require("express");
const app = express();
const routes = require("./common/routes");

routes.forEach(({ path, render }) => {
  app.get(path, async function(req, res) {
    try {
      const rendered = await render(req.params, req.query);
      res.send(rendered);
    } catch (e) {
      console.error(e);
      res.send("Error");
    }
  });
});

app.use(express.static("dist"));
app.use(express.static("public"));

app.listen(3000);
