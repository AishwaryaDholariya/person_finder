const Joi = require("joi");

export class SchemaValidator {
  //update profile details schema
  public personSchema = Joi.object({
    person_name: Joi.string().required(),
    latitude: Joi.number().allow(null, ""),
    longitude: Joi.number().allow(null, ""),
  });

  // get person details schema
  public getPeronDetailsSchema = Joi.object({
    id: Joi.number().required(),
  });

  public radiusPeopleSchema = Joi.object({
    person_name: Joi.string().required(),
    radius: Joi.number().required(),
  });
}
