import express from "express";
import mongoose from "mongoose";
import cors from "cors"//only give access to its developer
import 'dotenv/config'
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary'
const upload = multer({ dest: 'uploads/' })

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

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

const articleSchema = new mongoose.Schema({
    autherEmail: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: { type: String },

})


const User = mongoose.model("User", userSchema);
const Article = mongoose.model("Article", articleSchema);


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

// Read all users

app.get("/users", async (req, res) => {
    try {
        const fetchUsers = await User.find();
        return res.status(200).json({
            message: "fetched all user success",
            users: fetchUsers,
        })

    } catch (error) {
        console.log("something went wrong", error);
        return res.status(500).json({
            message: "Internal server error"
        })

    }
})

//Read a single user

app.get("/users/:id", async (req, res) => {
    try {
        const fetchUser = await User.findById(req.params.id)
        return res.status(200).json({
            message: "fetched single user success",
            users: fetchUser,
        })

    } catch (error) {
        console.log("something went wrong", error);
        return res.status(500).json({
            message: "Internal server error"
        })

    }
})

//Update the user
app.patch("/users/:id", async (req, res) => {
    try {
        const userExist = await User.findById(req.params.id);
        if (!userExist) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const updataedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })  //new true update the new value
        return res.status(200).json({
            message: "User success successfully"

        })


    } catch (error) {
        console.log("something went wrong", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

//Delete a user

app.delete("/users/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "user not found" })
        }

        return res.status(200).json({
            message: "user deleted succesfully",
            user: deletedUser,
        })

    } catch (error) {
        console.log("something went wrong", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

//Article CRUD

//Create Article

app.post("/articles", upload.single('thumbnail'), async (req, res) => {
    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
        console.log(cloudinaryResponse, "cloudinary REsponse");

        const createArticle = await new Article({ ...req.body, thumbnail: cloudinaryResponse.secure_url }).save();
        return res.status(200).json({
            message: "Article cerated successfully",
            data: createArticle,
        })

    } catch (error) {
        console.log("something went wrong", error)
        return res.status(500).json({ message: "Internal server error" })

    }
})

app.get("/articles", async (req, res) => {
    try {
        const fetchArticles = await Article.find();
        return res.status(200).json({
            message: "Article fetched successfully",
            article: fetchArticles,
        })

    } catch (error) {
        console.log("something went wrong", error)
        return res.status(500).json({ message: "Internal server error" })

    }

}
)
// get one user
app.get("/articles/:id", async (req, res) => {
    try {
        const fetchSingleArticles = await Article.findById(req.params.id);
        return res.status(200).json({
            message: "Single Rticle fetched successfully",
            article: fetchSingleArticles,
        })

    } catch (error) {
        console.log("something went wrong", error)
        return res.status(500).json({ message: "Internal server error" })

    }

}
)

app.patch("/articles/:id", upload.single('thumbnail'), async (req, res) => {
    try {
        if (req.file) {
            const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
            console.log(cloudinaryResponse, "cloudinary REsponse")

            const updateArticle = await Article.findByIdAndUpdate(req.params.id, { ...req.body, thumbnail: cloudinaryResponse.secure_url }, { new: true });
            if (!updateArticle) {
                return res.status(404).json({ message: "Article not found" })
            }
            return res.status(200).json({
                message: "Article updated successfully",
                article: updateArticle
            })
        }

        const updateArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateArticle) {
            return res.status(404).json({ message: "Article not found" })
        }
        return res.status(200).json({
            message: "Article updated successfully",
            article: updateArticle
        })

    } catch (error) {
        console.log("something went wrong", error)
        return res.status(500).json({ message: "Internal server error" })

    }
}
)

app.delete("/articles/:id", async (req, res) => {
    try {
        const deleteArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deleteArticle) {
            return res.status(404).json({ message: "article not found" })
        }
        return res.status(200).json({ message: "Article deleted successfully", article: deleteArticle })

    } catch (error) {
        console.log("something went wrong", error)
        return res.status(500).json({ message: "Internal server error" })
    }
})



//listen 
app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
})