import React from "react";
import { UserProfileStore } from "./UserProfileStore";
import { UserProfileContent } from "./UserProfileContent";

const UserProfile = () => {
  return (
    <UserProfileStore>
      <UserProfileContent />
    </UserProfileStore>
  );
};

export default UserProfile;
