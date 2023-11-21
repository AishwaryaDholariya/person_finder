// import express from "express";
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   return console.log(`Express is listening at http://localhost:${port}`);
// });

import * as compression from "compression";
import * as express from "express";
import * as dotenv from "dotenv";
import * as swaggerUI from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import helmet from "helmet"; // Security
import * as methodOverride from "method-override"; // simulate DELETE and PUT (express4)
import * as morgan from "morgan"; // log requests to the console (express4)
import { Log } from "./helpers/logger";
import { DB } from "./database";
import { Routes } from "./routes";
// import * as l10n from 'jm-ez-l10n';
// import * as fileUpload from 'express-fileupload';
import { Constants } from "./helpers/config/constants";

dotenv.config();
// initialize database
DB.init();
export class App {
  protected app: express.Application;
  private logger = Log.getLogger();
  constructor() {
    const NODE_ENV: any = process.env.NODE_ENV;
    this.app = express();
    this.app.use(helmet());
    this.app.all("/*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Request-Headers", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization"
      );
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
      if (req.method === "OPTIONS") {
        res.writeHead(Constants.SUCCESS_CODE);
        res.end();
      } else {
        next();
      }
    });

    //swagger
    // this.app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    this.app.use(morgan("dev")); // log every request to the console
    this.app.use(compression());
    // l10n.setTranslationsFile('en', 'src/language/translation.en.json');
    // this.app.use(l10n.enableL10NExpress);
    this.app.use(express.json({ limit: "50mb" }));
    // this.app.use(fileUpload({
    // parseNested: true,
    // }));
    this.app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
    this.app.use(
      express.json(),
      (error: any, req: any, res: any, next: any) => {
        if (error) {
          return res
            .status(Constants.FAIL_CODE)
            .json({ error: req.t("ERR_GENRIC_SYNTAX") });
        }
        next();
      }
    );
    this.app.use(express.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
    this.app.use(methodOverride());
    const routes = new Routes(NODE_ENV);
    this.app.use("/", routes.path());
    console.log("?????????????????");

    this.app.listen(`${process.env.PORT}`, () => {
      console.log("?????????????????");
      this.logger.info(
        `The server is running in port localhost: ${process.env.PORT}`
      );
      this.logger.info(
        `The server is running in port localhost: ${process.env.PORT}`
      );
      process.on("uncaughtException", function (err) {
        console.error(err.stack);
      });
    });
  }
}
