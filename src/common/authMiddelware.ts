import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "http";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { AppError } from "./AppError";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
	const token = req.headers["authentication"];

	if (!token) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.send(
				new AppError({
					httpCode: StatusCodes.UNAUTHORIZED,
					description: "Unauthorized user token not provided",
				})
			);
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY as any) as {
			userId: number;
		};
		req.userId = decoded.userId;
		next();
	} catch (err: any) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.send(
				new AppError({ httpCode: StatusCodes.UNAUTHORIZED, description: err })
			);
	}
};
