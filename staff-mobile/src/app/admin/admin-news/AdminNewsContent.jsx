import { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Pagination from '../../../component/molecule/pagination';
import ScreenHeader from '../../../component/molecule/screen-header';
import SortFilter from '../../../component/organism/sort-filter';
import { AddNewsModal } from './AddNewsModal';
import { AdminNewsContext } from './AdminNewsProvider';
import { DetailNewsModal } from './DetailNewsModal';
import { Item } from './Item';
import { ItemSkeletons } from './ItemSkeletons';

export const AdminNewsContent = () => {
  const { setShowAddNewsModal, newsList, params, setParams, pages } =
    useContext(AdminNewsContext);

  return (
    <>
      <AddNewsModal />
      <DetailNewsModal />

      <View style={styles.container}>
        <ScreenHeader
          title={'Quản lý tin tức'}
          onAdd={() => {
            setShowAddNewsModal(true);
          }}
        />
        <SortFilter sortData={null} filterData={null} setParams={null} />
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <ItemSkeletons />
          {newsList.map((news, index) => (
            <Item key={news?._id || index} data={news} />
          ))}
          <Pagination page={params.page} pages={pages} setParams={setParams} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  contentContainer: {
    marginTop: 8,
    marginBottom: 96,
  },
});
