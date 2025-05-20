import { Router } from "express";
import user from "./user.js";

const router = Router();

router.use('/', user);

export default router;