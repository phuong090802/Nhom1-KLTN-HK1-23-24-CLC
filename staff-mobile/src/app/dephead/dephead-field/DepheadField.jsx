import { DepheadFieldContent } from './DepheadFieldContent';
import { DepheadFieldProvider } from './DepheadFieldProvider';

const DepheadField = () => {
  return (
    <DepheadFieldProvider>
      <DepheadFieldContent />
    </DepheadFieldProvider>
  );
};

export default DepheadField;
