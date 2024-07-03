import { UserService } from "../service/userService";
import { NextFunction, Response } from "express";
import { STATUS_CODES } from "http";
import { StatusCodes } from "http-status-codes";

export const UserResolver = {
	async registerUser(req: any, res: Response, next: NextFunction) {
		try {
			const { firstName, lastName, email, password, role } = req.body;

			const user = await UserService.registerUser({
				firstName,
				lastName,
				email,
				password,
				role,
			});

			return res.status(StatusCodes.CREATED).send(`${role} register successfully`);
		} catch (err) {
			return next(err);
		}
	},

    async loginUser(req: any, res: Response, next: NextFunction) {
		try {
			const {email, password} = req.body;
			const token = await UserService.loginUser({
				email,
				password
			})
			return res.status(StatusCodes.OK).send({"token":token})

		}
		catch(err) {
			return next(err);
		}
	}
};
