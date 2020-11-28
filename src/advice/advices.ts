import { User } from "../model/user.model";

export interface Advice {
  title: string;
  body: string;
  isApplicable: (user: User) => boolean;
}

export const advices: Advice[] = [
  {
    title: "Red meat?",
    body:
      "Do you know that eating one meal with red meat means producing over means producing over 30 kg of CO2?",
    isApplicable: (user) => user.redMeatPerWeek > 1,
  },
  {
    title: "Choose other meat than white",
    body:
      "Eating white meat instead of red one can reduce produced CO2 amount about three times?",
    isApplicable: (user) => user.redMeatPerWeek > 1,
  },
  {
    title: "Vegetables for the win!",
    body:
      "Choose vegetables - world without eating meat would be much more eco-friendly",
    isApplicable: (user) =>
      user.redMeatPerWeek + user.whiteMeatPerWeek + user.fishPerWeek > 3,
  },
  {
    title: "Doing great! Try some more vegetables :)",
    body:
      "You are doing great choosing other meats than the red one! If you want to be even better, prefer vegetables!",
    isApplicable: (user) =>
      user.redMeatPerWeek == 0 && user.whiteMeatPerWeek + user.fishPerWeek > 0,
  },
  {
    title: "Vegetables - YES!",
    body:
      "Do you know that producing vegetables is much more eco-friendly than meat?",
    isApplicable: () => true,
  },
];
