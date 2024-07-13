import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../../../constance';
import MyIcon from '../../atomic/my-icon';
import { SearchModal } from './SearchModal';

const Search = ({ params, setParams }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <SearchModal
        visible={visible}
        onClose={() => setVisible(false)}
        params={params}
        setParams={setParams}
      />
      <TouchableOpacity activeOpacity={0.4} onPress={() => setVisible(true)}>
        <MyIcon
          iconPackage="Ionicons"
          name={'search'}
          size={32}
          color={colors.black75}
        />
      </TouchableOpacity>
    </>
  );
};

export default Search;
