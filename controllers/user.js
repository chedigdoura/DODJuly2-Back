import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";
import bcrypt from "bcryptjs";

const secretKey = "MyGomycodeFinalProject";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: "user doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "password is incorrect" });
    }
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      secretKey
    );
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName} `,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secretKey);
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};
