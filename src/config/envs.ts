import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;

  PRODUCTS_MICROSERVICES_HOST: string;
  PRODUCTS_MICROSERVICES_PORT: number;

  ORDERS_MICROSERVICES_HOST: string;
  ORDERS_MICROSERVICES_PORT: number;
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),

    PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICES_PORT: joi.number().required(),

    ORDERS_MICROSERVICES_PORT: joi.number().required(),
    ORDERS_MICROSERVICES_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars = value as EnvVars;

export const envs = {
  port: envVars.PORT,

  productMicroserviceHost: envVars.PRODUCTS_MICROSERVICES_HOST,
  productMicroservicePort: envVars.PRODUCTS_MICROSERVICES_PORT,

  orderMicroserviceHost: envVars.ORDERS_MICROSERVICES_HOST,
  orderMicroservicePort: envVars.ORDERS_MICROSERVICES_PORT,
};
