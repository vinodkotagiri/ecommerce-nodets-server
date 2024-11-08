import { Request, RequestHandler, Response } from "express";
import { UserRepository } from "../../domain/repositories/Mongo/UserRepository";
import { Login } from "../../application/useCases/Login";
import { Signup } from "../../application/useCases/Signup";
import { sendErrorResponse, sendSuccessResponse } from "../utils/handleResponseCodes";
const userRepository = new UserRepository();
const loginUseCase = new Login(userRepository);
const signupUseCase = new Signup(userRepository);


const loginUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUseCase.execute(email, password);
    if (typeof user === "number") sendErrorResponse(res, 400,{code:user});
    else sendSuccessResponse(res, 200, user);
  } catch (error) {
    console.log("Error in loginUser controller: ", error);
    sendErrorResponse(res, 400, {error});
  }
};

const signupUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await signupUseCase.execute({
      firstName,
      lastName,
      email,
      password,
      userType: "customer",
      emailVerified: false,
      phoneVerified: false
    });
    if (typeof user === "number")  sendErrorResponse(res, 400,{code:user});
    else sendSuccessResponse(res, 201, {user});
  } catch (error:unknown) {
    console.log("Error in signupUser controller: ", error);
     sendErrorResponse(res, 400, {error});
  }
};

export default { loginUser, signupUser };
