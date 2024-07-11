import { DepheadHomeContent } from "./DepheadHomeContent";
import { DepheadHomeStore } from "./DepheadHomeStore";

const DepheadHome = () => {
  return (
    <DepheadHomeStore>
      <DepheadHomeContent />
    </DepheadHomeStore>
  );
};

export default DepheadHome;
