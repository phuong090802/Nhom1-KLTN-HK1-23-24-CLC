import { StaffMenu } from "./StaffMenu";
import { TextPanel } from "./TextPanel";

const StaffLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-4 p-2 gap-2">
      <div className="flex flex-col gap-1">
        <StaffMenu />
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
};

export default StaffLayout;
