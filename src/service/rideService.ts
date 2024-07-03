import { StatusCodes } from "http-status-codes";
import {
	RideRepository,
	UserRepository,
} from "ride-hailing-entities/build/src/database/repositories";
import { AppError } from "../common/AppError";
import _ from "lodash";
import { RideStatus } from "ride-hailing-entities/build/src/database/entities/ride";
import { UserRole } from "ride-hailing-entities/build/src/database/entities/user";

export const RideService = {
	requestRide: async ({
		riderId,
		source,
		destination,
	}: {
		riderId: number;
		source: string;
		destination: string;
	}) => {
		const rider = await UserRepository.findOne({
			where: { id: riderId, role: UserRole.RIDER },
		});
		if (!rider) {
			throw new AppError({
				httpCode: StatusCodes.BAD_REQUEST,
				description: "User is not a rider.",
			});
		}

		const existingRide = await RideRepository.findOne({
			where: { riderId, status: RideStatus.REQUESTED },
		});
		if (existingRide) {
			throw new AppError({
				httpCode: StatusCodes.BAD_REQUEST,
				description: "You already have an ongoing ride request.",
			});
		}

		const ride = RideRepository.create({
			riderId,
			source,
			destination,
			status: RideStatus.REQUESTED,
		});

		const requestedRide = await RideRepository.save(ride);
		return requestedRide;
	},

	acceptRide: async ({
		rideId,
		driverId,
	}: {
		rideId: number;
		driverId: number;
	}) => {
		const driver = await UserRepository.findOne({
			where: { id: driverId, role: UserRole.DRIVER },
		});

		if (!driver) {
			throw new AppError({
				httpCode: StatusCodes.NOT_FOUND,
				description: "User is not a driver.",
			});
		}

		const ride = await RideRepository.findOne({
			where: { id: rideId, status: RideStatus.REQUESTED },
		});

		if (!ride) {
			throw new AppError({
				httpCode: StatusCodes.NOT_FOUND,
				description: "Ride not found or already accepted",
			});
		}

		ride.driverId = driverId;
		ride.status = RideStatus.ACCEPTED;

		await RideRepository.save(ride);
	},
};
