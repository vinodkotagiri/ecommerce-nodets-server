import { Request, RequestHandler, Response } from "express";
import { ProductRepository } from "../../domain/repositories/Mongo/ProductRepository";
import { AddProduct } from "../../application/useCases/AddProduct";
import { IProductUpdateObj } from "../../domain/repositories/IProductRepository";
import { sendErrorResponse, sendSuccessResponse } from "../utils/handleResponseCodes";
const productRepository = new ProductRepository();
const addProductUseCase = new AddProduct(productRepository);
const addProduct: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const product = await addProductUseCase.execute({ name, description, price });
    sendSuccessResponse(res, 201, product);
  } catch (error) {
    console.log("Error in getProducts controller: ", error);
    sendErrorResponse(res, 400, { error });
  }
};

const getProducts: RequestHandler = async (req: Request, res: Response) => {
  try {
    const products = await productRepository.findAll();
    sendSuccessResponse(res, 200, products);
  } catch (error) {
    console.log("Error in getProducts controller: ", error);
    sendErrorResponse(res, 400, { error });
  }
};

const updateProduct: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id, name, description, price } = req.body;
    const updateObj: IProductUpdateObj = {};
    if (name) updateObj["name"] = name;
    if (description) updateObj["description"] = description;
    if (price) updateObj["price"] = price;
    const product = await productRepository.update(id, updateObj);
    if (!product) sendErrorResponse(res, 1001, {});
    else sendSuccessResponse(res, 200, product);
  } catch (error) {
    console.log("Error in getProducts controller: ", error);
    sendErrorResponse(res, 400, { error });
  }
};

const deleteProduct: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productRepository.delete(id);
    if (!product) sendErrorResponse(res, 1001, {});
    else sendSuccessResponse(res, 200, product);
  } catch (error) {
    console.log("Error in deleteProduct controller: ", error);
    sendErrorResponse(res, 400, { error });
  }
};

export default { addProduct, getProducts, updateProduct, deleteProduct };
