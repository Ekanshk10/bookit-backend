import { Router } from "express";
import { getPromoCodes, promoValidate } from "../controller/promo.controller.js";

const router = Router();

router.get("/promo", getPromoCodes);
router.post('/promo/validate', promoValidate);

export default router;