import ProductModel from "../models/ProductModel"; 
import {app} from "../config/app";
import fs from "fs-extra" ; 

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
}; 

let updateProduct = (idProduct, item) => {
    return new Promise(async(resolve, reject) => {
        try {
            let data_update = {
                nameProduct: item.nameProduct,
                idCategory: item.idCategory ,
                price: item.price,
                quantity: item.quantity,
                description: item.description,
                updateAt:  Date.now(),
            }
            let result = await ProductModel.updateProduct(item.idUser, idProduct, data_update) ;
            if(result.matchedCount == 1)
                resolve(true);
            else
                resolve(false);
        } catch (error) {
            reject(error)
        }
    })
}; 

let updateImage = (idUser, idProduct, nameImage) => {
    return new Promise(async(resolve, reject) => {
        try {
            let data_update = {
                imageProduct: nameImage
            }
            let inforProduct = await ProductModel.findProductById(idProduct);
            
            await fs.remove(`${app.image_product_directory}/${inforProduct.imageProduct}`); 
            
            let result = await ProductModel.updateProduct(idUser,idProduct, data_update) ;
            if(result.matchedCount ==1)
                resolve(true);
            else
                reject(false);
        } catch (error) {
            reject(error)
        }
    })
}

export default {addNewProduct, getProductById, getAllProduct, updateProduct, updateImage}; 
