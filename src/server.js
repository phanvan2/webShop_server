import  express  from "express";
import bodyParser from "body-parser";
import initRoutes  from "./routes/web"; 
import connectDB from "./config/connectDB";
const app = express();


connectDB();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }))

initRoutes(app);

app.listen(5000);

