import multer from "multer"; 

import {product} from "../services/index"
import { transError, transSuccess } from "../../lang/vi";
import {app} from "../config/app"; 

let storageImageProduct = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null , app.image_product_directory);
    },
    filename: (req , file , cb) => {
        try{
            let math = app.image_type; 
            if(math.indexOf(file.mimetype) === -1){
                return cb("lỗi chọn file", null ,  )
            }
            let imageName =  `${Date.now()}-${file.originalname}`; 
            cb(null, imageName) ; 
        }catch(error){
            return cb("lỗi chọn file", null ,  )

        }

    }

}); 

let ImgProductUploadFile = multer({
    storage: storageImageProduct,

}).single("image_product"); 

let createNewProduct = (req , res) => {
    ImgProductUploadFile(req, res, async(error)=> {
        if(error){
            console.log(error);
            return res.status(500).send(transError.upImage);   
        }else{
            let newItem = {
                nameProduct: req.body.nameProduct,
                idSeller: req.body.idUser,
                idCategory: req.body.idCategory,
                imageProduct: req.file.filename,
                classify: {
                    color: req.body.color,
                    size: req.body.size,
                    other: req.body.other,
                },
                price: req.body.price,
                quantity: req.body.quantity,
                description: req.body.description
            }

            let result = await product.addNewProduct(newItem) ; 
            if(result){
                res.status(200).send(transSuccess.addNewProduct);
            }else{
                res.status(500).send(transError.addNewProduct);
            }
        }
    }); 
}

let getProductById = async(req, res) => {
    if(req.query.idProduct){
        try {
            let result = await product.getProductById(req.query.idProduct) ; 
            if(result){
                res.status(500).send(result); 
            }else{  
                res.status(500).send(transError.product_detail)
            }
        } catch (error) {
            res.status(500).send(transError.product_detail)

        }
       
    }
    res.status(500).send()
}

let getAllProduct = async( req, res) => {
    console.log(req.query);
    res.send(req.params) ;
} ; 

export default {createNewProduct, getProductById, getAllProduct}; 
