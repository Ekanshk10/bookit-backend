import prisma from "../config/prisma.config.js";
import { parse } from "date-fns";

export const createBooking = async (req, res) => {
  try {
    const {
      name,
      email,
      codeId,
      bookingDate,
      finalPrice,
      exprienceId,
      slotTime,
      slotDate,
      quantity,
    } = req.body.data;

    if (
      !name ||
      !email ||
      !bookingDate ||
      !finalPrice ||
      !exprienceId ||
      !slotTime ||
      !slotDate
    )
      return res.status(404).json({ message: "Booking data is incomplete" });

    const nameRegex = /^[A-Za-z\s]{2,}$/;
    if (!nameRegex.test(name.trim())) {
      return res.status(400).json({
        message:
          "Name should contain only letters and spaces (min 2 characters)",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }
    // Created Tracsactoin to manage slots and user registration to the database
    const bookingResult = await prisma.$transaction(async (tx) => {
      let user = await tx.user.findUnique({
        where: { userEmail: email },
        select: { id: true },
      });

      if (!user) {
        user = await tx.user.create({
          data: { userName: name, userEmail: email },
          select: { id: true },
        });
      }

      console.log("slottime: ", slotTime);

      const parsedDate = new Date(slotDate);
      console.log("slotDate input:", slotDate, typeof slotDate);
      console.log("parsedDate:", parsedDate);
      console.log("slotTime:", slotTime);

      let slot = await tx.slot.findFirst({
        where: {
          experienceId: exprienceId,
          date: parsedDate,
          time: slotTime,
        },
      });

      if (!slot) {
        slot = await tx.slot.create({
          data: {
            experienceId: exprienceId,
            date: parsedDate,
            time: slotTime,
            avaliableSlots: 10,
          },
        });
      }

      if (slot.avaliableSlots <= 0)
        throw new Error("No available slots left for this time");

      const existingBooking = await tx.booking.findUnique({
        where: {
          userId_slotId: {
            userId: user.id,
            slotId: slot.id,
          },
        },
      });

      if (existingBooking) throw new Error("You already booked this slot");

      const booking = await tx.booking.create({
        data: {
          userId: user.id,
          slotId: slot.id,
          promoCodeId: codeId || null,
          finalPrice,
        },
      });

      await tx.slot.update({
        where: { id: slot.id },
        data: { avaliableSlots: { decrement: quantity } },
      });

      return booking;
    });

    res.status(201).json({
      success: true,
      msg: "Booking created successfully",
      data: bookingResult,
    });
  } catch (error) {
    console.error(error);
    if (
      error.message === "You already booked this slot" ||
      error.message === "No available slots left for this time"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
};
