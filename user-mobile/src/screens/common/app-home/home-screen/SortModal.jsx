import { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, fonts } from '../../../../../constant';
import MyButton from '../../../../atom/my-button';
import MyIcon from '../../../../atom/my-icon';
import ModalLayout from '../../../../template/modal-layout/ModalLayout';
import { HomeContext } from './HomeStore';

const SortModal = () => {
  const { sortVisible, setSortVisible, params, setParams, setQuestions } =
    useContext(HomeContext);
  const [tempSort, setTempSort] = useState({ ...params.sort });

  const handleViewsSort = () => {
    setTempSort({ ...tempSort, views: tempSort.views === 1 ? -1 : 1 });
  };

  const handleDateSort = () => {
    setTempSort({ ...tempSort, createdAt: tempSort.createdAt === 1 ? -1 : 1 });
  };

  const submit = () => {
    setQuestions([]);
    setParams((prev) => ({ ...prev, sort: tempSort, page: 1 }));
    setSortVisible(false);
  };

  return (
    <ModalLayout
      visible={sortVisible}
      onClose={() => setSortVisible(false)}
      title={'Sắp xếp'}
    >
      <View style={styles.insideContainer}>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Lượt xem:</Text>
          <TouchableOpacity
            onPress={handleViewsSort}
            style={styles.sortContainer}
          >
            <Text style={styles.textStyle}>
              {tempSort.views === 1 ? 'Tăng dần' : 'Giảm dần'}
            </Text>
            <MyIcon
              iconPackage={'Octicons'}
              name={tempSort.views === 1 ? 'sort-asc' : 'sort-desc'}
              color={colors.black75}
              size={24}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Ngày đăng:</Text>
          <TouchableOpacity
            onPress={handleDateSort}
            style={styles.sortContainer}
          >
            <Text style={styles.textStyle}>
              {tempSort.createdAt === 1 ? 'Tăng dần' : 'Giảm dần'}
            </Text>
            <MyIcon
              iconPackage={'Octicons'}
              name={tempSort.createdAt === 1 ? 'sort-asc' : 'sort-desc'}
              color={colors.black75}
              size={24}
            />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <MyButton title={'Sắp xếp'} onPress={submit} />
        </View>
      </View>
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  sortContainer: {
    flexDirection: 'row',
  },
  insideContainer: {
    gap: 24,
    width: '100%',
  },
  textStyle: {
    fontSize: 18,
    fontFamily: fonts.BahnschriftRegular,
  },
});

export default SortModal;
