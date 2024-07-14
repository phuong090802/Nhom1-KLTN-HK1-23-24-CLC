import { UserProfileContent } from './UserProfileContent';
import { UserProfileStore } from './UserProfileStore';

const UserProfile = () => {
  return (
    <UserProfileStore>
      <UserProfileContent />
    </UserProfileStore>
  );
};

export default UserProfile;
