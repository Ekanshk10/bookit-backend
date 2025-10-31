import express from "express";
import cors from "cors";
import "dotenv/config";
import prisma from "./src/config/prisma.config.js";
import experienceRoute from "./src/routes/experiences.route.js";
import bookingRoute from "./src/routes/booking.route.js";
import promoRoute from "./src/routes/promo.route.js";
import experienceRoutes from "./src/routes/experienceRoutes.route.js"
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", experienceRoute);
app.use("/api", bookingRoute);
app.use("/api", promoRoute);
app.use("/api", experienceRoutes);

const PORT = process.env.PORT || 1002;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("DATABASE IS CONNECTED SUCCESSFULLY");

    app.listen(PORT, () => {
      console.log("SERVER IS RUNNING ON PORT: ", PORT);
    });
  } catch (error) {
    console.error("ERROR IN STARTING SERVER:", error);
    process.exit(1);
  }
};

startServer();
