import userModel from "../models/userModel" ;
import { transValidation, transSuccess } from "../../lang/vi";
import {app} from "../config/app" ;

import bcrypt from "bcrypt"; 
import fs from "fs-extra" ; 
import { user } from ".";

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
                        email: userItem.local.email,
                        address: userItem.address,
                        avatar: userItem.avatar,
                        role: userItem.role,
                        createAt: userItem.createAt,
                        gender: userItem.gender
                        
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
}; 

let updateImageUser = (idUser, nameImg) => {
    return new Promise(async(resolve, reject) => {
        try {
            console.log(idUser);
            console.log(nameImg);
            let inforUser = await userModel.findUserById(idUser);
            console.log(inforUser); 
            if(inforUser.avatar !== "avatar-default.jpg"){
                await fs.remove(`${app.image_user_directory}/${inforUser.avatar}`); 
            }
            let item = {
                avatar: nameImg, 
                updateAt:  Date.now()

            }
            let result = await userModel.updateInfor(idUser, item) ; 
            if(result) 
                resolve(true);
            else
                reject(false);

        } catch (error) {
            
        }
    })
}
let updateUser = (idUser, item) => {
    return new Promise(async(resolve, reject) => {
        try {
            let data_update = {
                username: item.username,
                gender: item.gender,
                phone: item.phone,
                address: item.address,
                updateAt:  Date.now()
            }
            let result = await userModel.updateInfor(idUser, data_update) ;
            if(result)
                resolve(result);
            else
                reject(false);
        } catch (error) {
            reject(error)
        }
    })
}

let checkPassUser = (idUser, password) => {
    return new Promise(async(resolve, reject)=> {
        let userItem = await userModel.findUserById( idUser); 
        if(userItem){
            let checkPass = bcrypt.compareSync(password + "", userItem.local.password + "");
            resolve(checkPass);
        }
    });
    
}

export default {createNew, loginUser, updateUser, checkPassUser, updateImageUser} ; 
