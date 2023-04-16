import axios from "axios";

export const getRole = async (email: any, setAdmin: Function) => {
  const url = `http://localhost:3000/api/personal?email=${email}`;
  const User = await axios.get(url);
  if (User.data.payload.role === "admin") {
    return setAdmin(true);
  } else {
    return setAdmin(false);
  }
};
