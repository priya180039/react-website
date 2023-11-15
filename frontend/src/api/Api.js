import axios from "axios";

export const getThreads = async () => {
  try {
    const response = await axios.get("http://localhost:5000/threads");
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

export const getThreadById = async (uuid) => {
  try {
    const response = await axios.get(`http://localhost:5000/threads/${uuid}`);
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export const getThreadsByUser = async () => {
  try {
    const response = await axios.get("http://localhost:5000/user-threads/");
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

export const getRepliesByUser = async () => {
  try {
    const response = await axios.get("http://localhost:5000/user-replies/");
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

export const getRepliesByThread = async (uuid) => {
  try {
    const response = await axios.get(`http://localhost:5000/replies/${uuid}`);
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export const getReplies = async () => {
  try {
    const response = await axios.get("http://localhost:5000/replies");
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

export const getAuth = async () => {
  try {
    const response = await axios.get("http://localhost:5000/login");
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

export const updateUser = async (uuid, user) => {
  try {
    console.log(uuid, user);
    const response = await axios.patch(
      `http://localhost:5000/users/${uuid}`,
      user
    );
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const registerUser = async (user) => {
  try {
    console.log(user);
    const response = await axios.post("http://localhost:5000/users", user);
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export const createPost = async (thread) => {
  try {
    console.log(thread);
    const response = await axios.post("http://localhost:5000/threads", thread);
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export const addReply = async (reply) => {
  try {
    const response = await axios.post("http://localhost:5000/replies", reply);
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export const editReply = async (uuid, reply) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/replies/${uuid}`,
      reply
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export const deleteReply = async (uuid) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/replies/${uuid}`
    );
    return response;
  } catch (err) {
    return err.response.data;
  }
};
