import swaggerJSDoc from "swagger-jsdoc";
import * as dotenv from "dotenv";
dotenv.config();

const option = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: process.env.SWAGGER_TITLE,
      version: "1.0.0",
    },
  },
  apis: ["**/person-routes.ts"],
};
export const swaggerSpec = swaggerJSDoc(option);
