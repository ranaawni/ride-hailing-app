import { StatusCodes } from "http-status-codes";
import {UserRepository} from "ride-hailing-entities/build/src/database/repositories"
import { AppError } from "../common/AppError";
import _ from "lodash";
import { UserRole } from "ride-hailing-entities/build/src/database/entities/user";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const UserService = {
    registerUser : async(
        {
            firstName,
            lastName,
            email,
            password,
            role
        }:
        {firstName:string; lastName:string; email:string; password:string; role:UserRole}
    ) => {

         if(_.isEmpty(firstName) || _.isEmpty(lastName) || _.isEmpty(email) || _.isEmpty(password) || _.isEmpty(role) ){
            throw new AppError({
                httpCode: StatusCodes.BAD_REQUEST,
                description: "All fields required and can't be empty"
            })

         }

         if(!emailRegex.test(email)){
            throw new AppError({
                httpCode: StatusCodes.BAD_REQUEST,
                description: "Invalid email format"
            })
         }

         if (!Object.values(UserRole).includes(role)) {
            throw new AppError({
                httpCode: StatusCodes.BAD_REQUEST,
                description: "Invalid role"
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
            password,
            role
         })

         await UserRepository.save(createdUser)

    }
}