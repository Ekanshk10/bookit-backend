import { Router } from "express";
import { getExperiences, getExperiencesDetails } from "../controller/experiences.controller.js";

const router =  Router()

router.get("/experiences", getExperiences);
router.get("/experiences/:id", getExperiencesDetails);

export default router;