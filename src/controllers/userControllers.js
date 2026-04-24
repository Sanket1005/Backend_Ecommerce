import User from "../Models/userModels.js";
import bcrypt from"bcryptjs";
import { genSalt } from "bcryptjs";

export const signUp = async (req, res) => {
    try{
        const { name, email, password, number } = req.body;
        const existingUser = await User.find({
            $or: [{ email }, { number }]
          });

        if (existingUser.length > 0) {
            res.status(400).json({message: "user already exist"});
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            number,
            password: hashedPassword,


        });
        await newUser.save();

        res.status(201).
        json({ nessage: "user created succesfully", user: newUser});
    } catch (error) {
        console.error ("error signing up user:", error);
        res.status(500).json({message: "internal server error"});

    }
};

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await  User.findOne({email});

        if(!user) {
            return res.status(400) .jsaon({ messsge:"User not Found"});
        }
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
    return res.status(400).json({ message: "invalied credentials"});
}

res.status(200).json({
    message: "Login successful",

});

} catch (error) {
console.error("error logging in:", error);
res.status(500).json({ message: "internal server error" });
}
};

