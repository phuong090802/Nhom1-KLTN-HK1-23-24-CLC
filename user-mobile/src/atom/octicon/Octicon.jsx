import Octicons from '@expo/vector-icons/Octicons';

const Octicon = ({ name, size, color }) => {
  return <Octicons name={name} size={size || 24} color={color || '#000'} />;
};

export default Octicon;
