import { UserService } from "../service/userService";
import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const UserResolver = {
	async registerUser(req: any, res: Response, next: NextFunction) {
		try {
			const { firstName, lastName, email, password, role } = req.body;

			await UserService.registerUser({
				firstName,
				lastName,
				email,
				password,
				role,
			});

			return res.status(StatusCodes.CREATED).send("User Register Successfully");
		} catch (err) {
			return next(err);
		}
	},
};
