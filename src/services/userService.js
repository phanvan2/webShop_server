import userModel from "../models/userModel" ;
import { transValidation, transSuccess } from "../../lang/vi";
import bcrypt from "bcrypt"; 

let createNew =  (item ) => {
    return new Promise(async (resolve, reject) => {
        try{
            let saltRounds = 7 ; 
            const salt = bcrypt.genSaltSync(saltRounds);

            let data = {
                username: item.username,
                gender: item.gender,
                phone:item.phone, 
                local: {
                    email: item.email,
                    password:bcrypt.hashSync(item.password + "",salt),
                    
                }
            }
            let result = await userModel.createNew(data); 
            resolve(result); 
        }catch(err){
            reject(err); 
        }
    
    })
}

let loginUser = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("hello login"); 
            let userItem = await userModel.findByEmail( item.email); 
            console.log(userItem);
            if(userItem){
                let checkPass = bcrypt.compareSync(item.password + "", userItem.local.password + "");
                if(checkPass){
                    let userInfor = {
                        idUser : userItem._id,
                        username: userItem.username,
                        email: userItem.local.email
                        
                    }
                    resolve(userInfor);
                }else{
                    resolve(false);
                }
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(false); 

        }
    })
}

export default {createNew, loginUser} ; 
