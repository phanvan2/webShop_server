import feedbackModel from "../models/FeedbackModel" ; 
import {app} from "../config/app";

const limit_feedback = app.limit_feedback; 
let createNew = (item) => {
    console.log("service") ;

    return new Promise( async(resolve, reject) => {
        try {
            let data = {
                idUser: item.idUser,
                idProduct: item.idProduct,
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
let getfeedback = async(page, idProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            let count_feedback = await feedbackModel.getCountFeedBack(idProduct);
            console.log(count_feedback)
            if(page == "all"){
                let result = await feedbackModel.getFeedBack(1,idProduct, count_feedback);
                resolve(result);

            }else if(!isNaN(page)){
                let current_page = page; 
                if(count_feedback){
                        let total_page = Math.ceil((count_feedback / limit_feedback)); 
                        if (current_page > total_page){
                            resolve(false); 
                        }
                        else if (current_page < 1){
                            current_page = 1;
                        }
                         
                        let skipNumber = (current_page -1) * limit_feedback;
                        let result = await feedbackModel.getFeedBack(skipNumber,idProduct, limit_feedback);
                        if(result){
                            resolve(result);
                        }else{
                            resolve(false); 
                        }
                
                }else{
                    resolve(false);
                }
            }else{
                resolve(false); 
            }
           
        } catch (error) {
            reject(false);
        }
        
    }); 
}
export default {
    createNew,
    getfeedback
}

