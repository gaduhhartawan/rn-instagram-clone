import { USERS } from "./users";
export const POSTS = [
  {
    imageUrl:
      "https://tse2.mm.bing.net/th?id=OIP.8Ona2TS2ZyX21AxuCwihTwHaE8&pid=Api&P=0",
    user: USERS[1].user,
    likes: 2150,
    caption: "Rainin in new york..",
    profilePict: USERS[1].image,
    comments: [
      {
        user: USERS[0].user,
        comment: "Cookin in new york",
      },
      {
        user: "lethalshooter_",
        comment: "chef curry!!!",
      },
    ],
  },
  {
    imageUrl:
      "https://tse1.mm.bing.net/th?id=OIP.lduFiU8Zjqwk5tzMboEAvgHaE8&pid=Api&P=0",
    user: USERS[3].user,
    likes: 1102,
    caption: "Good concert in Jakarta...",
    profilePict: USERS[3].image,
    comments: [
      {
        user: "anjayani_",
        comment: "Thx for comin:))",
      },
      {
        user: "gataumales",
        comment: "simply beauty!!!",
      },
    ],
  },
  {
    imageUrl:
      "https://tse2.mm.bing.net/th?id=OIP.hanfPkMl_cxwkX8T2eadYwHaHK&pid=Api&P=0",
    user: USERS[2].user,
    likes: 150,
    caption: "Hahay papale",
    profilePict: USERS[2].image,
    comments: [
      {
        user: USERS[0].user,
        comment: "Mainnya hebat!",
      },
    ],
  },
];
