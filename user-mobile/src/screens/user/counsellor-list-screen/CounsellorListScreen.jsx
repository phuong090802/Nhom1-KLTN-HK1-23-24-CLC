import { CounsellorListContent } from "./CounsellorListContent";
import { CounsellorListStore } from "./CounsellorListStore";

const CounsellorListScreen = () => {
  return (
    <CounsellorListStore>
      <CounsellorListContent />
    </CounsellorListStore>
  );
};

export default CounsellorListScreen;
