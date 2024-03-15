import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import Logger from "../helpers/logger.js";

export const registerController = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    //validations

    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      email,
      password: hashedPassword,
      role: role || 0,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
    Logger.info(`Authenticating user: ${email}`);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
    };
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    let token = JWT.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user = user.toObject(); // converting user to object to store TOKEN
    user.token = token; // store TOKEN in user object
    user.password = undefined; // hide password

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // expiry of cookie = 3 days
      httpOnly: true, // only accessible for server
    };
    res.cookie("Cookie", token, options).status(200).json({
      // inserting TOKEN in cookie
      success: true,
      token,
      user,
      message: "User Logged in successfully",
    });
    Logger.info(`Authorizing user ${user.email} to access`);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }

    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
    Logger.info(`Password reset for user: ${email}`);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
    Logger.info(`Testing user: ${req.user.email}`);
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
