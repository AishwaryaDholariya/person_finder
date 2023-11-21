import { SchemaValidator } from "./person-schema-validator";
import { Constants } from "../../helpers/config/constants";

export class PersonSchemaValidator {
  private schemaValidator = new SchemaValidator();

  //update Profile schema validation
  public updatePerson = async (req, res, next) => {
    const data = { ...req.body };
    const { error } = this.schemaValidator.personSchema.validate(data);
    if (error) {
      res.status(406);
      return res.json({ message: error.message });
    } else {
      next();
    }
  };

  public radiusPeople = async (req, res, next) => {
    const data = { ...req.query };
    const { error } = this.schemaValidator.radiusPeopleSchema.validate(data);
    if (error) {
      res.status(406);
      return res.json({ message: error.message });
    } else {
      next();
    }
  };

  public persondetailId = async (req, res, next) => {
    const data = { ...req.query };
    const { error } = this.schemaValidator.getPeronDetailsSchema.validate(data);
    if (error) {
      res.status(406);
      return res.json({ message: error.message });
    } else {
      next();
    }
  };
}
