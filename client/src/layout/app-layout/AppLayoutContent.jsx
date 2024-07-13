import clsx from "clsx";
import React, { useContext } from "react";
import { darkModeCss } from "../../constance";
import { DataContext } from "../../store/DataProvider";
import { AppHeader } from "./AppHeader";
import { MessageBox } from "./MessageBox";

export const AppLayoutContent = () => {
  return (
    <>
      <AppHeader />
      <MessageBox />
    </>
  );
};
