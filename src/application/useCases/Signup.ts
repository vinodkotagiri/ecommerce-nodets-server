import { IUserRepository } from "./../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { generateOTP, hashPassword } from "../../infrastructure/utils/authUtils";
import EmailService from "../../infrastructure/services/EmailService";

export class Signup {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: User): Promise<User | number> {
    if (!this.isValidEmail(userData.email)) return 903;

    if (!this.isValidPassword(userData.password)) return 902;

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) return 901;

    // Hash the password before storing it
    const hashedPassword = await hashPassword(userData.password);

    
    // Create a new User instance with hashed password
    const newUser = new User(userData.firstName, userData.lastName, userData.email, hashedPassword);
    const verificatingCode = generateOTP();
    newUser.emailVerificationCode = verificatingCode;
    await EmailService.sendVerificationEmail(newUser.email, verificatingCode);
    // Save the user to the repository
    await this.userRepository.add(newUser);

    return newUser;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    // Basic password validation (at least 6 characters)
    return password.length >= 6;
  }
}
