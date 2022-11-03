import mongoose from "mongoose";

let Schema = mongoose.Schema ; 

let CartItemSchema = new Schema({
    idCart: String, 
    idProduct: String,
    nameProduct: String,
    imgProduct: String,
    quantity: {type: Number, default: 1},
    unit_price: Number,
    createAt: {type:Number, default: Date.now}
}); 

CartItemSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
}

export default mongoose.model("cartItem", CartItemSchema); 

