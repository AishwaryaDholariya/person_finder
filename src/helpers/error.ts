import { Constants } from "./config/constants";

export class Failure extends Error {
  public static error(err: any, data?: any) {
    if (err instanceof SpFailure) {
      err.data = err.data === undefined ? data : err.data;
      return err;
    }
    if (err instanceof Failure) {
      err.type = err.type ? err.type : Constants.BAD_DATA;
      err.data = err.data === undefined ? data : err.data;
      return err;
    }
    const error = new Failure(
      "ERR_INTERNAL_SERVER",
      "Error is thrown by code",
      err,
      false,
      data
    );
    error.type = Constants.CODE;
    error.errorStack = err;
    error.data = data;
    return error;
  }

  public static spError(err: any, isSpError: boolean) {
    if (err instanceof Failure) {
      err.type = isSpError ? Constants.CODE : Constants.BAD_DATA;
      return err;
    }
    const error = new Failure("ERR_INTERNAL_SERVER", "Error is thrown by code");
    error.type = Constants.CODE;
    error.errorStack = err;
    return error;
  }

  public static throwApiError(response: any) {
    if (response && response.responseCode === "01") {
      return new Failure(
        response.responseDescription || "ERR_THIRD_PARTY",
        response.responseDescription || "ERR_THIRD_PARTY",
        response,
        false
      );
    }
    return new Failure(
      "ERR_THIRD_PARTY",
      response.responseDescription || "ERR_THIRD_PARTY",
      response,
      false
    );
  }
  public description: string;
  public errorStack: any;
  public title: string;
  public type: "BAD_DATA" | "CODE";
  public data: any;
  // Better approach need to be found for type
  constructor(
    title: any,
    description: string,
    errStack?: JSON,
    isError?: boolean,
    data?: any
  ) {
    super(title);
    this.title = title;
    this.type = isError ? Constants.CODE : Constants.BAD_DATA;
    this.description = description;
    if (errStack) {
      this.errorStack = errStack;
    }
    if (data) {
      this.data = data;
    }
  }
}

export class SpFailure extends Failure {
  constructor(
    title: any,
    description: string,
    isSpError: boolean,
    data?: JSON
  ) {
    super(title, description);
    super.type = isSpError ? Constants.CODE : Constants.BAD_DATA;
    super.data = data;
  }
}
