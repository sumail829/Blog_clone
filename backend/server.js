import express from "express";
import mongoose from "mongoose";
import cors from "cors"//only give access to its developer
import 'dotenv/config'

//server setup
const app = express();

//Middleware setup
app.use(express.json());
app.use(cors());

//Database connection

try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully");
} catch (error) {
    console.log("Database could not connect", error)
}


const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String, required: true },
});


const User = mongoose.model("User", userSchema);


//Users Routes(CRUD)

//create
app.post("/users", async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(409).json({
                message: `User already exist with  this email ${req.body.email}`
            })
        }
        const newUser = await new User(req.body).save();
        return res.status(200).json({
            message: "User created Successfully",
            newUser: newUser,
        })
    } catch (error) {
        console.log("something went wrong", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})




//listen 
app.listen(process.env.PORT, () => {
    console.log("Server is running on port",process.env.PORT);
})