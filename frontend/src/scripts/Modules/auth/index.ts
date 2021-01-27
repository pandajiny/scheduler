import axios from "axios";
import { getCookie } from "../DocumnetModules";

export * from "./login";
export * from "./signup";

export const getUser = async (): Promise<User | null> => {
  const user = await axios
    .get<User>(`/auth/user`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return null;
    });
  return user;
};
