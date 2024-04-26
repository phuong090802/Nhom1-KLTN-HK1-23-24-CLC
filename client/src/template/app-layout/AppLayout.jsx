import React from "react";
import { AppLayoutStore } from "./AppLayoutStore";
import { AppLayoutContent } from "./AppLayoutContent";
import { Toaster } from "sonner";

const AppLayout = ({ children }) => {
  return (
    <AppLayoutStore>
      <AppLayoutContent />
      <Toaster position="top-right" duration={5000} richColors closeButton />
      {children}
    </AppLayoutStore>
  );
};

export default AppLayout;
