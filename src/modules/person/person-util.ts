import { Tables } from "../../helpers/config/tables";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import * as My from "jm-ez-mysql";

export class PersonUtils {
  public async PersonData(id): Promise<ResponseBuilder> {
    console.log("MMMMMMM");
    const person_data = await My.first(
      Tables.PERSON,
      [`person_name`, `latitude`, `longitude`],
      `id=?`,
      [id]
    );

    return ResponseBuilder.data(person_data);
  }

  public async personCreate(person_data): Promise<ResponseBuilder> {
    const person_exist = await My.first(
      Tables.PERSON,
      [`id`],
      `person_name like '%${person_data.person_name}%'`
    );

    if (person_exist) {
      return ResponseBuilder.errorMessage(
        `Person alreay exist with this name.`
      );
    }
    const person_response = await My.insert(Tables.PERSON, person_data);
    return ResponseBuilder.data(
      person_response,
      "Person created successfully."
    );
  }

  public async personUpdate(person_id, person_data): Promise<ResponseBuilder> {
    const person_exist = await My.first(
      Tables.PERSON,
      [`id`],
      `person_name like '%${person_data.person_name}%'`
    );

    if (person_exist && person_exist.id != person_id) {
      return ResponseBuilder.errorMessage(
        `Person alreay exist with this name.`
      );
    }
    const person_response = await My.update(
      Tables.PERSON,
      person_data,
      `id = ?`,
      [person_id]
    );

    return ResponseBuilder.data(person_response, "Person updated sucessfully.");
  }

  public async getPeopleAroundRadius(
    person_name,
    radius
  ): Promise<ResponseBuilder> {
    const person_exist = await My.first(
      Tables.PERSON,
      [`*`],
      `person_name like '%${person_name}%'`
    );

    if (!person_exist) {
      return ResponseBuilder.errorMessage(`Person not exist`);
    }
    if (person_exist.latitude == null || person_exist.longitude == null) {
      return ResponseBuilder.errorMessage(`Person location not updated`);
    }
    const person_response = await My.query(`SELECT id, person_name,
                                                            111.1111 *
                                                            DEGREES(ACOS(LEAST(1.0, COS(RADIANS(latitude))
                                                                * COS(RADIANS(${person_exist.latitude}))
                                                                * COS(RADIANS(longitude) - RADIANS(${person_exist.longitude}))
                                                                + SIN(RADIANS(latitude))
                                                                * SIN(RADIANS(${person_exist.latitude}))))) AS distance_in_km
                                                        FROM person
                                                        HAVING distance_in_km<=${radius}
                                                        ORDER BY distance_in_km `);

    return ResponseBuilder.data(person_response, "Person updated sucessfully.");
  }
}
