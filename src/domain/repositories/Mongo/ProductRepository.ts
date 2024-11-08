import { Product } from "../../entities/Product";
import ProductModel from "../../models/ProductModel";
import { IProductRepository, IProductUpdateObj } from "../IProductRepository";

export class ProductRepository implements IProductRepository {
  async add(product: Product): Promise<void> {
    const newProduct = new ProductModel({
      name: product.name,
      description: product.description,
      price: product.price
    });
    await newProduct.save();
  }
  async findAll(skip = 0, limit = 10): Promise<Product[]> {
    const products: Product[] = await ProductModel.find().skip(skip).limit(limit);
    return products || [];
  }

  async findById(id: string): Promise<Product | null> {
    return await ProductModel.findById(id);
  }

  async update(id: string, product: IProductUpdateObj): Promise<Product|null> {
    return await ProductModel.findByIdAndUpdate(id, { $set: { ...product }, new: true });
  }
  async delete(id: string): Promise<Product|null> {
    return await ProductModel.findByIdAndDelete(id);
  }
}
