import _ from "lodash";
import {feedback} from "../services/index" ; 

let createNew = async(req , res) => {
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

let getFeedback = async(req, res) => {
    if(req.params.page && req.params.idProduct){
        let result = await feedback.getfeedback(req.params.page, req.params.idProduct); 
        if(result){
            res.status(200).send(result);
        }else{
            res.status(200).send({result: true, message: transError.error_data});
        }
    }
}

export default {
    createNew,
    getFeedback
}

