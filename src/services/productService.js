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
                // console.log(userInfor)
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
            // console.log(count_product)  ; 
            if(count_product == 0){ // nếu ko tìm tháy sản phẩmphẩm
                resolve([]) ;  // muốn tra về như thế này ko a 

            }else if(page == "all"){
                let result = await ProductModel.findAllProduct(1, count_product, key_search);
                // console.log(result) ;

                resolve(result);

            }else if(!isNaN(page)){
                let current_page = page; 
                if(count_product){
                        let total_page = Math.ceil((count_product / product_limit)); 
                        if (current_page > total_page){
                            resolve({result: [] , message: transError.not_page}); // nếu page hiện tại vượt quá tổng page
                        }
                        else if (current_page < 1){
                            current_page = 1;
                        }
                         
                        let skipNumber = (current_page -1) * product_limit;
                        let result = await ProductModel.findAllProduct(skipNumber, product_limit, key_search);
                        // console.log(result) ;
                        if(result){
                            resolve(result);
                        }else{
                            resolve([]); 
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
            // console.log(data_update); 
            let result = await ProductModel.updateProduct(item.idUser, idProduct, data_update) ;
            // console.log(result);
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

let getProductByIdCategory = (idCategory) => {
    return new Promise(async(resolve, reject)=> {
        try {
            let result = await ProductModel.getProductByIdCategory(idCategory); 
            resolve(result) ; 
        } catch (error) {
            reject(false);
        }

    });
}

// let checkProductSoldOut = (quantity, idProduct) => {
//     return new Promise(async(resolve, reject)=> {
//         try {

//             let result = await ProductModel.getQuantityById(idProduct) ; 
//             console.log(result.quantity); 
//             console.log(quantity) ; 
//             console.log(result.quantity >= quantity) ; 
//             resolve(result.quantity >= quantity) ; 
//             // if(quantityProduct >= quantity) {
//             //     resolve(true);
//             // }else{
//             //     resolve(false);
//             // }
//         } catch (error) {
//             reject(error); 
//         }

//     })
// }

// let checkListProductSoldOut = (cartItems) => {
//     return new Promise(async(resolve, reject)=> {
//         try {
//             let result1 = cartItems.filter(async(item)=> {
//                 let result = await ProductModel.getQuantityById(item.idProduct) ; 
//                 console.log(result) ; 
//                 console.log("hello") ;
//                 return (Number(result.quantity) < Number(item.quantity)); 
//             }) ; 
//             let resultt = await Promise.all(result1) ; 
//             return resolve(resultt) ; 
//         } catch (error) {
//             return reject(error) ; 
//         }

//     }); 
// }


/**
 * update quantity when user order product 
 * @param {*} quantity  quantity: the number of products that the user buys
 * @param {*} idProduct 
 * @returns 
 * 
 */
let updateQuantity = (idProduct, quantity) => {
    return new Promise(async(resolve, reject)=> {
        try {
            let quantiyProduct = await ProductModel.getQuantityById(idProduct); 
            // console.log("số lượng sản phẩm hiện tại"); 

            let changed_quantity = Number(quantiyProduct.quantity) - Number(quantity) ; 
            let data_update = {
                "quantity": changed_quantity, 
                "updateAt":  Date.now(),

            }; 
            let result = await ProductModel.updateQuantity(idProduct, data_update) ; 
            // console.log("Kết quả cập nhật sản phẩm số lượng sản phẩm");
            // console.log(result) ; 
            if(result.matchedCount == 1)
                resolve(true);
            else
                resolve(false);        
            } catch (error) {
        }

    })}

export default {
    addNewProduct, 
    getProductById, 
    getAllProduct, 
    updateProduct, 
    updateImage,
    getQuantityAllProduct, 
    // searchProduct , 
    getProductByIdCategory, 
    // checkProductSoldOut,
    // checkListProductSoldOut,
    updateQuantity
}; 
