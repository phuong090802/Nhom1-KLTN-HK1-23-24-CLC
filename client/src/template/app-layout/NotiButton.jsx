import { Bell } from "lucide-react";
import { DataContext } from "../../store";
import { useContext } from "react";
import clsx from "clsx";
import { AppLayoutContext } from "./AppLayoutStore";
import { convertDateTimeToDate } from "../../util/convert.util";

export const NotiButton = () => {
  const { user, darkMode, newNoti, setNewNoti } = useContext(DataContext);

  const { showingModal, setShowingModal, notifications } =
    useContext(AppLayoutContext);

  const handleClick = () => {
    if (showingModal === "noti") {
      setShowingModal("");
    } else {
      setNewNoti(false);
      setShowingModal("noti");
    }
  };

  return (
    <div className="relative">
      <div
        className={clsx(
          "w-10 h-10 flex justify-center items-center rounded-full bg-black10 cursor-pointer",
          darkMode && "bg-white/10"
        )}
      >
        <button className="cursor-pointer relative" onClick={handleClick}>
          <Bell />
          {newNoti && (
            <span className="border-red-500 border-[4px] inline-block absolute rounded-full -top-0 right-[2px]" />
          )}
        </button>
      </div>
      <div
        className={clsx(
          "w-96 max-h-[80vh] border bg-white rounded-lg absolute z-10 -right-2 py-4 overflow-y-auto cursor-pointer",
          showingModal !== "noti" && "hidden"
        )}
      >
        <h1 className="text-2xl font-bold text-black75 mb-4 px-4">Thông báo</h1>
        {notifications.length !== 0 ? (
          notifications.map((notification, index) => (
            <Notification
              key={notification._id}
              createdAt={notification.createdAt}
              content={notification.content}
            />
          ))
        ) : (
          <div className="flex justify-center items-center pb-6 text-lg text-black50">
            Chưa có thông báo nào
          </div>
        )}
      </div>
    </div>
  );
};

const Notification = ({ createdAt, content }) => {
  return (
    <div className="mx-2 my-1 p-4 shadow-lg border rounded-lg">
      <div className="text-sm text-gray-500">
        {convertDateTimeToDate(createdAt)}
      </div>
      <div className="mt-2 text-gray-700">{content}</div>
    </div>
  );
};
