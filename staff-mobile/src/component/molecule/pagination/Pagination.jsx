import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import PaginationButton from './PaginationButton';

const Pagination = ({ page, pages, setParams }) => {
  const handlePageChange = (pageNumber) => {
    if (setParams && page !== pageNumber) {
      const fowardPage =
        pageNumber === 'first' ? 1 : pageNumber === 'last' ? pages : pageNumber;
      setParams((prev) => ({ ...prev, page: fowardPage }));
    }
  };

  const pageButtons = useMemo(() => {
    let result = [];
    for (let i = page - 2; i <= page + 2; i++) {
      if (i >= 1 && i <= pages) result.push(i);
    }
    if (!result.includes(1) && page != 1) result = ['first', ...result];
    if (!result.includes(pages) && page != pages) result.push('last');
    return result;
  }, [page, pages]);
  return (
    pages !== 0 && (
      <View style={styles.container}>
        {pageButtons.map((pageNumber) => (
          <PaginationButton
            key={pageNumber}
            page={pageNumber}
            isSelected={pageNumber === page}
            onClick={() => handlePageChange(pageNumber)}
          />
        ))}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    marginTop: 4,
  },
});

export default Pagination;
