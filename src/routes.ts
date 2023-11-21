import * as express from "express";
import { Constants } from "./helpers/config/constants";
import { PersonRoute } from "./modules/person/person-routes";
export class Routes {
  protected basePath: any;

  constructor(NODE_ENV: string) {
    switch (NODE_ENV) {
      case "production":
        this.basePath = "/app/dist";
        break;
      case "development":
        this.basePath = "/app/public";
        break;
    }
  }

  public path() {
    const router = express.Router();

    router.use("/person", PersonRoute);
    router.all("/*", (req, res) => {
      return res.status(Constants.NOT_FOUND_CODE).json({
        error: "ERR_URL_NOT_FOUND",
      });
    });
    return router;
  }
}
