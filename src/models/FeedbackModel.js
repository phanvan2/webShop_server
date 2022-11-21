import mongoose from "mongoose";

let Schema = mongoose.Schema ; 

let FeedbackSchema = new Schema({
    idUser: {type: String, default: null},
    idProduct: {type: String, default: null},
    rate: {type: Number, default: null }, // value: 1, 2,3 ,4 ,5 
    comment: {type: String, default: null},
    createAt: {type: String, default:Date.now},
    updateAt: {type: String, default: Date.now},
    deleteAt: {type: String, default: null}
});

FeedbackSchema.statics = {
    createNew(item){
        return this.create(item);
    },
    getFeedBack(skipNumber, idProduct, feedback_limit){
        return this.find({idProduct: idProduct}).sort({createAt: "desc"}).skip(skipNumber).limit(feedback_limit).exec();
    },
    getCountFeedBack(idProduct){
        return this.where({idProduct: idProduct}).count(); 

    }
} ; 

export default  mongoose.model("Feedback", FeedbackSchema)  ;

