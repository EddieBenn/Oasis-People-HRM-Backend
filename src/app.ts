import express, {Request, Response} from "express";
import dotenv from "dotenv";
import { database } from "./configurations";
import bodyParser from "body-parser";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes/employeeRoutes";
import hrRoutes from "./routes/hrRoutes/hrRoutes";


const app = express();

dotenv.config();

//middlewares
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/employee', employeeRoutes);
app.use('/admin', hrRoutes);

//database connection
database();


app.get("/", (request: Request, response: Response) => {
    response.send("Oasis HRM is Ready...:)");
  });


//server
app.listen(process.env.PORT, () => {
    console.log(`server running on Port ${process.env.PORT}`);
});