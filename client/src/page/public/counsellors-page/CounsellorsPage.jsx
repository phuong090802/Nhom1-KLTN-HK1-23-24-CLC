import { CounsellorPageContent } from "./CounsellorPageContent";
import { CounsellorPageStore } from "./CounsellorPageStore";

const CounsellorsPage = () => {
  return (
    <CounsellorPageStore>
      <CounsellorPageContent />
    </CounsellorPageStore>
  );
};
export default CounsellorsPage;
