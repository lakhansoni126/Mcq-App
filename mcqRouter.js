import { Router } from "express";
import { getQuestion, submit } from "./mcqController.js";

const router = Router();

router.route("/quiz").get(getQuestion);
router.route("/submit").post(submit);

export default router;
