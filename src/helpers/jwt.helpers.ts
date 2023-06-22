import jwt, { Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expiresTime: string
): string => {
  return jwt.sign(payload, secret, { expiresIn: expiresTime });
};

export const jwtHelpers = {
  createToken,
};
