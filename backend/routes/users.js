import express from "express";
import  jwt  from "jsonwebtoken";
import bycript from "bcrypt";


const router = express.Router()


import { UserModel } from "../models/User.js";

router.post("/register", async (req,res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    if(user) {
        return res.status(400).json({
          messsage: "Username already exists"
        })
      }
      const hashedpassword = await bycript.hash(password,10);
      const newUser = new UserModel({username, password: hashedpassword})
      await newUser.save();
      res.json({ message: "User registed successfully"});
})



router.post("/login", async(req,res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({ username});

    if(!user) {
        return res.status(400).json({message: "Username or password is incorrect"});
    }
 
    const isPasswordValid = await bycript.compare(password, user.password)
    if(!isPasswordValid) {
        return res.status(400).json({message: "Username or password is incorrect"})
    }
    const token = jwt.sign({id: user._id }, "secret");
    res.json({ token, userID: user._id, username});
})

//updating user information
router.put("/update/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const { username, password } = req.body;
  
      // Find the user by their ID
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update the username and password
      user.username = username;
      user.password = await bycript.hash(password, 10); // Hash the new password
  
      // Save the updated user
      await user.save();
  
      res.json({ message: "Username and password updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

export {router as userRouter};