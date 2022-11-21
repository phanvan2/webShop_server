import OrderModel from "../models/OrderModel" ; 

let orderCart = (item) => {
    return new Promise( async(resolve, reject) => {
        try {
            let result = await OrderModel.createNew(item); 
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

let getOrderByIdUser = (idUser) => {
    return new Promise( async(resolve, reject) => {
        try {
            let result = await OrderModel.getOrderByIdUser(idUser) ;
            if(result){
                resolve(result) ; 

            }else{
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }

    }) ; 
}

let getOrderById = (idOrder) => {
    return new Promise( async(resolve, reject) => {
        try {
            let result = await OrderModel.getOrderById(idOrder) ;
            if(result){
                resolve(result) ; 

            }else{
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }

    }) ; 
} ; 

let changeStatus = (idOrder, statusChange) => {
    return new Promise( async(resolve, reject) => {
        try {
            let result = await OrderModel.updateStatus(idOrder, statusChange) ;
            if(result.matchedCount > 0){
                resolve(true) ; 

            }else{
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }

    }) ; 
}

export default {
    orderCart, 
    getOrderByIdUser,
    getOrderById, 
    changeStatus
}


