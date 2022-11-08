import ShopModel from "../models/ShopModel";

let createNew = (item) => {
    return new Promise(async(resolve, reject) => {
        try{
            console.log("shop service create new "); 
            let result = await ShopModel.createNew(item);
            console.log(result);
            resolve(result);
        } catch (error) {
            reject(false);
        }
    })
}; 

let checkShopUserExit = (idUser) => {
    return new Promise(async(resolve, reject) => {
        try{
            let check = await ShopModel.countByIdUser(idUser);
            console.log(check);
            if(check > 0){
                resolve(true);
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(false);
        }
    })
}

let getShopById = (idShop) =>{
    return new Promise(async(resolve, reject) => {
        try{
            console.log(idShop);
            let result = await ShopModel.getShopById(idShop); 
            console.log(result);
            if(result){
                resolve(result);
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(false);
        }
    })
}

let getShopByIdUser = (idUser) =>{
    return new Promise(async(resolve, reject) => {
        try{
            // console.log(idUser);
            let result = await ShopModel.getShopByIdUser(idUser); 
            // console.log(result);
            if(result){
                resolve(result);
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(false);
        }
    })
}; 

let updateInfoShop = (fillter , data_update) => {
    return new Promise(async(resolve, reject) => {
        try{
            console.log(data_update);
            console.log(fillter);
            let result = await ShopModel.updateInfoShop(fillter , data_update); 
            // console.log(result);
            if(result.matchedCount == 1){
                resolve(result);
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(false);
        }
    })
}
export default {
    createNew,
    checkShopUserExit,
    getShopById,
    getShopByIdUser, 
    updateInfoShop
}
