import express from 'express';
import productRoutes from "./ProductRoutes";
import authRoutes from "./AuthRoutes";
const router=express.Router();
router.use('/product',productRoutes);
router.use('/auth',authRoutes)
export default router