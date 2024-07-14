import { AdmiNewsContent } from './AdmiNewsContent';
import { AdminNewsStore } from './AdminNewsStore';

const AdminNews = () => {
  return (
    <AdminNewsStore>
      <AdmiNewsContent />
    </AdminNewsStore>
  );
};

export default AdminNews;
