import axios from "axios";

export * from "./login";
export * from "./sign-up";

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
