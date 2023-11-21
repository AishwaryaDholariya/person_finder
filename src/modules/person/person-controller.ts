import { Request, Response } from "express";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { Constants } from "../../helpers/config/constants";
import { PersonUtils } from "./person-util";
export class PersonController {
  private personUtils: PersonUtils = new PersonUtils();
  public getPersonDetails = async (req: Request, res: Response) => {
    const id = req.query.id;
    const result: ResponseBuilder = await this.personUtils.PersonData(id);
    if (result.code === Constants.SUCCESS_CODE) {
      return res.status(result.code).json(result.result);
    }
    return res.status(result.code).json({ message: result.msg });
  };

  public createPerson = async (req: Request, res: Response) => {
    const person_data = req.body;
    const result: ResponseBuilder = await this.personUtils.personCreate(
      person_data
    );
    if (result.code === Constants.SUCCESS_CODE) {
      return res.status(result.code).json(result.result);
    }
    return res.status(result.code).json({ message: result.msg });
  };
  public updatePerson = async (req: Request, res: Response) => {
    const person_id = req.query.id;
    const person_data = req.body;
    const result: ResponseBuilder = await this.personUtils.personUpdate(
      person_id,
      person_data
    );
    if (result.code === Constants.SUCCESS_CODE) {
      return res.status(result.code).json(result.result);
    }
    return res.status(result.code).json({ message: result.msg });
  };

  public getPeopleAroundRadius = async (req: Request, res: Response) => {
    console.log(req.query);
    const person_name = req.query.person_name;
    const radius = req.query.radius;
    const result: ResponseBuilder =
      await this.personUtils.getPeopleAroundRadius(person_name, radius);
    if (result.code === Constants.SUCCESS_CODE) {
      return res.status(result.code).json(result.result);
    }
    return res.status(result.code).json({ message: result.msg });
  };
}
