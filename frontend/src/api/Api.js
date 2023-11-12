import axios from "axios";

export const getThreads = async () => {
  try {
    const response = await axios.get("http://localhost:5000/threads");
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
