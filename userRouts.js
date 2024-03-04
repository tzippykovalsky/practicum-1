import express from "express";
import * as userController from "./userControler.js";


const router = express.Router();

router.get("/:id",  userController.getUserById);
router.post("/", userController.addUser);
router.put("/:id",userController.updateUser);
router.delete("/:id",userController.deleteUser);

export default router;


