import jwt from "jsonwebtoken";
const signJWT = (id: number): string => {
  const payload = { id: id };
  const key = process.env.TOKEN_SECRET || "";
  const token = jwt.sign(payload, key, {
    expiresIn: "72h",
  });
  return token;
};

export default signJWT;
