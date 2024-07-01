import { UserResolver } from "./resolver/userResolver";
import { RideResolver } from "./resolver/rideResolver";
const router = require("express").Router();

router.post(
    "/users/register",
    UserResolver.registerUser
);

router.post(
    "/rides/request",
    RideResolver.requestRide
)

router.post(
    "/rides/accept",
    RideResolver.acceptRide
)
module.exports.router = router;
