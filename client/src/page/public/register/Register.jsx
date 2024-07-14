import { RegisterContent } from './RegisterContent';
import { RegisterStore } from './RegisterStore';

const Register = () => {
  return (
    <RegisterStore>
      <RegisterContent />
    </RegisterStore>
  );
};
export default Register;
