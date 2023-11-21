import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);

  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  console.log({ token: token });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403).json({ error: "Token expired" });
    req.user = decoded;
    next();
  });
};

export default verifyJWT;
