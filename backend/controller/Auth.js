import User from "../models/UserModel.js";
import argon2 from "argon2";
import { Sequelize } from "sequelize";

export const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ message: "Password salah" });
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.firstName + " " + user.lastName;
    const email = user.email;
    const role = user.role;
    res.status(200).json({ uuid, name, email, role });
  } catch (e) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }
};

export const Authentication = async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "Mohon login ke akun anda" });
  const user = await User.findOne({
    attributes: ["uuid", "firstName", "lastName", "email", "role", "createdAt"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  res.status(200).json({ user });
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ message: "Tidak dapat logout" });
    res.status(200).json({ message: "Anda telah logout" });
  });
};
