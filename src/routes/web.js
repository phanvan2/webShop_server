import express from "express"; 
import { user, product, category} from "../controllers/index" ; 

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

    // router.get("/product/", product.getCategory);

    router.post("/add-new-category", category.createNewCategory); 
    router.get("/category", category.getNormalCategoies); 
    return app.use("/", router);
}
export default initRouter; 
