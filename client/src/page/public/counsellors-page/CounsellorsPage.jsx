import { CounsellorPageContent } from './CounsellorPageContent';
import { CounsellorPageStore } from './CounsellorPageStore';

const CounsellorsPage = () => {
  return (
    <CounsellorPageStore>
      <CounsellorPageContent />
      {/* <TemporyCounsellorPageUi /> */}
    </CounsellorPageStore>
  );
};
export default CounsellorsPage;
