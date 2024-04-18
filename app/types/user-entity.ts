import type { BaseEntity } from "./base-entity";

export type UserEntity = BaseEntity & {
  username: string;
  name: string | null;
  phoneNumber: string | null;
  lastLogin: string | null;
  isAdmin: boolean;
};
