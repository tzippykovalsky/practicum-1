import express from "express";
import * as userController from "./userController.js";


const router = express.Router();

router.get("/",  userController.getUser);
router.post("/", userController.addUser);
router.put("/",userController.updateUser);
router.delete("/",userController.deleteUser);

export default router;


