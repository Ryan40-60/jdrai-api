import { roles } from "../../../config/enum.config.js";

export const userSeedData = [
  {
    id: "23bfdbaa-0dd1-41a5-9893-ec3153cb6b49",
    role: roles.ADMIN,
    username: "admin",
    mail: "admin@admin.com",
    password: "admin",
  },
  {
    id: "9b746f99-2596-4b59-ae39-884e18934bd6",
    role: roles.USER,
    username: "user",
    mail: "user@user.com",
    password: "user",
  },
];
