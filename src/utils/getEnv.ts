import { Origin } from "../types";

export const getEnv = (key: string) => {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return process.env[key];
};

export const getAllUserAndPassEnv = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  const userClient = process.env.EMAIL_USER_CLIENT;
  const passClient = process.env.EMAIL_PASSWORD_CLIENT;

  if (!user || !pass || !userClient || !passClient) {
    throw new Error(
      "Email user or password is not defined in environment variables"
    );
  }

  return { user, pass, userClient, passClient };
};
export const getUserAndPassEnv = (accountType: Origin.SW1 | Origin.SW2) => {
  const user =
    accountType === Origin.SW2
      ? process.env.EMAIL_USER_CLIENT
      : process.env.EMAIL_USER;

  const pass =
    accountType === Origin.SW2
      ? process.env.EMAIL_PASSWORD_CLIENT
      : process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "Email user or password is not defined in environment variables"
    );
  }

  return { user, pass };
};
