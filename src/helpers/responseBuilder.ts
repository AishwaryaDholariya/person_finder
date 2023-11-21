import { Constants } from "./config/constants";
import { Failure } from "./error";

export class ResponseBuilder {
  public code: number;
  public msg: string;
  public error: string;
  public result: JSON;
  public description: string;

  public static successMessage(msg: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 200;
    rb.msg = msg;
    return rb;
  }

  public static validation(msg: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 403;
    rb.msg = msg;
    return rb;
  }

  public static unAuthorized(msg: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 401;
    rb.msg = msg;
    return rb;
  }

  public static notFound(msg: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 404;
    rb.msg = msg;
    return rb;
  }

  public static errorMessage(msg?: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 500;
    rb.msg = msg != null ? msg : "ERR_INTERNAL_SERVER";
    return rb;
  }

  public static badRequest(msg: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 400;
    rb.error = msg;
    return rb;
  }

  public static data(result: JSON, msg?: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 200;
    rb.result = result;
    rb.msg = msg || null;
    return rb;
  }

  public static error(err: Failure) {
    const rb: ResponseBuilder = new ResponseBuilder();
    if (err.type === Constants.BAD_DATA) {
      rb.code = 400;
      rb.error = err.title;
      rb.description = err.description;
      rb.result = err.data;
      return rb;
    }
    rb.code = 500;
    rb.error = err.title || "ERR_INTERNAL_SERVER";
    rb.description = err.description;
    rb.result = err.data;
    return rb;
  }
}
