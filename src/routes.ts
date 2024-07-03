import { UserResolver } from "./resolver/userResolver";
import { RideResolver } from "./resolver/rideResolver";
import {
	validateRideRequest,
	validateAcceptRide,
	validateRigesterUser,
	validateUserLogin
} from "./common/validator";
import {verifyToken} from "./common/authMiddelware"
const router = require("express").Router();

router.post("/users/register", validateRigesterUser, UserResolver.registerUser);
router.post("/login", validateUserLogin, UserResolver.loginUser);

router.post("/rides/request", verifyToken, validateRideRequest, RideResolver.requestRide);

router.post("/rides/accept", verifyToken, validateAcceptRide, RideResolver.acceptRide);
module.exports.router = router;
