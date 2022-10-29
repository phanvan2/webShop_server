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

export default {
    createNew,
    checkShopUserExit
}
