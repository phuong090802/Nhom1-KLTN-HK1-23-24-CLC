import { VerifyAccountContent } from './VerifyAccountContent';
import { VerifyAccountStore } from './VerifyAccountStore';

const VerifyAccount = () => {
  return (
    <VerifyAccountStore>
      <VerifyAccountContent />
    </VerifyAccountStore>
  );
};

export default VerifyAccount;
