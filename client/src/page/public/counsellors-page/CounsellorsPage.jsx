import { CounsellorPageContent } from "./CounsellorPageContent";
import { CounsellorPageStore } from "./CounsellorPageStore";
import { TemporyCounsellorPageUi } from "./TemporyCounsellorPageUi";

const CounsellorsPage = () => {
  return (
    <CounsellorPageStore>
      <CounsellorPageContent />
      {/* <TemporyCounsellorPageUi /> */}
    </CounsellorPageStore>
  );
};
export default CounsellorsPage;
