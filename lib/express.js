export default function(app, { routes, notFound, error }) {
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
