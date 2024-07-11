import React from "react";
import TitleBar from "../../../molecule/title-bar";
import default_avatar from "../../../assets/image/default_avatar.png";
import "./FlipCard.css";

export const TemporyCounsellorPageUi = () => {
  return (
    <div className="mt-2">
      <TitleBar
        title={"Danh sách tư vấn viên"}
        // setParams={setParams}
        // sortFilterData={sortFilterData}
      />
      <div className="mt-2 grid grid-cols-3 gap-4">
        <div className="w-full flex items-center justify-center">
          <div className="max-w-xs rounded-lg overflow-hidden border shadow-lg w-52 h-[15rem]">
            {/* Mặt trước của thẻ */}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front p-2">
                  <img
                    className="w-full rounded-lg"
                    src={default_avatar}
                    alt="Sunset in the mountains"
                  />
                  <p className="font-bold text-lg leading-5 mt-2 text-gray-900">
                    Trần Nhật Hào
                  </p>
                </div>
                <div className="flip-card-back">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                      Thông tin chi tiết
                    </div>
                    <div className="text-left">
                      <table>
                        <tbody>
                          <tr>
                            <td className="whitespace-no-wrap">
                              <p className="text-sm leading-5 text-gray-900">
                                Email:
                              </p>
                            </td>
                            <td className="whitespace-no-wrap truncate">
                              <p className="text-sm leading-5 text-gray-900">
                                example@example.commmm
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td className="whitespace-no-wrap">
                              <p className="text-sm leading-5 text-gray-900">
                                Sđt:
                              </p>
                            </td>
                            <td className="whitespace-no-wrap">
                              <p className="text-sm leading-5 text-gray-900">
                                0123456789
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td className="whitespace-no-wrap">
                              <p className="text-sm leading-5 text-gray-900">
                                Khoa
                              </p>
                            </td>
                            <td className="whitespace-no-wrap">
                              <p className="text-sm leading-5 text-gray-900">
                                Khoa CNTT
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td className="whitespace-no-wrap">
                              <p className="text-sm leading-5 text-gray-900">
                                Chức vụ:
                              </p>
                            </td>
                            <td className="whitespace-no-wrap">
                              <p className="text-sm leading-5 text-gray-900">
                                Khoa CNTT
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
