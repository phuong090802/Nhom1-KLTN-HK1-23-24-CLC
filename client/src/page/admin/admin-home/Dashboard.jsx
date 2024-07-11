import React, { useContext } from "react";
import { Building2, Layers, CircleHelp, CircleUser } from "lucide-react";
import { colors, darkModeCss } from "../../../constance";
import { AdminHomeContext } from "./AdminHomeStore";
import { DataContext } from "../../../store";
import clsx from "clsx";

export const Dashboard = () => {
  const { dashboardData, setHiddenDepStatistic } = useContext(AdminHomeContext);
  const { darkMode } = useContext(DataContext);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div
        className={clsx(
          "shadow-lg shadow-black50 rounded-xl border py-4 px-8 hover:bg-primary/10 cursor-pointer",
          darkMode && darkModeCss
        )}
        onClick={() => setHiddenDepStatistic(false)}
      >
        <Building2 size={24} color={colors.primary} />
        <h1 className="font-bold text-4xl text-primary mt-2">
          {dashboardData?.countOfDepartments || 0}
        </h1>
        <h1 className="text-primary">Khoa</h1>
      </div>
      <div
        className={clsx(
          "shadow-lg shadow-black50 rounded-xl border py-4 px-8",
          darkMode && darkModeCss
        )}
      >
        <Layers size={24} color={colors.warning} />
        <h1 className="font-bold text-4xl text-warning mt-2">
          {dashboardData?.countOfFields || 0}
        </h1>
        <h1 className="text-warning">Lĩnh vực</h1>
      </div>
      <div
        className={clsx(
          "shadow-lg shadow-black50 rounded-xl border py-4 px-8",
          darkMode && darkModeCss
        )}
      >
        <CircleHelp size={24} color={colors.success} />
        <h1 className="font-bold text-4xl text-success mt-2">
          {dashboardData?.countOfQuestions || 0}
        </h1>
        <h1 className="text-success">Câu hỏi</h1>
      </div>
      <div
        className={clsx(
          "shadow-lg shadow-black50 rounded-xl border py-4 px-8",
          darkMode && darkModeCss
        )}
      >
        <CircleUser size={24} color={colors.error} />
        <h1 className="font-bold text-4xl text-error mt-2">
          {dashboardData?.countOfUsers || 0}
        </h1>
        <h1 className="text-error">Người dùng</h1>
      </div>
    </div>
  );
};

// const { connected, counsellorSocket } = useCounsellorSocket();
// const [file, setFile] = useState();

// console.log(isConnected);

// function handleFileChange(event) {
//   const file = event.target.files[0];
//   console.log(file);
//   if (!isSupportedMimeType([...mimetype.image, ...mimetype.image], file)) {
//     console.log("Định dạng file không hợp lệ");
//   }

//   if (!isSupportFileSize(2 * 1024 * 1024, file)) {
//     console.log("Kích thước file phải không quá 2MB");
//   }
//   setFile(file);
// }

// async function handleSendAnswer() {
//   if (isConnected) {
//     const answer = {
//       content: 'Đây là nộ dung câu trả lời',
//       file: {
//         buffer: file || null,
//         size: file ? file.size : null,
//         mimetype: file ? file.type : null,
//         originalname: file ? file.name : null,
//       },
//       questionId: '65e9b9f3ea250cc123780dce',
//     };
//     const res = await handleCreateAnswer(answer);
//     console.log(res);
//   } else {
//     console.log('socket is not connected');
//   }
// }
