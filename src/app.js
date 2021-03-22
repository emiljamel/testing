import express from "express";
import magic from "express-routemagic";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import compression from "compression";
import helmet from "helmet";
import multer from "multer";
import serveFavicon from "serve-favicon";
import logger from "morgan";
import path from "path";
import fs from"fs";

const app = express();

/**
 * Set up view (template) engine.
 * @see https://expressjs.com/en/guide/using-template-engines.html
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

/**
 * 
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * @see https://expressjs.com/en/starter/static-files.html
 */
app.use("/static", express.static(path.join(__dirname, "public")));

/**
 * @requires module:npmjs.com/package/cookie-parser
 */
app.use(cookieParser());

/**
 * @requires module:npmjs.com/package/csurf
 */
app.use(csurf({ cookie: true }));

/**
 * @requires module:npmjs.com/package/compression
 */
app.use(compression());
 
/**
 * @requires module:npmjs.com/package/helmet
 */
app.use(helmet());
 
/**
 * @requires module:npmjs.com/package/multer
 */
const upload = multer();

app.use(upload.array());

/**
 * @requires module:npmjs.com/package/serve-favicon
 */
app.use(serveFavicon(path.join(__dirname, "public/images", "favicon.png")));

/**
 * @requires module:npmjs.com/package/morgan
 */
app.use(logger("combined", {
  stream: fs.createWriteStream(path.join(__dirname, "logs/access.log"), { 
    flags: "a" 
  })
}));

/**
 * @requires module:npmjs.com/package/express-routemagic
 */
magic.use(app, {
  routesFolder: "./src/controllers",
  logMapping: false
});

app.listen(3000);