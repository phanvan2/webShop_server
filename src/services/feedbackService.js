import feedbackModel from "../models/FeedbackModel" ; 

let createNew = (item) => {
    console.log("service") ;

    return new Promise( async(resolve, reject) => {
        try {
            let data = {
                idUser: item.idUser,
                idProduct: item.product,
                rate: item.rate,
                comment: item.comment
            }; 
            let result = await feedbackModel.createNew(data) ; 
            console.log(result);  
            if(result){
                resolve(true); 
            }else{
                resolve(false);
            } 
        } catch (error) {
            reject(error) ; 
        }

    }); 
}

export default {
    createNew
}

