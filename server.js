const express = require("express")
const dotenv = require("dotenv");
const connectDB = require("./DB/db");
const userRoutes = require("./Routes/userRoutes");
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");
const cors = require("cors")

dotenv.config();

connectDB()
const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is Running")
});

app.use("/api/user", userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server Running at ${PORT}`))