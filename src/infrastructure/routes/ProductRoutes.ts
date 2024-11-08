import  express  from 'express';
const router=express.Router();
import  ProductController  from "../controllers/ProductController";
router.get('/all',ProductController.getProducts)
router.post('/add',ProductController.addProduct)
router.post('/update',ProductController.updateProduct)
router.delete('/delete/:id',ProductController.deleteProduct)
export default router