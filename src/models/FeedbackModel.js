import mongoose from "mongoose";

let Schema = mongoose.Schema ; 

let FeedbackSchema = new Schema({
    idUser: {type: String},
    idProduct: {type: String},
    rate: {type: Number, default: null }, // value: 1, 2,3 ,4 ,5 
    comment: {type: String, default: null},
    createAt: {type: String, default:Date.now},
    updateAt: {type: String, default: Date.now},
    createAt: {type: String, default: null}
});

FeedbackSchema.statics = {
    createNew(item){
        return this.create(item);
    }
} ; 

export default  mongoose.model("Feedback", FeedbackSchema)  ;

