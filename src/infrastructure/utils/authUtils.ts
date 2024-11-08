import { default as bcrypt } from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {v4 as uuidv4} from 'uuid'
import config from "../../config";
dotenv.config();
const SALT_ROUNDS = 10;
const JWT_SECRET = config.JWT_SECRET
export function hashPassword(password: string): Promise<string> {
  const SALT = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hash(password, SALT);
}

export function comparePassword(password: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}

export function generateToken(payload: any): string {
  return jwt.sign({data:payload}, JWT_SECRET!,{expiresIn: "1h"});
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET!);
}

export function generateOTP(): string {
  const uuid=uuidv4();
  return uuid.slice(0, 6);
}