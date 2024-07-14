import default_avatar from '../../assets/image/default_avatar.png';
import MyButton from '../../atom/my-button';

export const HomeHeader = () => {
  return (
    <div className="px-4 py-4 rounded-xl shadow-black50 shadow-lg mt-2 border">
      <div className="flex w-full gap-2 items-center">
        <img
          src={default_avatar}
          alt="user_avatar"
          className="w-12 h-12 rounded-2xl border-2 border-primary"
        />
        <div className="px-4 py-2 bg-light_gray rounded-lg flex-1">
          <p className="text-black75">Bạn có thắc mắc!?</p>
        </div>
        <MyButton className="bg-primary hover:bg-primary/75" size={'md'}>
          <p className="font-bold">Đặt câu hỏi</p>
        </MyButton>
      </div>
    </div>
  );
};
