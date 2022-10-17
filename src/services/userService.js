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
            let userItem = await userModel.findByEmail( item.email); 
            if(!userItem){
                resolve(false);
            }else{

                let checkPass = bcrypt.compareSync(item.password, userItem.local.password );
                console.log("check passs"); 
                console.log(checkPass); 
                if(checkPass){
                    let userInfor = {
                        idUser : userItem._id,
                        username: userItem.username,
                        email: userItem.local.email
                        
                    }
                    resolve(userInfor);
                }else{
                    resolve(false)
                }

            }
            resolve(false); 
        } catch (error) {
            reject(false); 

        }
    })
}

export default {createNew, loginUser} ; 
