import { AdminNewsContent } from './AdminNewsContent';
import { AdminNewsProvider } from './AdminNewsProvider';

const AdminNews = () => {
  return (
    <AdminNewsProvider>
      <AdminNewsContent />
    </AdminNewsProvider>
  );
};

export default AdminNews;
