import express from "express";
import prisma from "../config/prisma.config.js";


const router = express.Router();

router.post("/seed-experiences", async (req, res) => {
  try {
    const experiences = req.body;

    if (!Array.isArray(experiences)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an array of experiences",
      });
    }

    const formattedData = experiences.map((exp) => ({
      experienceName: exp.location, 
      location: exp.state,        
      description: exp.description,
      price: Number(exp.price),
      imageUrl: exp.imageUrl,
      about: exp.about,
    }));

    await prisma.experience.createMany({
      data: formattedData,
      skipDuplicates: true, 
    });

    res.status(201).json({
      success: true,
      message: "Experiences inserted successfully!",
    });
  } catch (error) {
    console.error(error);
    
    res.status(500).json({
      success: false,
      message: "Error inserting experiences",
      error: error.message,
    });
  }
});

export default router;
