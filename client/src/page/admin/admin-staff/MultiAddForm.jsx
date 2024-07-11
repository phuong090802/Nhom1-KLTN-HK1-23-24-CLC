import { FileInput } from "lucide-react";
import React, { useState } from "react";
import MyFileInput from "../../../atom/my-file-input";
import MyButton from "../../../atom/my-button/MyButton";
import { importStaffSv } from "../../../service/admin/adminUser.sv";
import { toast } from "sonner";

export const MultiAddForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (fileData) => {
    setFile(fileData);
  };

  const handleUploadFile = async () => {
    try {
      const submitData = new FormData();
      submitData.append("file", file);
      const response = await importStaffSv(submitData);
      toast.success(response.message || "Tải file lên thành công");
      setFile(null);
    } catch (error) {
      toast.error(error.message || "Lỗi khi tải file lên");
    }
  };

  return (
    <>
      <MyFileInput accept="text/csv" value={file} onChange={handleFileChange} />
      <MyButton
        className="bg-primary hover:bg-primary/75 mt-2"
        size={"fullWidth"}
        onClick={handleUploadFile}
      >
        Tải lên
      </MyButton>
    </>
  );
};
