import _ from "lodash";

import { transError, transSuccess, transValidation } from "../../lang/vi";
import {cart, cartItem, product} from "../services/index" ; 

let orderCart = async(req, res) => {
    console.log("1. cart controller"); 
    if(!_.isEmpty(req.body)) {
        let cartItems = req.body.cartItems; 

        let cartUser = req.body.shippintInfor;
        let result = await cart.orderCart(cartUser);
        if(result){
            console.log(result);
            cartItems.map(async(item)=> {
                item.idCart = result._id;
                await product.updateQuantity(item.idProduct, item.quantity) ; 
                await cartItem.addCartItem(item) ; 
            })
            res.status(200).send({result:result, message: transSuccess.orderCart});

        }else{
            res.send({result: false, message: transError.orderCart}) ; 
        }
        


    }else{
        res.send({result: false, message: transValidation.data_empty}); 
    }
}

export default {
    orderCart
}
