import express from "express";
import UserController from "../controllers/UserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateUserRequest } from "../middleware/validation";

const router = express.Router();

router.post("/", jwtCheck ,UserController.create);
router.put("/", 
    jwtCheck,
    jwtParse,
    validateUserRequest,
    UserController.update
);
router.get("/", jwtCheck,jwtParse, UserController.getOne);

export default router;