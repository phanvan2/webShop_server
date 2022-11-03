import CartModel from "../models/CartModel" ; 

let orderCart = (item) => {
    return new Promise( async(resolve, reject) => {
        try {
            let result = await CartModel.createNew(item); 
            if(result){
                resolve(result);
            }else{
                resolve(false);
    
            }
        } catch (error) {
            reject(error);
        }

    }) ; 
} ; 



export default {
    orderCart, 
}


