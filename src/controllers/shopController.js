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


let createNew = (req , res) => {
    ImgProductUploadFile(req, res, async(error)=> {
        if(error){
            res.send("lỗi ko upload được ảnh");
        }else{
            
            if(!_.isEmpty(req.body)){

                let checkShop = await shop.checkShopUserExit(req.body.idUser);
                console.log(checkShop)
                if(!checkShop){
                    let data = {
                        nameShop: req.body.nameShop,
                        idUser: req.body.idUser,
                        imgShop: req.file.filename,
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
        }
    })

}; 

export default {
    createNew
}