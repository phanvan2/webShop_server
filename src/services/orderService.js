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

let getPriceOrderByIdShop = (idShop) => {
    return new Promise( async(resolve, reject) => {
        try {
            let result = await OrderModel.getPriceOrderByIdShop(idShop) ;
            if(result){
                let result_ = {
                    idShop: idShop,
                    totalPrice: 0,
                    total: []
                }
                
                let total = [

                ]
                
                result.map((item) => {
                    let date = new Date(item.createAt) ; 
                    console.log(date) ; 
                    let month = date.getMonth() + 1; 
                    let year = date.getFullYear(); 

                    let item_total = {
                        time: new Date(`${year}-${month}`) ,
                        price: Number(item.totalPrice)
                    }
                    console.log(item_total); 
                    if(total.length < 1) {
                        total.push(item_total) ; 

                    }else{
                        total = total.map((item1) => {
                            if( item1.time.toString() != item_total.time.toString()){
    
                                total.push(item_total) ; 
    
                            }else{
                                return {
                                    time: new Date(`${year}-${month}`) ,
                                    price: Number(item1.price + item_total.price)
                                }
                            }
                        })
                        result_.total = total;  
                        // console.log(total)
                    }

                    // result_.total = total; 
                    result_.totalPrice = result_ + Number(item.totalPrice);
                })


                resolve(result_) ; 

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
    changeStatus,
    getPriceOrderByIdShop
}


