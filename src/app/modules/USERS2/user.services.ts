import ApiError from "../../../error/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserServices = async (user: IUser): Promise<IUser | null> => {
//   console.log(user, "from services");

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, "Failed to create new User");
  }
  return createdUser;
  //   return user;
};

export const UserServices = { createUserServices };
