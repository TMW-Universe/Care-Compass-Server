import { Logger } from '@nestjs/common';

const getBooleanFromString = (value: string | undefined, def = false) => {
  if (value === undefined || value === '') return def;

  return ['true', '1', 'yes', 'enabled'].includes(value.toLowerCase());
};

const getNumberFromString = (value: string | undefined, def: number) => {
  if (value === undefined) return def;

  const num = +value;

  if (isNaN(num)) {
    Logger.warn(
      `'${value}' is not a number. It has been defaulted to '${def}'. Please, check the configuration file and set a valid number.`,
    );
    return def;
  }
  return num;
};

const getOptionalString = (value: string | undefined, def: string) => {
  if (!value || value === '') return def;
  return value;
};

export const getEnv = (): EnvFile => {
  const env = process.env as unknown as RawEnvFile;

  return {
    domain: env.DOMAIN,
    database: {
      user: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      name: getOptionalString(env.DATABASE_NAME, 'tmwu_care_compass'),
      host: env.DATABASE_HOST,
      port: getNumberFromString(env.DATABASE_PORT, 3306),
      logging: getBooleanFromString(env.DATABASE_LOGGING, false),
    },
    jwtSecret: env.JWT_SECRET,
    openApi: getBooleanFromString(env.OPEN_API),
    cors: getBooleanFromString(env.CORS, true),
    port: getNumberFromString(env.PORT, 5001),
    helmet: getBooleanFromString(env.HELMET, true),

    auth: {
      host: env.TMWU_AUTH_HOST,
      configRetryDelay: getNumberFromString(
        env.TMWU_AUTH_CONFIG_RETRY_DELAY,
        10000,
      ),
    },
  };
};

interface EnvFile {
  domain: string;

  database: {
    user: string;
    password: string;
    name: string;
    host: string;
    port: number;
    logging: boolean;
  };

  jwtSecret: string;

  openApi: boolean;
  cors: boolean;
  port: number;
  helmet: boolean;

  auth: {
    host: string;
    configRetryDelay: number;
  };
}

class RawEnvFile {
  DOMAIN: string;

  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  DATABASE_HOST: string;
  DATABASE_PORT?: string;
  DATABASE_LOGGING?: string;

  JWT_SECRET: string;

  OPEN_API?: string;
  CORS?: string;
  PORT?: string;
  HELMET?: string;

  TMWU_AUTH_HOST: string;
  TMWU_AUTH_CONFIG_RETRY_DELAY?: string;
}
