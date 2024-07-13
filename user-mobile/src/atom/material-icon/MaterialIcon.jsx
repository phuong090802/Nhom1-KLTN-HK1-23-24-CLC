import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const MaterialIcon = ({ name, size, color }) => {
  return (
    <MaterialIcons name={name} size={size || 24} color={color || '#000'} />
  );
};

export default MaterialIcon;
