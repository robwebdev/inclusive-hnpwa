import "isomorphic-fetch";

import {
  html,
  renderToStream,
  renderToString
} from "@popeindustries/lit-html-server";

import appConfig from "./common/app";
import express from "express";
import request from "request";

let app = express();
app.use(express.static("dist"));
app.use(express.static("public"));
app = wrapApp(app, appConfig);
app.listen(3000);

function wrapApp(app, { routes, notFound, error }) {
  routes.forEach(({ path, render }) => {
    app.get(path, async (req, res) => {
      try {
        renderToStream(
          render({ html }, req.params, { ...req.query, back: getBackUrl(req) })
        ).pipe(res);
      } catch (e) {
        console.error(e);
        const rendered = await renderToString(error({ html }));
        res.status(500).send(rendered);
      }
    });
  });

  app.get("/favicon/:domain", async (req, res) => {
    request(`http://cdn.staticaly.com/favicons/${req.params.domain}`).pipe(res);
  });

  app.use(async (req, res) => {
    const rendered = await renderToString(notFound({ html }));
    res.status(404).send(rendered);
  });

  return app;
}

function getBackUrl(request) {
  if (!request.headers.referer) return;

  if (
    request.headers.referer.indexOf(
      request.protocol + "://" + request.hostname
    ) === 0
  ) {
    return request.headers.referer;
  }
}
