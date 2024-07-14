import { ForgotPasswordContent } from './ForgotPasswordContent';
import { ForgotPasswordStore } from './ForgotPasswordStore';

const ForgotPassword = () => {
  return (
    <ForgotPasswordStore>
      <ForgotPasswordContent />
    </ForgotPasswordStore>
  );
};

export default ForgotPassword;
