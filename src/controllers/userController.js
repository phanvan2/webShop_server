import {user} from "../services/index";
import _ from "lodash" ; 
import { transSuccess, transValidation, transError } from "../../lang/vi";

let regissterUser = async(req , res) => {
    if(_.isEmpty(req.body)){
        res.status(400).send(transValidation.data_empty)
    }else {
        let result = await user.createNew(req.body); 
        if(result){
            res.status(200).send(transSuccess.register_user(req.body.username)); 

        }else{
            res.status(500).send(transError.register_user); 

        }
    }
  

   
};

let loginUser = async(req, res) => {
    if(_.isEmpty(req.body)){
        res.status(400).send("Không tìm thấy dữ liệu")
    }else {
        let result = await user.loginUser(req.body); 
        if(result){
            res.status(200).send(result); 

        }else{
            res.status(500).send(transError.login_user); 

        }
    }
}
export default  {regissterUser, loginUser} ; 
