import { ReactNode } from "react";

export interface iContextValue {
  user: iUser;
  setUser: Function;
  isLoggedIn: Boolean;
  setIsLoggedIn: Function;
  removeUserData: Function;
  darkMode: Boolean;
  setDarkMode: Function;
}

export interface iUser {
  avatar: string | null;
  departmentName: string | null;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  _id: string;
  isEmailVerified: boolean;
}

export interface iDataProviderProps {
  children: ReactNode | string;
}
