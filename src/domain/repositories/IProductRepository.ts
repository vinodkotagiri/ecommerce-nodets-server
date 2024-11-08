import { Product } from "../entities/Product";
export interface IProductUpdateObj{
    name?:string
    description?:string
    price?:number
  }
export interface IProductRepository {
    add(product: Product): Promise<void>
    update(id: string, product: IProductUpdateObj): Promise<Product|null>;
    delete(id: string): Promise<Product|null>;
    findById(id: string): Promise<Product|null>
    findAll(skip: number,limit: number): Promise<Product[]>;
}