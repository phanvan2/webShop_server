import mongoose from "mongoose";
import bluebird from "bluebird" ;



let connectDB = () => {
    mongoose.Promise = bluebird ; 

    let URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ywiyree.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

     
    return mongoose.connect(URI);

}

export default connectDB ; 

