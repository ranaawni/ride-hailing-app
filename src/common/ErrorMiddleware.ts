import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "./AppError";

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.httpCode).json({
            status: "error",
            message: err.description,
        });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Internal Server Error",
    });
};
