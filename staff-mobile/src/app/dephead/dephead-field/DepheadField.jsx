import { Text } from "react-native";
import { DepheadFieldProvider } from "./DepheadFieldProvider";
import { DepheadFieldContent } from "./DepheadFieldContent";

const DepheadField = () => {
  return (
    <DepheadFieldProvider>
      <DepheadFieldContent />
    </DepheadFieldProvider>
  );
};

export default DepheadField;
