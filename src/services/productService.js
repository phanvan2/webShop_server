import ProductModel from "../models/ProductModel"; 

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
        
    }); 
}

export default {addNewProduct, getProductById}; 
