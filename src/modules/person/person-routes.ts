import { Router } from "express";
import { PersonController } from "./person-controller";
import { PersonSchemaValidator } from "./person-validator";

const router: Router = Router();
const personController = new PersonController();
const personSchemaValidator = new PersonSchemaValidator();

router.get(
  "/",
  personSchemaValidator.persondetailId,
  personController.getPersonDetails
);
router.post(
  "/",
  personSchemaValidator.updatePerson,
  personController.createPerson
);
router.put(
  "/",
  personSchemaValidator.updatePerson,
  personController.updatePerson
);

router.get(
  "/getPeopleAroundRadius",
  personSchemaValidator.radiusPeople,
  personController.getPeopleAroundRadius
);
export const PersonRoute: Router = router;
