import { RideService } from "../service/rideService";
import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const RideResolver = {
	async requestRide(req: any, res: Response, next: NextFunction) {
		try {
			const { riderId, source, destination } = req.body;

			await RideService.requestRide({ riderId, source, destination });
			return res
				.status(StatusCodes.CREATED)
				.send("Ride Requested Successfully");
		} catch (err) {
			return next(err);
		}
	},

	async acceptRide(req: any, res: Response, next: NextFunction) {
		try {
			const { rideId, driverId } = req.body;

			await RideService.acceptRide({ rideId, driverId });
			return res.status(StatusCodes.OK).send("Ride Accepted Successfully");
		} catch (err) {
			return next(err);
		}
	},
};
