import {
  CircleChevronDown,
  CircleChevronUp,
  LockKeyholeOpen,
  LockKeyhole,
  Pencil,
  Trash2,
  Info,
} from "lucide-react";
import default_avatar from "../../assets/image/default_avatar.png";
import MyButton from "../../atom/my-button";
import { useContext, useMemo } from "react";
import clsx from "clsx";
import { darkModeCss } from "../../constance";
import { DataContext } from "../../store";

const ItemLayout = ({
  children,
  infor,
  text,
  image,
  isSelected,
  status,
  onExpand,
  onStatus,
  onEdit,
  onDelete,
  onInfor,
  extraInforComponent,
  
}) => {
  const { darkMode } = useContext(DataContext);
  const inforButton = useMemo(() => {
    const props = {
      className: "bg-primary hover:bg-primary/75 duration-500",
      size: "icon",
    };
    return (
      <MyButton {...props} onClick={onInfor}>
        <Info color="#fff" />
      </MyButton>
    );
  }, [onInfor]);
  const editButton = useMemo(() => {
    const props = {
      className: "bg-warning hover:bg-warning/75 duration-500",
      size: "icon",
    };
    return (
      <MyButton {...props} onClick={onEdit}>
        <Pencil color="#fff" />
      </MyButton>
    );
  }, [onEdit]);
  const deleteButton = useMemo(() => {
    const props = {
      className: "bg-error hover:bg-error/75 duration-500",
      size: "icon",
    };
    return (
      <MyButton {...props} onClick={onDelete}>
        <Trash2 color="#fff" />
      </MyButton>
    );
  }, [onDelete]);
  const statusButton = useMemo(() => {
    const props = {
      className: status
        ? "bg-success hover:bg-success/75 duration-500"
        : "bg-error hover:bg-error/75 duration-500",
      size: "icon",
    };
    return (
      <MyButton {...props} onClick={onStatus}>
        {status ? (
          <LockKeyholeOpen color="#fff" />
        ) : (
          <LockKeyhole color="#fff" />
        )}
      </MyButton>
    );
  }, [status, onStatus]);

  const expandButton = useMemo(() => {
    return (
      <MyButton
        className="bg-primary hover:bg-primary/75 duration-500"
        size="icon"
        onClick={onExpand}
      >
        {isSelected ? (
          <CircleChevronUp color="#fff" className="" />
        ) : (
          <CircleChevronDown color="#fff" />
        )}
      </MyButton>
    );
  }, [isSelected]);

  return (
    <div
      className={clsx(
        "px-4 shadow-black50 shadow-lg py-4 rounded-2xl",
        darkMode ? darkModeCss : "bg-white"
      )}
    >
      <div className=" flex justify-between">
        <div className="flex items-center gap-2">
          {image !== undefined && (
            <img
              src={image || default_avatar}
              alt="user avatar"
              className="w-12 h-12 border-2 border-primary rounded-2xl"
            />
          )}
          <div>
            <h1
              className={clsx(
                "font-bold text-black75 text-lg",
                darkMode && darkModeCss
              )}
            >
              {text}
            </h1>
            {infor && (
              <div className="w-full flex flex-row gap-2">
                {infor.map((inf) => (
                  <p
                    key={inf}
                    className="bg-light_gray/75 text-xs px-1 rounded-md text-black75"
                  >
                    {inf}
                  </p>
                ))}
              </div>
            )}
            {extraInforComponent && extraInforComponent}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onEdit && editButton}
          {onInfor && inforButton}
          {status !== undefined && statusButton}
          {onExpand && expandButton}
          {onDelete && deleteButton}
        </div>
      </div>
      <div
        className={`${
          isSelected ? `max-h-[400px]` : "max-h-0"
        } overflow-hidden duration-700 `}
      >
        <span className="block border mt-2"></span>
        {children}
      </div>
    </div>
  );
};
export default ItemLayout;
