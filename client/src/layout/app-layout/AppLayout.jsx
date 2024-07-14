import { Toaster } from 'sonner';
import { AppLayoutContent } from './AppLayoutContent';
import { AppLayoutStore } from './AppLayoutStore';

const AppLayout = ({ children }) => {
  return (
    <AppLayoutStore>
      <AppLayoutContent />
      <Toaster position="bottom-right" duration={5000} richColors closeButton />
      {children}
    </AppLayoutStore>
  );
};

export default AppLayout;
