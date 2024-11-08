import dotenv from "dotenv";
import path from "path";
const envPath = path.resolve(__dirname, `../../.env.${process.env.NODE_ENV || "development"}`);
dotenv.config({ path: envPath });
console.log('envPath',envPath)
console.log('pricess',process.env.MONGO_URL)
export default {
  PORT: process.env.PORT||3000,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URL: process.env.MONGO_URL,
  HOST: process.env.HOST,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  API_VERSION: process.env.API_VERSION
};
