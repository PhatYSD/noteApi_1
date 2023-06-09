import { cleanEnv, num, str } from "envalid";

const env = cleanEnv(process.env, {
  PORT: num(),
  MONGODB: str()
});

export default env;