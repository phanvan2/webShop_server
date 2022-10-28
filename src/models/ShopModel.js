import mongoose, { model } from "mongoose";

let Schema = mongoose.Schema; 

let ShopSchema = new Schema({
    nameShop: {type:String, default: null},
    idUser: {type: String, default: null},
    imgShop: {type:String, default: "default-shop.png"},
    createAt: {type: String, default: Date.now}, 
    updateAt: {type: String, default: null}, 
    deleteAt: {type:String, default: null},
}); 

ShopSchema.statics = {
    createNew(item) {
        return this.create(item) ;
    }
} ; 

export default  mongoose.model("Shop", ShopSchema); 
