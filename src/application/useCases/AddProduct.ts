import { Product } from "../../domain/entities/Product";
import { IProductRepository } from "../../domain/repositories/IProductRepository";

export class AddProduct {
  constructor(private productRepository: IProductRepository) {}
  async execute(productData: Product): Promise<Product> {
    const product = new Product(productData.name, productData.description, productData.price);
    await this.productRepository.add(product);
    return product;
  }
}
