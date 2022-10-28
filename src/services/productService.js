import ProductModel from "../models/ProductModel"; 
import userModel from "../models/userModel";
import {app} from "../config/app";
import fs from "fs-extra" ; 
import { transError, transSuccess } from "../../lang/vi";

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
            if(result){
                let userInfor = await userModel.findUserById(result.idSeller) ; 
                console.log(userInfor)
                let data = {
                    _id : result._id,
                    nameProduct: result.nameProduct,
                    idSeller: {
                        email: userInfor.local.email,
                        _id: userInfor._id,
                        username: userInfor.username,
                        gender: userInfor.gender,
                        phone: userInfor.phone,
                        address: userInfor.address,
                        avatar: userInfor.avatar,
                        role: userInfor.role
                    },
                    idCategory: result.idCategory,
                    imageProduct: result.imageProduct,
                    price: result.price,
                    quantity: result.quantity,
                    description: result.description
                }
                
                resolve(data); 

            }
            else 
            resolve(false)
        } catch (error) {
            reject(false)
        }
        

    })
}

let getAllProduct = (page, key_search) => {
    return new Promise(async (resolve, reject) => {
        try {
            let count_product = await ProductModel.getCountProduct(key_search);
            console.log(count_product)  ; 
            if(count_product == 0){
                resolve(transSuccess.not_search_result) ; 
            }else if(page == "all"){
                let result = await ProductModel.findAllProduct(1, count_product, key_search);
                console.log(result) ;

                resolve(result);

            }else if(!isNaN(page)){
                let current_page = page; 
                if(count_product){
                        let total_page = Math.ceil((count_product / product_limit)); 
                        if (current_page > total_page){
                            resolve({result: false , message: transError.not_page}); 
                        }
                        else if (current_page < 1){
                            current_page = 1;
                        }
                         
                        let skipNumber = (current_page -1) * product_limit;
                        let result = await ProductModel.findAllProduct(skipNumber, product_limit, key_search);
                        console.log(result) ;
                        if(result){
                            resolve(result);
                        }else{
                            resolve(false); 
                        }
                
                }else{
                    reject(false);
                }
            }else{
                resolve(false); 
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
let getQuantityAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let count_product = await ProductModel.getCountProduct();
            let total_page = Math.ceil((count_product / product_limit)); 
            let result = {
                quantity : count_product ,
                total_page: total_page
            }; 
            resolve(result) ; 
    
        } catch (error) {
            reject(false);
        }
        
    }); 
}; 

// let searchProduct = (search) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let result = await ProductModel.searchProduct(search) ; 
//             resolve(result) ; 
    
//         } catch (error) {
//             reject(false);
//         }
        
//     }); }
export default {
    addNewProduct, 
    getProductById, 
    getAllProduct, 
    updateProduct, 
    updateImage,
    getQuantityAllProduct, 
    // searchProduct 
}; 
