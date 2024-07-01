import { body, validationResult } from "express-validator";
import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserRole } from "ride-hailing-entities/build/src/database/entities/user";

export const validateRideRequest = [
	body("riderId")
		.notEmpty()
		.withMessage("Rider ID is required")
		.bail()
		.isInt()
		.withMessage("Rider ID must be an integer"),

	body("source")
		.notEmpty()
		.withMessage("Source is required")
		.bail()
		.isString()
		.withMessage("Source must be a string"),

	body("destination").isString().withMessage("Destination must be a string"),
	(req: any, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ errors: errors.array() });
		}
		next();
	},
];

export const validateAcceptRide = [
	body("rideId")
		.notEmpty()
		.withMessage("Ride ID is required")
		.bail()
		.isInt()
		.withMessage("Ride ID must be an integer"),

	body("driverId")
		.notEmpty()
		.withMessage("Driver ID is required")
		.bail()
		.isInt()
		.withMessage("Driver ID must be an integer"),
	(req: any, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ errors: errors.array() });
		}
		next();
	},
];

export const validateRigesterUser = [
	body("firstName")
		.notEmpty()
		.withMessage("First name is required")
		.bail()
		.isString()
		.withMessage("First Name must be a string"),

	body("lastName")
		.notEmpty()
		.withMessage("Last name is required")
		.bail()
		.isString()
		.withMessage("Last Name must be a string"),

	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.bail()
		.isEmail()
		.withMessage("Email must be valid"),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.bail()
		.isLength({ min: 4 })
		.withMessage("Password must be at least 4 characters long"),

	body("role")
		.notEmpty()
		.withMessage("Role is required")
		.bail()
		.isString()
		.withMessage("Role must be a string")
		.bail()
		.isIn(Object.values(UserRole))
		.withMessage(`Role must be one of: ${Object.values(UserRole).join(", ")}`),

	(req: any, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ errors: errors.array() });
		}
		next();
	},
];
