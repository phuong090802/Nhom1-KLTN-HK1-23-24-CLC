import React, { useState } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

const ModalLayout2 = ({ hidden, setHidden, children, text, onClose }) => {
  return (
    !hidden && (
      <div
        className={clsx(
          "fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-black10 shadow-lg shadow-black50 z-10"
        )}
      >
        <div className="bg-white rounded-2xl min-w-52 p-4 animate-slide-up">
          <div className="flex w-full justify-between items-center">
            <p className="font-semibold text-lg">{text || ""}</p>
            <div
              className="rounded-full bg-light_gray p-1 cursor-pointer hover:bg-light_gray/75"
              onClick={!!onClose ? onClose : () => setHidden(true)}
            >
              <X />
            </div>
          </div>
          <div className="mt-1 overflow-y-auto max-h-[80vh] max-w-[80vw]">{children}</div>
        </div>
      </div>
    )
  );
};

export default ModalLayout2;
