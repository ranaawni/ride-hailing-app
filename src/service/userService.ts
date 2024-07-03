import { StatusCodes } from "http-status-codes";
import { UserRepository } from "ride-hailing-entities/build/src/database/repositories";
import { AppError } from "../common/AppError";
import _ from "lodash";
import {
	User,
	UserRole,
} from "ride-hailing-entities/build/src/database/entities/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const UserService = {
	registerUser: async ({
		firstName,
		lastName,
		email,
		password,
		role,
	}: {
		firstName: string;
		lastName: string;
		email: string;
		password: string;
		role: UserRole;
	}) => {
		const existingUser = await UserRepository.findOne({ where: { email } });
		if (existingUser) {
			throw new AppError({
				httpCode: StatusCodes.CONFLICT,
				description: "User with this email already exists",
			});
		}

		const createdUser = UserRepository.create({
			firstName,
			lastName,
			email,
			password,
			role,
		});

		let user = await UserRepository.save(createdUser);
		return user;
	},

	loginUser: async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		const user = await UserRepository.findOne({ where: { email } });
		if (!user) {
			throw new AppError({
				httpCode: StatusCodes.CONFLICT,
				description: "Invalid user",
			});
		}

		const validPass = await bcrypt.compare(password, user.password);
		if (!validPass) {
			throw new AppError({
				httpCode: StatusCodes.UNAUTHORIZED,
				description: "Access denied",
			});
		}

		const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY as any);
		return token;
	},
};
