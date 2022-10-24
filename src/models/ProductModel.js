import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    nameProduct: {type: String, default: null},
    idSeller: {type: String, default: null},
    idCategory: {type: String, default: null},
    imageProduct: {type: String, default: null},
    classify: {
        color: {type: String, default: null},
        size: {type: String, default: null},
        other: {type: Object, default: null},
    },
    price: {type: Number, default: 0},
    quantity: {type: Number, default: 1},
    description: {type:String, default: null},
    createAt: {type: Number, default: Date.now},
    updateAt:  {type: Number, default: Date.now},
    deleteAt: {type: Number, default: null}
}); 

ProductSchema.statics = {
    createNew(item){
        return this.create(item); 
    }, 

    findProductById(idProduct){
        return this.findById(idProduct).exec(); 
        
    },

    findAllProduct(skipNumber, product_limit){
        return this.find().skip(skipNumber).limit(product_limit).exec();
    },

    getCountProduct(){
        return this.count(); 
    }, 

    updateProduct(idUser, idProduct, item){
        return this.update({
            $and: [
                {idSeller: idUser},
                {_id: idProduct}
            ]
        }, item).exec();
    },
    searchProduct(search){
        return this.find({nameProduct: {"$regex": new RegExp(search, "i")}},'_id nameProduct idSeller idCategory imageProduct price updateAt' ).exec();
    }
};

export default mongoose.model("product", ProductSchema) ; 
