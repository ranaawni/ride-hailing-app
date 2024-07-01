import { UserResolver } from "./resolver/userResolver";
import { RideResolver } from "./resolver/rideResolver";
import {
	validateRideRequest,
	validateAcceptRide,
	validateRigesterUser,
} from "./common/validator";
const router = require("express").Router();

router.post("/users/register", validateRigesterUser, UserResolver.registerUser);

router.post("/rides/request", validateRideRequest, RideResolver.requestRide);

router.post("/rides/accept", validateAcceptRide, RideResolver.acceptRide);
module.exports.router = router;
