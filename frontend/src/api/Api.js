import axios from "axios";

export const getThreads = async () => {
  try {
    const response = await axios.get("http://localhost:5000/threads");
    return response;
  } catch (err) {
    console.log(err.message);
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
