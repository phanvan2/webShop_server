import _ from "lodash";
import {feedback} from "../services/index" ; 

let createNew = async(req , res) => {
    console.log("controller") ;
    if(_.isEmpty(req.body)){
        res.send("ko tìm thấy dữ liêu được gửi đến");
    }else{
        let result = await feedback.createNew(req.body); 
        if(result)
            res.status(200).send("Bạn đã tạo dữ liệu thành công"); 
        else
            res.send("Phản hồi thất bại"); 
    }
};

export default {
    createNew
}

