import User from "../models/UserModel.js";
import argon2 from "argon2";
import { Sequelize } from "sequelize";

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['uuid', [Sequelize.literal('CONCAT(firstName, " ", lastName)'), 'name'], 'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'firstName', 'lastName', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password, confPassword, role } = req.body;
    if (password !== confPassword) return res.status(500).json({ msg: "Password dan Confirm Password tidak cocok" })
    const hashPassword = await argon2.hash(password);

    try {
        await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({ msg: "User Registered" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    const { firstName, lastName, email, password, confPassword, role } = req.body;
    let hashPassword, tempFirst, tempLast, tempEmail;
    if (password === "" || password === null) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(500).json({ msg: "Password dan Confirm Password tidak cocok" })

    if (firstName === "" || firstName === null) {
        tempFirst = user.firstName
    } else {
        tempFirst = firstName;
    }
    
    if (lastName === "" || lastName === null) {
        tempLast = user.lastName
    } else {
        tempLast = lastName;
    }
    
    if (email === "" || email === null) {
        tempEmail = user.email
    } else {
        tempEmail = email;
    }
    
    try {
        await User.update({
            firstName: tempFirst,
            lastName: tempLast,
            email: tempEmail,
            password: hashPassword,
            role: user.role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    try {
        await User.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}