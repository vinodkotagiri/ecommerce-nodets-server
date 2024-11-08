import { IUserRepository } from './../../domain/repositories/IUserRepository';
import { User } from "../../domain/entities/User";
import { comparePassword,generateToken } from "../../infrastructure/utils/authUtils";

export class Login {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<{ user: User; token: string }|number> {
    // Find the user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) return 905;

    // Compare the provided password with the stored hashed password
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) return 905;
    
    // Generate JWT token for the authenticated user
    const token = generateToken(JSON.stringify(user));

    // Return the user along with the generated token
    return { user, token };
  }
}
