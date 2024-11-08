import  express  from 'express';
const router=express.Router();
import  AuthController  from "../controllers/AuthController";
router.post('/login',AuthController.loginUser)
router.post('/signup',AuthController.signupUser)
export default router