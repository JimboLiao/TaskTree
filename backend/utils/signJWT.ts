import jwt from "jsonwebtoken";
export const EXPIRE_TIME = "72h";
const signJWT = (id: number): string => {
  const payload = { id: id };
  const key = process.env.TOKEN_SECRET || "";
  const token = jwt.sign(payload, key, {
    expiresIn: EXPIRE_TIME,
  });
  return token;
};

export default signJWT;
