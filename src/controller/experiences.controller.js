import prisma from "../config/prisma.config.js";

export const getExperiences = async (req, res) => {
  try {
    const result = await prisma.experience.findMany({
      select: {
        id: true,
        location: true,
        state: true,
        description: true,
        price: true,
        imageUrl: true,
      },
      orderBy: { location: "asc" },
    });

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: "All the Experinces retrived successfully",
        data: result,
      });
    }

    res
      .status(404)
      .json({ success: false, message: "No Experiences found", data: [] });
  } catch (error) {
    console.error("Server Side Error fetching experiences", error);
    return res
      .status(500)
      .json({ success: false, message: "Error retrieving experiences." });
  }
};

export const getExperiencesDetails = async (req, res) => {
  try {
    const experienceId = parseInt(req.params.id);

    if (isNaN(experienceId) || !experienceId) {
      return res
        .status(404)
        .json({ success: false, message: "Experince Id is missing or Invalid" });
    }

    const result = await prisma.experience.findUnique({
      where: {
        id: experienceId,
      },
    });

    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Experience Details not found", data: [] });

    return res.status(200).json({
      success: true,
      message: "Experience data retrived successfully",
      data: result,
    });
  } catch (error) {
    console.error(
      "Server Side Error fetching Experience Details",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Error retriving Experience Details" });
  }
};
