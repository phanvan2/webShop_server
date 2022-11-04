import _ from "lodash";

import { transError, transSuccess, transValidation } from "../../lang/vi";
import {cart, cartItem, product} from "../services/index" ; 

let orderCart = async(req, res) => {
    console.log("1. cart controller"); 
    if(!_.isEmpty(req.body)) {

        let cartUser = req.body.shippintInfor;
        let result = await cart.orderCart(cartUser);

        if(result){
            let cartItems = req.body.cartItems; 

            let hmm = await Promise.all(cartItems.map(async(item)=> {
                console.log(item)  ; 
                item.idCart = result._id;
                await product.updateQuantity(item.idProduct, item.quantity) ; 
                await cartItem.addCartItem(item) ; 
            })); 
            
            res.status(200).send({result:result, message: transSuccess.orderCart});

        }else{
            res.send({result: false, message: transError.orderCart}) ; 
        }
        


    }else{
        res.send({result: false, message: transValidation.data_empty}); 
    }
}


let getCartByIdUser = async(req, res) => {
    if(req.params.idUser) {
        req.send(req.params.idUser);
    }
    req.send("hello") ; 
}

export default {
    orderCart, 
    getCartByIdUser
}
