import express from "express"; 
import { user, product, category} from "../controllers/index" ; 
import getFileImage from "../helpers/getFile";

let router = express.Router(); 

let initRouter = (app) => {
    router.get("/chao", function(req, res){
        res.send("xin chào mọi người");
    }); 

    router.get("/", function(req, res){
        res.send("trang chủ");
    }); 

    router.post("/register", user.regissterUser ); 
    router.post("/login-user", user.loginUser); 
    router.post("/update-user/:idUser", user.updateUser);
    router.post("/update-image-user/:idUser", user.updateImgUser);
    router.post("/check-pass-user/:idUser", user.checkPassUser);
    
    router.post("/add-new-product/", product.createNewProduct);
    router.get("/detail-product", product.getProductById);
    router.get("/all-product/:page", product.getAllProduct) ; 
    router.get('/images/:path/:name_image', getFileImage); 

    router.post("/add-new-category", category.createNewCategory); 
    router.get("/category", category.getNormalCategoies); 


    return app.use("/", router);
}
export default initRouter; 
