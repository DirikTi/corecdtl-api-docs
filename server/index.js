import fs from "fs";
import path from "path";

import { createServer, Factory, Http } from "corecdtl";

const mainRoute = Factory.createRoute("/");
const coverRoute = Factory.createRoute("api/v1/cover");

const DATA_FILE = path.resolve("./data/cover.txt");

const ep = Factory.createEndpoint(
  Http.HttpMethod.POST,
  "",
  (req, resp) => {
    try {
        const text = req.body;

      if (typeof text !== "string" || text.trim() === "") {
        resp.setStatus(400).json({ ok: false, error: "empty body" });
        return;
      }

      fs.appendFileSync(
        DATA_FILE,
        text + "\n********\n********\n",
        "utf-8"
      );

      resp.json({ ok: true });
    }
    catch (err) {
        console.log(err);
      resp.setStatus(500).json({
        ok: false,
        error: "file write failed"
      });
    }
  },
  {
    encoding: null,
    type: "text/plain"
  }
);

coverRoute.addEndpoint(ep);
mainRoute.addRoute(coverRoute);

const web = createServer().Web({
  spaRootPath: "./dist/index.html",
  publicStaticPath: "./dist/assets",
  publicStaticRoute: "assets"
}, mainRoute);

web.listen(8080, undefined, undefined, () => {
  console.log("listening on 8080");
});
