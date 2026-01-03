import { Router } from "express";
import storageController from "../controllers/storageController.js";

const storageRrouter = Router();

storageRrouter.get('/', storageController);

export default storageRrouter;