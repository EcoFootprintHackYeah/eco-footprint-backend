import { Advice, advices } from "./advices";
import { User } from "../model/user.model";

const randomElement = <T>(list: T[]): T => {
  return list[Math.floor(Math.random() * list.length)];
};

export const getAdviceForUser = (user: User): Advice => {
  return randomElement(advices.filter((a) => a.isApplicable(user)));
};
