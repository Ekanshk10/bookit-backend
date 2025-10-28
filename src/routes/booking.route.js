import { Router } from "express";
import { createBooking } from "../controller/booking.controller.js";

const router = Router();

router.post("/bookings", createBooking);

export default router;