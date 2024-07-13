import Layout from '../../../template/layout/Layout';
import { AskedQuestionContent } from './AskedQuestionContent';
import { AskedQuestionStore } from './AskedQuestionStore';

const AskedQuestionScreen = () => {
  return (
    <AskedQuestionStore>
      <Layout>
        <AskedQuestionContent />
      </Layout>
    </AskedQuestionStore>
  );
};

export default AskedQuestionScreen;
