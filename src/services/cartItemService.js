import CartItemModel from "../models/CartItemModel" ; 

let addCartItem = (item) => {
    return new Promise( async(resolve, reject) => {
        console.log("2. cart item");
        try {
            let result = await CartItemModel.createNew(item); 
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
    addCartItem
}


