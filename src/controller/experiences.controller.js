import prisma from "../config/prisma.config.js";

export const getExperiences = async (req, res) => {
  try {
    const result = await prisma.experience.findMany({
      select: {
        id: true,
        experienceName: true,
        location: true,
        description: true,
        price: true,
        imageUrl: true,
      },
      orderBy: { location: "asc" },
    });

    if (result.length > 0) {
      return res.status(200).json({
        message: "All the Experinces retrived successfully",
        data: result,
      });
    }

    res.status(404).json({ message: "No Experiences found", data: [] });
  } catch (error) {
    console.error("Server Side Error fetching experiences: ", error.message);
    return res.status(500).json({ message: "Error retrieving experiences." });
  }
};

export const getExperiencesDetails = async (req, res) => {
  try {
    const experienceId = parseInt(req.params.id);

    if (isNaN(experienceId) || !experienceId) {
      return res
        .status(404)
        .json({ message: "Experince Id is missing or Invalid" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Sets to midnight local time

    const result = await prisma.experience.findUnique({
      where: {
        id: experienceId,
      },
      include: {
        slots: {
          select: {
            experienceId: true,
            date: true,
            time: true,
            avaliableSlots: true,
            totalSlots: true,
          },
        },
      },
    });

    if (!result)
      return res
        .status(404)
        .json({ message: "Experience Details not found", data: [] });

    console.log("original: ", result);

    return res.status(200).json({
      message: "Experience data retrived successfully",
      data: result,
    });
  } catch (error) {
    console.error(
      "Server Side Error fetching Experience Details: ",
      error.message
    );
    return res
      .status(500)
      .json({ message: "Error retriving Experience Details" });
  }
};
