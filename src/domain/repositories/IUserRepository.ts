import { User } from "../entities/User";

export interface IUserRepository {
  add(user: User): Promise<void>;
  // update(id: string, user: IProductUpdateObj): Promise<User|null>;
  delete(id: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(skip: number, limit: number): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
}
