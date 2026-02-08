import { createServer, Http } from "corecdtl";

const web = createServer().Web({
    spaRootPath: "./dist/index.html",
    publicStaticPath: "./dist/assets",
    publicStaticRoute: "assets"
});

web.listen(8080, undefined, undefined, () => {
    console.log("listenning");
});

