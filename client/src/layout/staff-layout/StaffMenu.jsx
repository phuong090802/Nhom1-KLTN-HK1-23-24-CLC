import clsx from "clsx";
import Cookies from "js-cookie";
import {
  CircleHelp,
  ClipboardCheck,
  KeySquare,
  Layers,
  Layers2,
  LayoutDashboard,
  LogOut,
  MessageCircleQuestion,
  MessageCircleReply,
  Newspaper,
  ShieldCheck,
  SquareUser,
  Store,
  Users,
} from "lucide-react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import default_avatar from "../../assets/image/default_avatar.png";
import { colors, darkModeCss, links } from "../../constance";
import { logoutSv } from "../../service/public/auth.sv";
import { DataContext } from "../../store/DataProvider";

export const StaffMenu = () => {
  const { user, removeUserData, darkMode } = useContext(DataContext);
  const navigate = useNavigate();

  const itemList = {
    USER: [
      {
        title: "Thông tin người dùng",
        link: links.user.profile,
        icon: <SquareUser color={darkMode ? "#fff" : colors.primary} />,
      },
      {
        title: "Đổi mật khẩu",
        link: links.user.passwordChange,
        icon: <KeySquare color={darkMode ? "#fff" : colors.primary} />,
      },
      {
        title: "Xác thực tài khoản",
        link: links.user.verify,
        icon: <ShieldCheck color={darkMode ? "#fff" : colors.primary} />,
      },
    ],
    COUNSELLOR: [
      // {
      //   title: "Dashboard",
      //   link: links.counsellor.home,
      //   icon: <LayoutDashboard color={darkMode ? "#fff" : colors.primary} />,
      // },
      {
        title: "Danh sách câu hỏi",
        link: links.counsellor.questions,
        icon: <CircleHelp color={darkMode ? "#fff" : colors.primary} />,
      },
      {
        title: "Phản hồi từ trưởng khoa",
        link: links.counsellor.feedback,
        icon: <MessageCircleReply color={darkMode ? "#fff" : colors.primary} />,
      },
    ],
    DEPARTMENT_HEAD: [
      {
        title: "Dashboard",
        link: links.dephead.home,
        icon: <LayoutDashboard color={darkMode ? "#fff" : colors.primary} />,
      },
      {
        title: "Danh sách câu hỏi",
        link: links.dephead.questions,
        icon: <CircleHelp color={darkMode ? "#fff" : colors.primary} />,
      },
      {
        title: "Quản lý lĩnh vực",
        link: links.dephead.fields,
        icon: <Layers color={darkMode ? "#fff" : colors.primary} />,
      },
      {
        title: "Quản lý nhân sự",
        link: links.dephead.staffs,
        icon: <Users color={darkMode ? "#fff" : colors.primary} />,
      },
      {
        title: "Quản lý FAQs",
        link: links.dephead.faqs,
        icon: (
          <MessageCircleQuestion color={darkMode ? "#fff" : colors.primary} />
        ),
      },
      {
        title: "Duyệt câu trả lời",
        link: links.dephead.answers,
        icon: <ClipboardCheck color={darkMode ? "#fff" : colors.primary} />,
      },
    ],
    ADMIN: [
      {
        title: "Dashboard",
        link: links.admin.home,
        icon: <LayoutDashboard color={darkMode ? "#fff" : colors.primary} />,
      },
      {
        title: "Quản lý khoa",
        link: links.admin.department,
        icon: <Store color={darkMode ? "#fff" : colors.primary} />,
      },
      {
        title: "Quản lý nhân sự",
        link: links.admin.staffs,
        icon: <Users color={darkMode ? "#fff" : colors.primary} />,
      },
      {
        title: "Quản lý tin tức",
        link: links.admin.news,
        icon: <Newspaper color={darkMode ? "#fff" : colors.primary} />,
      },
      {
        title: "Lĩnh vực chung",
        link: links.admin.fields,
        icon: <Layers2 color={colors.primary} />,
      },
    ],
    SUPERVISOR: [
      {
        title: "Thống kê",
        link: links.supervisor.home,
        icon: <LayoutDashboard color={darkMode ? "#fff" : colors.primary} />,
      },
    ],
  };

  const handleLogout = async () => {
    try {
      const response = await logoutSv();
      Cookies.remove("accessToken");
      // Cookies.remove("isLoggedIn");
      removeUserData();
      toast.success(response.message || "Đăng xuất thành công");
      navigate(links.public.home);
    } catch (error) {
      toast.error(error?.message || "Đăng xuất không thành công");
    }
  };

  return (
    <div
      className={clsx(
        "pt-4 rounded-xl shadow-black50 shadow-lg min-h-[90vh] border overflow-hidden",
        darkMode && darkModeCss
      )}
    >
      <div className="flex w-full gap-2 items-center flex-col h-full justify-between">
        <div className="w-full px-4 flex flex-col gap-4">
          <div className="py-2 px-4 flex items-center gap-2 bg-primary/20 rounded-xl">
            <img
              src={user?.avatar || default_avatar}
              alt="user_avatar"
              className="w-12 h-12 rounded-full"
            />
            <div className="w-3/4 break-words">
              <p className="font-bold ">{user.fullName}</p>
              <p className="text-xs text-ellipsis">
                {user?.department?.departmentName}
              </p>
            </div>
          </div>
          {itemList.USER.map((item) => {
            return (
              <MenuButton
                key={item.link}
                icon={item.icon}
                text={item.title}
                link={item.link}
              />
            );
          })}
          <span className="border"></span>
          {user.role &&
            user.role !== "USER" &&
            itemList[user.role].map((item) => {
              return (
                <MenuButton
                  key={item.link}
                  icon={item.icon}
                  text={item.title}
                  link={item.link}
                />
              );
            })}
        </div>
        <div className="w-full">
          <div className="mx-4 py-2 mb-2 border-y border-primary/20 ">
            <LogoutButton onClick={handleLogout} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuButton = ({ icon, text, link }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="flex items-center gap-2 w-full px-2 py-1 rounded-xl hover:text-primary duration-300 cursor-pointer font-semibold"
      onClick={() => navigate(link)}
    >
      {icon}
      <p
        className={clsx(
          link === location?.pathname && "text-primary underline"
        )}
      >
        {text}
      </p>
    </div>
  );
};

const LogoutButton = ({ onClick, darkMode }) => {
  return (
    <div
      className="flex items-center gap-2 w-full px-2 py-1 rounded-xl hover:text-primary duration-300 cursor-pointer font-semibold"
      onClick={onClick}
    >
      <LogOut color={darkMode ? "#fff" : colors.primary} />
      <p>Đăng xuất</p>
    </div>
  );
};
