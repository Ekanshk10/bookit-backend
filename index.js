import  express  from "express";
import cors from "cors"
import "dotenv/config";
import prisma from "./src/config/prisma.config.js"

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, async()=>{
    try{
    await prisma.$connect();
    console.log("DATABASE IS CONNECTED SUCCESSFULLY")
    console.log("SERVER IS RUNNING ON PORT: ", PORT);

    }catch(error){
        console.log("ERROR IN STARTING SERVER: ", error)
    }
})