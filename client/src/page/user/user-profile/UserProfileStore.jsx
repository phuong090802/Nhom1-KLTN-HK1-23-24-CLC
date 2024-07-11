import React, { createContext, useState } from "react";

export const UserProfileContext = createContext({
  hiddenAvatarModal: Boolean,
  setHiddenAvatarModal: Function,
});

export const UserProfileStore = ({ children }) => {
  const [hiddenAvatarModal, setHiddenAvatarModal] = useState(true);

  return (
    <UserProfileContext.Provider
      value={{ hiddenAvatarModal, setHiddenAvatarModal }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
