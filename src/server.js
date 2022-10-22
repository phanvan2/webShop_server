import  express  from "express";
import cors  from "cors";
import bodyParser from "body-parser";
import initRoutes  from "./routes/web"; 
import connectDB from "./config/connectDB";

const app = express()
const port = 5000;

app.use(cors());

connectDB();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }))

initRoutes(app);

app.listen(port);

