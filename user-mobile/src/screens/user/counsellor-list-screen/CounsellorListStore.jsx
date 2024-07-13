import { createContext, useEffect, useState } from 'react';
import { getCounsellorListSv } from '../../../services/guest/counsellor.sv';
import { initParams } from './constance';

export const CounsellorListContext = createContext({
  counsellors: [],
  setCounsellors: (counsellors) => {},
  pages: 0,
  setPages: (pages) => {},
  selected: 0,
  setSelected: (selected) => {},
  params: {},
  setParams: (params) => {},
  handleLazy: (nativeEvent) => {},
});

export const CounsellorListStore = ({ children }) => {
  const [counsellors, setCounsellors] = useState([]);

  const [pages, setPages] = useState(0);

  const [selected, setSelected] = useState(-1);

  const [params, setParams] = useState(initParams);

  const [endReached, setEndReached] = useState(false);

  const getCounsellors = async () => {
    try {
      const response = await getCounsellorListSv(params);
      setCounsellors(response.staffs);
      setPages(response.pages);
    } catch (error) {
      console.log('Lỗi lấy danh sách tư vấn viên', error);
    }
  };

  const handleLazy = (nativeEvent) => {
    if (!endReached && isCloseToBottom(nativeEvent) && params.page < pages) {
      setParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 8;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  useEffect(() => {
    getCounsellors();
  }, []);

  const values = {
    counsellors,
    setCounsellors,
    pages,
    setPages,
    selected,
    setSelected,
    params,
    setParams,
    handleLazy,
  };

  return (
    <CounsellorListContext.Provider value={values}>
      {children}
    </CounsellorListContext.Provider>
  );
};
