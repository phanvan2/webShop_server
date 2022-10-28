import multer from "multer"; 
import _ from "lodash" ; 

import {product} from "../services/index"
import { transError, transSuccess, transValidation } from "../../lang/vi";
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
                res.status(200).send(result); 
            }else{  
                res.send(transError.product_detail)
            }
        } catch (error) {
            res.status(500).send(transError.product_detail)

        }
       
    }
    res.status(500).send()
}

let getAllProduct = async( req, res) => {
      
    if(req.params.page){
        let key_search = "" ; 
        if(req.query.search)
            key_search = req.query.search ; 
        
        let result = await product.getAllProduct(req.params.page, key_search); 
        if(result){
            res.status(200).send(result);
        }else{
            res.send({result: [], message: transError.error_data});
        }
    }
} ; 

let updateProduct = async(req, res) => {
    if(_.isEmpty(req.body)){
        res.status(500).send(transValidation.data_empty);
    }else{

        let result = await product.updateProduct(req.params.idproduct, req.body);
        if(result){
            res.status(200).send({result: true, message: transSuccess.updateProduct});
        }else{
            res.status(200).send({result: false, message: transError.updateProduct}); 
        }
    }
}; 

let updateImage = async(req, res) => {
    
    ImgProductUploadFile(req, res, async(error)=> {
        if(error){
            res.status(500).send("lỗi");
        }else{
            let idUser = req.body.idUser; 
            let namImage = req.file.filename; 
            let idProduct = req.params.idproduct;
            let result = await product.updateImage(idUser,idProduct, namImage);
            if(result)
                res.status(200).send(transSuccess.uploadImg);
            else
                res.status(200).send(transError.upImage);
        }
    })
};

let countProduct = async(req, res) => {
    let result = await product.getQuantityAllProduct(); 
    if(result){
        res.status(200).send({result: result, message: null});
    }
}; 

// let searchProduct = async(req, res) => {
//     console.log(req.query);
//     if(req.query.search){
//         let result = await product.searchProduct(req.query.search); 
//         res.status(200).send(result) ; 
//     }else{
//         res.send(transValidation.search_empty);

//     }
// }

export default {
    createNewProduct, 
    getProductById, 
    getAllProduct, 
    updateProduct, 
    updateImage, 
    countProduct, 
    // searchProduct
}; 
