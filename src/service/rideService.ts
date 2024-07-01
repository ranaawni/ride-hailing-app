import { StatusCodes } from "http-status-codes";
import { RideRepository, UserRepository } from "ride-hailing-entities/build/src/database/repositories";
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
        source: string
        destination: string;
      }) => {

        if (_.isEmpty(source)) {
          throw new AppError({
            httpCode: StatusCodes.BAD_REQUEST,
            description: "Source field required and can't be empty",
          });
        }

        if (!riderId) {
            throw new AppError({
              httpCode: StatusCodes.BAD_REQUEST,
              description: "Rider field required and can't be empty",
            });
          }
    

        const existingRide = await RideRepository.findOne({ where: { riderId, status: RideStatus.REQUESTED } });
        if (existingRide) {
            throw new AppError({
                httpCode: StatusCodes.BAD_REQUEST,
                description: "You already have an ongoing ride request."
            });
        }

        const rider = await UserRepository.findOne({ where: { id: riderId, role: UserRole.RIDER } });
        if (!rider) {
            throw new AppError({
                httpCode: StatusCodes.BAD_REQUEST,
                description: "Rider ID does not exist or user is not a rider."
            });
        } 

        const ride = RideRepository.create({
          riderId,
          source,
          destination,
          status: RideStatus.REQUESTED
        })
    
        await RideRepository.save(ride);
      },

    acceptRide: async ({
        rideId,
        driverId,
      }: {
        rideId: number;
        driverId: number;
      }) => {
        const ride = await RideRepository.findOne({ where: { id: rideId, status: RideStatus.REQUESTED } });

        if(!rideId || !driverId) {
          throw new AppError({
            httpCode: StatusCodes.BAD_REQUEST,
            description: "Ride id or driver id is empty",
          });

        }
    
        if (!ride) {
          throw new AppError({
            httpCode: StatusCodes.NOT_FOUND,
            description: "Ride not found or already accepted",
          });
        }

        const driver = await UserRepository.findOne({ where: { id: driverId, role: UserRole.DRIVER } });
        if (!driver) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                description: "Driver does not exist or user is not a driver."
            });
        } 

       
    
        ride.driverId = driverId;
        ride.status = RideStatus.ACCEPTED;
    
        await RideRepository.save(ride);
      },

}
