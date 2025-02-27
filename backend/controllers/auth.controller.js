import {User} from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail,sendWelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail } from '../mailtrap/emails.js';

export const signup = async (req,res) => {
    const {email,password,name} = req.body;
    try {
        if(!email || !password || !name) {
            throw new Error('All fields are required');
        }

        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({success:false,message:'User already exists!'});
        }

        if(password.length < 6) {
            return res.status(400).json({success:false,message:'Password is too short!'});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password:hashedPassword,
            name,
            verificationToken:verificationToken,
            verificationTokenExpiresAt:Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        })

        await user.save();

        generateTokenAndSetCookie(res,user._id);

        sendVerificationEmail(user.email,verificationToken);

        res.status(201).json({
            success:true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password:undefined
            }
        });


    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export const verifyEmail = async (req,res) => {
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt: {$gt:Date.now()}
        })

        if(!user) {
            return res.status(400).json({success:false,message:'Invalid or expired verification code'})
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email,user.name);

        res.status(200).json({
            success:true,
            message: "Email verified successfully",
          user: {
            ...user._doc,
            password: undefined,
          },
        });
    } catch (error) {
        console.log("error in verifyEmail",error);
        res.status(500).json({success:false,message:error.message});
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid) {
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        generateTokenAndSetCookie(res,user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password:undefined,
            },
        });

    } catch (error) {
        console.log("Error in login",error);
        res.status(400).json({success: false, message: error.message});
    }
}

export const logout = async (req,res) => {
    res.clearCookie("token");
    res.status(200).json({success:true,message:"Logged out successfully"});
}

export const forgotPassword = async (req,res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({success:false,message:"User not found"});
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({success:true,message:"Password reset link sent to your email!"});
    } catch (error) {
        console.log("Error in forgotPassword",error);
        res.status(400).json({success:false,message:error.message});
    }
}

export const resetPassword = async (req,res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpiresAt: {$gt:Date.now()},
        });

        if(!user) {
            return res.status(400).json({success:false,message:"Invalid or expired reset token"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({success:true,message:"Password reset successfully!"});
    } catch (error) {
        console.log("Error in resetPassword",error);
        res.status(400).json({success:false,message:error.message});
    }
}

export const checkVerify = async (req,res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success:false,message:"User is not found!"});
        }

        if(user.isVerified) {
            return res.status(200).json({success:true,message:"You are already verified!"});
        } else {
            const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
            sendVerificationEmail(user.email,verificationToken);
        }
    } catch (error) {
        console.log("Error in checkVerify",error);
        res.status(500).json({success:false,message:error.message});
    }
}