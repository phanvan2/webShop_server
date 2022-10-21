import ProductModel from "../models/ProductModel"; 
import {app} from "../config/app";

let product_limit = app.limit_product ; 

let addNewProduct = (newItem) => {
    return new Promise(async(resolve, reject) => {
       
        let result  = await ProductModel.createNew(newItem) ; 
        if(result){
            resolve(true);
        }else{
            reject(false); 
        }
       
        
    }); 
}; 

let getProductById = (idProduct) => {
    return new Promise(async(resolve, reject) => {
        try {
            let result = await ProductModel.findProductById(idProduct) ; 
            if(result)
            resolve(result); 
            else 
            resolve(false)
        } catch (error) {
            reject(false)
        }
        

    })
}

let getAllProduct = (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let count_product = await ProductModel.getCountProduct();
            if(page == "all"){
                let result = await ProductModel.findAllProduct(1, count_product);
                resolve(result);

            }else{
                let current_page = page; 
                if(count_product){
                        let total_page = Math.floor((count_product / product_limit)); 
                        if (current_page > total_page){
                            current_page = total_page;
                        }
                        else if (current_page < 1){
                            current_page = 1;
                        }
                         
                        let skipNumber = (current_page -1) * product_limit;
                        let result = await ProductModel.findAllProduct(skipNumber, product_limit);
                        if(result){
                            resolve(result);
                        }else{
                            reject(false); 
                        }
                
                }else{
                    reject(false);
                }
            }
           
        } catch (error) {
            reject(false);
        }
        
    }); 
}

export default {addNewProduct, getProductById, getAllProduct}; 
