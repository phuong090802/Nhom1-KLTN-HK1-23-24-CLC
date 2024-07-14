import React, { useContext } from "react";
import {
  Building2,
  Layers,
  CircleHelp,
  CircleUser,
  MessageCircleQuestion,
} from "lucide-react";
import { colors, darkModeCss } from "../../../constance";
import { DepheadHomeContext } from "./DepheadHomeStore";
import { DataContext } from "../../../store";
import clsx from "clsx";
import { modalName } from "./const";

export const Dashboard = () => {
  const { dashboardData, fieldSatisticData, setShowingModals } =
    useContext(DepheadHomeContext);
  const { darkMode } = useContext(DataContext);

  return (
    <div className="grid grid-cols-4 gap-4 ">
      <div
        className={clsx(
          "shadow-lg shadow-black50 rounded-xl border py-4 px-8 hover:bg-primary/10 cursor-pointer",
          darkMode && darkModeCss
        )}
        onClick={() => setShowingModals((prev) => [...prev, modalName.overDue])}
      >
        <CircleHelp size={24} color={colors.primary} />
        <h1 className="font-bold text-4xl text-primary mt-2">{1 || 0}</h1>
        <h1 className="text-primary">Câu hỏi</h1>
      </div>
      <div
        className={clsx(
          "shadow-lg shadow-black50 rounded-xl border py-4 px-8 hover:bg-primary/10 cursor-pointer",
          darkMode && darkModeCss
        )}
        onClick={() =>
          setShowingModals((prev) => [...prev, modalName.fieldStatistic])
        }
      >
        <Layers size={24} color={colors.warning} />
        <h1 className="font-bold text-4xl text-warning mt-2">
          {fieldSatisticData.length || 0}
        </h1>
        <h1 className="text-warning">Lĩnh vực</h1>
      </div>
      <div
        className={clsx(
          "shadow-lg shadow-black50 rounded-xl border py-4 px-8",
          darkMode && darkModeCss
        )}
      >
        <MessageCircleQuestion size={24} color={colors.success} />
        <h1 className="font-bold text-4xl text-success mt-2">
          {dashboardData?.countOfFAQs || 0}
        </h1>
        <h1 className="text-success">Câu hỏi chung</h1>
      </div>
      <div
        className={clsx(
          "shadow-lg shadow-black50 rounded-xl border py-4 px-8 hover:bg-primary/10 cursor-pointer",
          darkMode && darkModeCss
        )}
        onClick={() =>
          setShowingModals((prev) => [...prev, modalName.counsellorRanking])
        }
      >
        <CircleUser size={24} color={colors.error} />
        <h1 className="font-bold text-4xl text-error mt-2">
          {dashboardData?.countOfUsers || 0}
        </h1>
        <h1 className="text-error">Nhân viên</h1>
      </div>
    </div>
  );
};
