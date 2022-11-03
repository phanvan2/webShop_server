import express from "express"; 
import { user, product, category, feedback, shop, cart} from "../controllers/index" ; 
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
    router.get("/get-normal-user/:idUser", user.getNormalUser) ; 
    // router.post("/user/change-password/", user.changePassWord) ; 

    router.post("/add-new-product/", product.createNewProduct);
    router.get("/detail-product", product.getProductById);
    router.get("/all-product/:page", product.getAllProduct) ; 
    router.post("/updae-image-product/:idproduct",product.updateImage );
    router.post("/update-product/:idproduct", product.updateProduct);
    router.get("/count-all-product", product.countProduct); 
    // router.get("/product-search/", product.searchProduct);
    router.get("/product/get-by-idcategory/:idCategory", product.getProductByIdCategory); 
    
    router.get('/images/:path/:name_image', getFileImage);

    router.post("/add-new-category", category.createNewCategory); 
    router.get("/category", category.getNormalCategoies); 

    router.post("/feedback-user", feedback.createNew); 
    router.get("/get-feedback/:idProduct/:page", feedback.getFeedback);

    router.post("/shop/create-new", shop.createNew);

    router.post("/cart/order",cart.orderCart  );
    
    return app.use("/", router);
}
export default initRouter; 
