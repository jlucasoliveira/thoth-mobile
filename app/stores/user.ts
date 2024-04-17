/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { create } from "zustand";

type User = unknown;

type UserStore = {
  user: User;
  isLoggedIn: boolean;
  token?: string;
  setUser: (user: User) => void;
  removeUser: () => void;
  setToken: (token: string) => void;
  removeToken: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  token: undefined,
  user: {} as User,
  isLoggedIn: false,
  removeToken: () => {
    set((state) => ({ ...state, token: undefined, isLoggedIn: false }));
  },
  removeUser: () => {
    set((state) => ({ ...state, user: {} as User, isLoggedIn: false }));
  },
  setIsLoggedIn: (isLoggedIn: boolean) => {
    set((state) => ({ ...state, isLoggedIn }));
  },
  setToken: (token: string) => {
    set((state) => ({ ...state, token }));
  },
  setUser: (user: User) => {
    set((state) => ({ ...state, user }));
  },
}));
