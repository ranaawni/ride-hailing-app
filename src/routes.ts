import { UserResolver } from "./resolver/userResolver";
const router = require("express").Router();

router.post(
    "/users/register",
    UserResolver.registerUser
);

module.exports.router = router;
