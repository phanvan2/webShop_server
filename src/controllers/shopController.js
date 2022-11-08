import _ from "lodash";  
import multer from "multer"; 

import {shop} from "../services/index" ; 
import {app} from "../config/app"; 
import {transError, transSuccess, transValidation} from "../../lang/vi";

let storageImageProduct = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null , app.image_shop_directory);
    },
    filename: (req , file , cb) => {
        try{
            let math = app.image_type; 
            if(math.indexOf(file.mimetype) === -1){
                return cb("lỗi chọn file", null ,  )
            }
            let imageName =  `${Date.now()}-${file.originalname}`; 
            return cb(null, imageName) ; 
        }catch(error){
            return cb("lỗi chọn file", null ,  )

        }

    }

}); 

let ImgProductUploadFile = multer({
    storage: storageImageProduct,

}).single("img_shop"); 


let createNew = async(req , res) => {
    if(!_.isEmpty(req.body)){

        let checkShop = await shop.checkShopUserExit(req.body.idUser);
        console.log(checkShop)
        if(!checkShop){
            let data = {
                nameShop: req.body.nameShop,
                idUser: req.body.idUser,
                phone: String(req.body.phone),
                address: req.body.address
            }
            console.log(data);
            let result = await shop.createNew(data);
            console.log("chuẩn bị trả về kết quả nè");
            console.log(result);
            if(result){
                res.status(200).send({result: result, message: transSuccess.createNewShop(data.nameShop)});
            }
            else{
                res.send({result: false, message: transError.createNewShop}); 

            }
        }else{
            res.send({result:false, message: transError.existShop}); 
        }

    }else{
        res.send({result:false, message: transValidation.data_empty});
    }
    // ImgProductUploadFile(req, res, async(error)=> {
    //     if(error){
    //         res.send("lỗi ko upload được ảnh");
    //     }else{
            

    //     }
    // })

}; 

let getShopById = async(req, res) => {

    if(req.params.idShop){
        let idShop = req.params.idShop; 
        let result = await shop.getShopById(idShop); 
        if(result){
            res.status(200).send(result);
        }else{
            res.send({result: [], message: transError.error_data}); 
        }

    }else{
        res.send({result:[], message: transValidation.data_empty});
    }
}

let getShopByIdUser = async(req, res) => {

    if(req.params.idUser){
        let idUser = req.params.idUser; 
        let result = await shop.getShopByIdUser(idUser); 
        if(result){
            res.status(200).send(result);
        }else{
            res.send({result: [], message: transError.error_data}); 
        }

    }else{
        res.send({result:[], message: transValidation.data_empty});
    }
}

export default {
    createNew,
    getShopById,
    getShopByIdUser
}
