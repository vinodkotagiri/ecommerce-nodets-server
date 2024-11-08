import { UserType } from "./../entities/User";
import { Document, model, Schema } from "mongoose";
export interface IUserModel extends Document {
  firstName: string;
  email: string;
  password: string;
  userType: UserType;
  emailVerified: boolean;
  phoneVerified: boolean;
  phone: string;
  emailVerificationCode: string;
  phoneVerificationCode: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, default: "customer" },
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  phone: { type: String, default: undefined },
  emailVerificationCode: { type: String, default: undefined },
  phoneVerificationCode: { type: String, default: undefined },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const UserModel = model<IUserModel>("User", userSchema);
export default UserModel;