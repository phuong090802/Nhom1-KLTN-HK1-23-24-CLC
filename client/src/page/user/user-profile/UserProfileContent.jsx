import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import default_avatar from '../../../assets/image/default_avatar.png';
import MyButton from '../../../atom/my-button';
import MyInput from '../../../atom/my-input';
import MySelect from '../../../atom/my-select';
import { updateProfileSv } from '../../../service/user/userProfile.sv';
import { DataContext } from '../../../store/DataProvider';
import { getRoleName } from '../../../util/user.util';
import { occupationData } from './constance';
import { UserAvatarModal } from './UserAvatarModal';
import { UserProfileContext } from './UserProfileStore';

export const UserProfileContent = () => {
  const { user, setUser } = useContext(DataContext);

  const { setHiddenAvatarModal } = useContext(UserProfileContext);

  const [profileData, setProfileData] = useState({
    fullName: user.fullName,
    occupation: user.occupation,
  });

  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!updating)
      setProfileData({
        fullName: user.fullName,
        occupation: user.occupation,
      });
  }, [updating]);

  const updateProfile = async () => {
    try {
      const response = await updateProfileSv(profileData);
      toast.success(response.message || 'Cập nhật thông tin thành công');
      setUser((prev) => ({ ...prev, ...profileData }));
      setUpdating(false);
    } catch (error) {
      toast.success(error?.message || 'Lỗi khi cập nhật thông tin');
    }
  };

  // handleDataChange
  const handleFullNameChange = (value) => {
    setProfileData((prev) => ({ ...prev, fullName: value }));
  };
  const handleOccupationChange = (value) => {
    setProfileData((prev) => ({ ...prev, occupation: value }));
  };

  return (
    <>
      <UserAvatarModal />
      <div className="mt-2 mb-4">
        <div className="bg-white px-4 shadow-black50 shadow-lg py-4 rounded-2xl border">
          <p className="font-bold text-2xl mb-2 px-4 text-black75">
            Thông tin cá nhân
          </p>
          <div className="mt-4 px-4 flex gap-2">
            <img
              src={user?.avatar || default_avatar}
              alt="user avatar"
              className="size-20 border-2 rounded-md border-primary"
            />
            <button
              className="text-lg text-primary hover:text-primary/75 font-semibold"
              onClick={() => setHiddenAvatarModal(false)}
            >
              Đổi ảnh đại diện
            </button>
          </div>
          <div className="mt-4 px-4">
            <p className="font-bold text-primary text-xl mb-2">Họ & Tên</p>
            <MyInput
              inputHeight={48}
              value={profileData.fullName}
              disabled={!updating}
              className={clsx(updating && 'border-black')}
              onChange={(e) => handleFullNameChange(e.target.value)}
            />
          </div>
          <div className="mt-4 px-4">
            <p className="font-bold text-primary text-xl mb-2">Công việc</p>
            <MySelect
              value={profileData.occupation}
              disabled={!updating}
              className={clsx(
                'w-full border-black20',
                updating && 'border-black'
              )}
              boxHeight={48}
              data={occupationData}
              onChange={handleOccupationChange}
            />
          </div>
          <div className="mt-4 px-4">
            <p className="font-bold text-primary text-xl mb-2">Email</p>
            <MyInput inputHeight={48} value={user.email} disabled />
          </div>
          <div className="mt-4 px-4">
            <p className="font-bold text-primary text-xl mb-2">Số điện thoại</p>
            <MyInput inputHeight={48} value={user.phoneNumber} disabled />
          </div>
          <div className="mt-4 px-4">
            <p className="font-bold text-primary text-xl mb-2">Chức vụ</p>
            <MyInput inputHeight={48} value={getRoleName(user.role)} disabled />
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
              {updating ? 'Hủy' : 'Chỉnh sửa'}
            </MyButton>
            <MyButton
              className={clsx('bg-success hover:bg-success/75')}
              size={'lg'}
              onClick={updateProfile}
              hidden={!updating}
            >
              Cập nhật
            </MyButton>
          </div>
        </div>
      </div>
    </>
  );
};
