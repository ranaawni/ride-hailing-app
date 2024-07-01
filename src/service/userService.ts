import { StatusCodes } from "http-status-codes";
import {UserRepository} from "ride-hailing-entities/build/src/database/repositories"
import { AppError } from "../common/AppError";
import _ from "lodash";

export const UserService = {
    registerUser : async(
        {
            firstName,
            lastName,
            email,
            password
        }:
        {firstName:string; lastName:string; email:string; password:string}
    ) => {

         if(_.isEmpty(firstName) || _.isEmpty(lastName) || _.isEmpty(email) || _.isEmpty(password) ){
            throw new AppError({
                httpCode: StatusCodes.BAD_REQUEST,
                description: "All fields required and can't be empty"
            })

         }

         const existingUser = await UserRepository.findOne({ where: { email } });
         if (existingUser) {
             throw new AppError({
                 httpCode: StatusCodes.CONFLICT,
                 description: "User with this email already exists"
             });
         }

      

         const createdUser = UserRepository.create({
            firstName,
            lastName,
            email,
            password
         })

         await UserRepository.save(createdUser)

    }
}