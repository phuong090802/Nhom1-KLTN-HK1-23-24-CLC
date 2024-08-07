import { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ItemSkeleton from '../../../component/molecule/item-skeleton';
import Pagination from '../../../component/molecule/pagination';
import ScreenHeader from '../../../component/molecule/screen-header';
import SortFilter from '../../../component/organism/sort-filter';
import { AddCounsellorModal } from './AddCounsellorModal';
import { AddFieldsModal } from './AddFieldsModal';
import { filterData, sortData } from './constance';
import { CounsellorDetailModal } from './CounsellorDetailModal';
import { DepheadCounsellorContext } from './DepheadCounsellorProvider';
import { Item } from './Item';

export const DepheadCounsellorContent = () => {
  const {
    params,
    pages,
    setParams,
    counsellors,
    loading,
    setShowAddCounsellorModal,
  } = useContext(DepheadCounsellorContext);

  return (
    <View style={styles.container}>
      <AddFieldsModal />
      <AddCounsellorModal />
      <CounsellorDetailModal />
      <ScreenHeader
        title={'Quản lý tư vấn viên'}
        setParams={setParams}
        onAdd={() => setShowAddCounsellorModal(true)}
      />
      <SortFilter
        sortData={sortData}
        filterData={filterData}
        setParams={setParams}
      />
      <ScrollView
        style={styles.contentContaier}
        showsVerticalScrollIndicator={false}
      >
        <ItemSkeleton loading={loading} />
        {counsellors.map((counsellor, index) => (
          <Item key={counsellor?._id || index} data={counsellor} />
        ))}
        <Pagination page={params.page} pages={pages} setParams={setParams} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  contentContaier: {
    marginTop: 8,
    marginBottom: 96,
  },
});
