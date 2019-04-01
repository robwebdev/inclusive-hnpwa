import "isomorphic-fetch";

import appConfig from "./common/app";
import express from "express";

let app = express();
app.use(express.static("dist"));
app.use(express.static("public"));
app = wrapApp(app, appConfig);
app.listen(3000);

function wrapApp(app, { routes, notFound, error }) {
  routes.forEach(({ path, render }) => {
    app.get(path, async (req, res) => {
      try {
        const rendered = await render(req.params, req.query);
        res.send(rendered);
      } catch (e) {
        console.error(e);
        const rendered = await error();
        res.status(500).send(rendered);
      }
    });
  });

  app.use(async (req, res) => {
    const rendered = await notFound();
    res.status(404).send(rendered);
  });

  return app;
}
