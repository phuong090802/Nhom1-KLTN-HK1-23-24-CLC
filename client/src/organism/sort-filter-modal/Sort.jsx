import { ArrowDownAZ, ArrowUpAz } from "lucide-react";
import { colors } from "../../constance";
import { useCallback, useMemo } from "react";

export const Sort = ({ label, onChange, value }) => {

  const icon = useMemo(() => {
    const props = {
      className: "ml-4 cursor-pointer",
      size: "24",
      color: colors.black75,
    };
    return value === 1 ? (
      <ArrowDownAZ {...props} onClick={onChange} />
    ) : (
      <ArrowUpAz {...props} onClick={onChange} />
    );
  }, [value, onChange]);



  return (
    <div className="flex font-semibold">
      <p>{label.key || "Lọc"}</p>
      {icon}
    </div>
  );
};
