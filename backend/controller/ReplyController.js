import Reply from "../models/ReplyModel.js";
import User from "../models/UserModel.js";
import Thread from "../models/ThreadModel.js";
import { Sequelize } from "sequelize";

export const getReplies = async (req, res) => {
  try {
    const response = await Reply.findAll({
      attributes: ["id", "uuid", "reply"],
      include: [
        {
          model: User,
          attributes: [
            "id",
            [Sequelize.literal('CONCAT(firstName, " ", lastName)'), "name"],
            "email",
          ],
        },
        {
          model: Thread,
          attributes: ["id", "title", "content"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getRepliesByUser = async (req, res) => {
  try {
    const response = await Reply.findAll({
      attributes: ["id", "uuid", "reply", "createdAt"],
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
        {
          model: Thread,
          attributes: ["id", "uuid", "title", "content"],
        },
      ],
      where: {
        userId: req.userId,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getRepliesByThread = async (req, res) => {
  try {
    const thread = await Thread.findOne({
      attributes: ["id", "uuid", "title", "content"],
      include: [
        {
          model: User,
          attributes: [
            "id",
            "uuid",
            [Sequelize.literal('CONCAT(firstName, " ", lastName)'), "name"],
          ],
        },
      ],
      where: {
        uuid: req.params.id,
      },
    });
    if (!thread) return res.status(404).json({ msg: "Thread tidak ada" });
    const response = await Reply.findAll({
      attributes: ["id", "uuid", "userId", "threadId", "reply"],
      include: [
        {
          model: User,
          attributes: [
            "id",
            "uuid",
            [Sequelize.literal('CONCAT(firstName, " ", lastName)'), "name"],
            "role",
          ],
        },
      ],
      where: {
        threadId: thread.id,
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

export const createReply = async (req, res) => {
  const { threadId, reply } = req.body;
  try {
    await Reply.create({
      userId: req.userId,
      threadId: threadId,
      reply: reply,
    });
    res.status(201).json({ msg: "Reply Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateReply = async (req, res) => {
  const reply = await Reply.findOne({
    where: {
      uuid: req.params.id,
      userId: req.userId,
    },
  });
  if (!reply) return res.status(400).json({ msg: "Anda tidak ada reply ini" });

  try {
    const { threadId, reply } = req.body;
    const replyId = req.params.id;
    await Reply.update(
      {
        threadId: threadId,
        reply: reply,
      },
      {
        where: {
          uuid: replyId,
        },
      }
    );

    res.status(200).json({ msg: "Reply Updated" });
  } catch (error) {
    console.log("err");
    console.log(error.message);
  }
};

export const deleteReply = async (req, res) => {
  const reply = await Reply.findOne({
    where: {
      uuid: req.params.id,
      userId: req.userId,
    },
  });
  if (!reply) return res.status(400).json({ msg: "Anda tidak ada reply ini" });
  try {
    const replyId = req.params.id;
    await Reply.destroy({
      where: {
        uuid: replyId,
      },
    });
    res.status(200).json({ msg: "Reply Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
