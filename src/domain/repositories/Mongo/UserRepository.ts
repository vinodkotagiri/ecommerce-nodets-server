import { User } from "../../entities/User";
import UserModel from "../../models/UserModel";
import { IUserRepository } from "../IUserRepository";

export class UserRepository implements IUserRepository {
  async add(user: User): Promise<void> {
    const newUser = new UserModel(user);
    await newUser.save();
  }
  async findAll(skip = 0, limit = 10): Promise<User[]> {
    const products: User[] = await UserModel.find().skip(skip).limit(limit);
    return products || [];
  }

  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }

  async delete(id: string): Promise<User|null> {
    return await UserModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({email});
  }

}
