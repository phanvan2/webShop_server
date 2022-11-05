import mongoose from "mongoose";

let Schema = mongoose.Schema ; 

let CartSchema = new Schema({
    idUser: String,
    productItems:[{
        idProduct: String,
        nameProduct: String,
        imgProduct: String,
        quantity: {type: Number, default: 1},
        unit_price: Number,
    }],
    namedReceiver: {type: String, default: null},   // tên người nhận hàng
    addressReceiver: {type: String, default: null}, // địa chỉ người nhận hàng 
    phoneReceiver: {type: Number, default: null},   // số điện thoại người nhận hàng
    status: {type: String, default: null},          // trạng thái đơn hàng 
    payment:{type:String, default: ""},             // phương thức thanhh toán
    totalPrice: {type: String, default: 0},
    message: {type: String, default: ""},
    // orderDate: {type: Date, default: null},         // ngày đặt hàng
    createAt: {type: Number, default: Date.now},      // ngày tạo đơn hàng 
    updateAt: {type: Number, default: null}, 
    deleteAt: {type: Number, default: null}
}); 

CartSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    getCartByIdUser(idUser){
        return this.find({"idUser": idUser}).exec(); 
    },
    getOrderById(id){
        return this.findById(id).exec(); 
    }
}

export default mongoose.model("order", CartSchema); 

