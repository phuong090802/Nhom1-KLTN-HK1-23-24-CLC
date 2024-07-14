import { PasswordChangeContent } from './PasswordChangeContent';
import { PasswordChangeStore } from './PasswordChangeStore';

const PasswordChange = () => {
  return (
    <PasswordChangeStore>
      <PasswordChangeContent />
    </PasswordChangeStore>
  );
};

export default PasswordChange;
