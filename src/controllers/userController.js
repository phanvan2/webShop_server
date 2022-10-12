import {user} from "../services/index";
import {validationResult} from "express-validator"; 
import _ from "lodash" ; 

let regissterUser = async(req , res) => {
    if(_.isEmpty(req.body)){
        res.status(400).send("Không tìm thấy dữ liệu")
    }else {
        let result = await user.createNew(req.body); 
        
        res.status(200).send(result)
    }
  

   
};

let loginUser = async(req, res) => {
    if(_.isEmpty(req.body)){
        res.status(400).send("Không tìm thấy dữ liệu")
    }else {
        let result = await user.loginUser(req.body); 
        
        res.status(200).send(result)
    }
}
export default  {regissterUser, loginUser} ; 
