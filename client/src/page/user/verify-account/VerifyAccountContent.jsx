import clsx from 'clsx';
import { UserRoundCheck } from 'lucide-react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import MyButton from '../../../atom/my-button';
import MyInput from '../../../atom/my-input';
import useTimer from '../../../hooks/useTimer';
import {
  requestVerifySv,
  verifyOtpSv,
} from '../../../service/user/userProfile.sv';
import { DataContext } from '../../../store/DataProvider';

export const VerifyAccountContent = () => {
  const { user } = useContext(DataContext);

  console.log(user);

  const [email, setEmail] = useState(user.email);

  const [otp, setOtp] = useState('');

  const [updating, setUpdating] = useState(false);

  const [step, setStep] = useState(1);

  const { startTimer, seconds } = useTimer(60);

  const requestVerify = async () => {
    try {
      const response = await requestVerifySv({ email });
      toast.success(response.message || 'Vui lòng kiểm tra hộp thư');
      setStep(2);
      startTimer();
    } catch (error) {
      toast.error(error?.message || 'Lỗi xảy ra');
    }
  };
  const verifyOtp = async () => {
    try {
      const response = await verifyOtpSv({ otp });
      toast.success(response.message || 'Xác thực tài khoản thành công');
      setStep(1);
    } catch (error) {
      toast.error(error?.message || 'Lỗi xảy ra');
    }
  };

  const formStep1Component = useMemo(() => {
    return (
      <>
        <div className="mt-4 px-4">
          <p className="font-bold text-primary text-xl mb-2">Email</p>
          <MyInput
            inputHeight={48}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!updating}
          />
        </div>
        <div className="mt-4 mb-4 flex flex-row-reverse px-4 gap-2">
          <MyButton
            className={clsx(
              updating
                ? 'bg-error hover:bg-error/75'
                : 'bg-primary hover:bg-primary/75'
            )}
            size={'lg'}
            onClick={() => setUpdating(!updating)}
          >
            {updating ? 'Hủy' : 'Chỉnh sửa email'}
          </MyButton>
          <MyButton
            className={clsx('bg-success hover:bg-success/75')}
            size={'lg'}
            onClick={requestVerify}
          >
            Xác thực email
          </MyButton>
        </div>
      </>
    );
  }, [email, updating]);

  const formStep2Component = useMemo(() => {
    return (
      <>
        <div className="mt-4 px-4">
          <p className="font-bold text-primary text-xl mb-2">OTP</p>
          <MyInput
            inputHeight={48}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <p className="text-sm text-black75">Thời gian còn: {seconds}s</p>
        </div>
        <div className="mt-4 mb-4 flex flex-row-reverse px-4 gap-2">
          <MyButton
            className={clsx('bg-primary hover:bg-primary/75')}
            size={'lg'}
            onClick={verifyOtp}
          >
            Xác nhận OTP
          </MyButton>
        </div>
      </>
    );
  }, [otp, seconds]);

  useEffect(() => {
    if (!updating) {
      setEmail(user.email);
    }
  }, [updating]);

  return (
    <div className="mt-2 mb-4">
      <div className="bg-white px-4 shadow-black50 shadow-lg py-4 rounded-2xl border">
        <div className="font-bold text-2xl mb-2 px-4 text-black75">
          {user.isEmailVerified ? (
            <p className="text-success  flex items-center gap-2">
              <UserRoundCheck />
              Đã xác thực tài khoản
            </p>
          ) : (
            <p className="">Xác thực tài khoản</p>
          )}
        </div>
        {user.isEmailVerified ? (
          <></>
        ) : step === 1 ? (
          formStep1Component
        ) : (
          formStep2Component
        )}
      </div>
    </div>
  );
};
