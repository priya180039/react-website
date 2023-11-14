import Thread from "../models/ThreadModel.js";
import User from "../models/UserModel.js";
import { Sequelize } from "sequelize";

export const getThreads = async (req, res) => {
  try {
    const response = await Thread.findAll({
      attributes: ["id", "uuid", "title", "content", "tags", "solved"],
      include: [
        {
          model: User,
          attributes: [
            "id",
            [Sequelize.literal('CONCAT(firstName, " ", lastName)'), "name"],
            "email",
            "role",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getThreadById = async (req, res) => {
  try {
    const threadId = req.params.id;
    const response = await Thread.findOne({
      attributes: [
        "id",
        "uuid",
        "userId",
        "title",
        "content",
        "tags",
        "solved",
      ],
      include: [
        {
          model: User,
          attributes: [
            "id",
            [Sequelize.literal('CONCAT(firstName, " ", lastName)'), "name"],
            "email",
          ],
        },
      ],
      where: {
        uuid: threadId,
      },
    });

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ msg: "Thread tidak ada" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getThreadByUser = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: [
        "id",
        [Sequelize.literal('CONCAT(firstName, " ", lastName)'), "name"],
        "email",
      ],
      where: {
        id: req.userId,
      },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ada" });
    const response = await Thread.findAll({
      attributes: [
        "id",
        "uuid",
        "userId",
        "title",
        "content",
        "tags",
        "solved",
        "createdAt",
      ],
      include: [
        {
          model: User,
          attributes: [
            "id",
            "uuid",
            [Sequelize.literal('CONCAT(firstName, " ", lastName)'), "name"],
            "email",
          ],
        },
      ],
      where: {
        userId: user.id,
      },
    });

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ msg: "Thread tidak ada" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getThreadByTag = async (req, res) => {
  try {
    const threadTag = req.params.tag;
    const response = await Thread.findAll({
      attributes: [
        "id",
        "uuid",
        "userId",
        "title",
        "content",
        "tags",
        "solved",
      ],
      include: [
        {
          model: User,
          attributes: [
            "id",
            "uuid",
            [Sequelize.literal('CONCAT(firstName, " ", lastName)'), "name"],
            "email",
          ],
        },
      ],
      where: {
        tags: {
          [Sequelize.Op.like]: "%${threadTag}%",
        },
      },
    });

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ msg: "Thread tidak ada" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const createThread = async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    await Thread.create({
      userId: req.userId,
      title: title,
      content: content,
      tags: tags,
      solved: false,
    });
    res.status(201).json({ msg: "Thread Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateThread = async (req, res) => {
  const { title, content, tags, solved } = req.body;
  const thread = await Thread.findOne({
    where: {
      userId: req.userId,
      uuid: req.params.id,
    },
  });
  if (!thread)
    return res.status(404).json({ msg: "Anda tidak ada thread ini" });
  const threadId = req.params.id;
  try {
    await Thread.update(
      {
        title: title,
        content: content,
        tags: tags,
        solved: solved,
      },
      {
        where: {
          uuid: threadId,
        },
      }
    );

    res.status(200).json({ msg: "Thread Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteThread = async (req, res) => {
  const thread = await Thread.findOne({
    where: {
      uuid: req.params.id,
      userId: req.userId,
    },
  });
  if (!thread)
    return res.status(400).json({ msg: "Anda tidak ada thread ini" });
  const threadId = req.params.id;
  try {
    await Thread.destroy({
      where: {
        uuid: threadId,
      },
    });
    res.status(200).json({ msg: "Thread Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
