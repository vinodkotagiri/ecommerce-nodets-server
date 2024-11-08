import { Document, model, Schema } from "mongoose";

interface IProductModel extends Document{
    name: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
const ProductModel = model<IProductModel>("Product", productSchema);
export default ProductModel;    