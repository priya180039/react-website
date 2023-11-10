import axios from "axios";

export const getThreads = async () => {
  try {
    const response = await axios.get("http://localhost:5000/threads");
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
