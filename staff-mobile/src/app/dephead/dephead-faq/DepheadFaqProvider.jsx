import { createContext, useContext, useEffect, useState } from 'react';
import { filterInitData, initParams } from './constance';
import { depheadGetFaqSv } from '../../../service/dephead/depheadFaq.sv';
import { AppContext } from '../../AppProvider';
import { getDepartmentFieldSv } from '../../../service/dephead/depheadField.sv';

export const DepheadFaqContext = createContext({
  faqs: [],
  setFaqs: (faqs) => {},
  loading: false,
  setLoading: (isLoading) => {},
  params: {},
  setParams: (params) => {},
  pages: 0,
  setPages: (pages) => {},
  showFaqDetailModal: false,
  setShowFaqDetailModal: (isShowFaqDetailModal) => {},
  selectedFaq: {},
  setSelectedFaq: (faq) => {},
  filterData: [],
  showAddFaqModal: false,
  setShowAddFaqModal: (isShowAddFaqModal) => {},
  getFaqs: () => {},
});

export const DepheadFaqProvider = ({ children }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState(initParams);
  const [pages, setPages] = useState(0);
  const [showFaqDetailModal, setShowFaqDetailModal] = useState(false);
  const [showAddFaqModal, setShowAddFaqModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState({});
  const [filterData, setFilterData] = useState(filterInitData);

  const { user } = useContext(AppContext);
  const getFaqs = async () => {
    if (loading) return;
    setLoading(true);
    setFaqs([]);
    try {
      const response = await depheadGetFaqSv(params);
      setFaqs(response.faqs);
      setPages(response.pages);
    } catch (error) {
      console.log('getFaqs', error);
    }
    setLoading(false);
  };

  const getFields = async () => {
    try {
      const response = await getDepartmentFieldSv(user?.department?._id);
      const tempField = response?.fields?.map((field) => {
        return { key: field.fieldName, value: field._id };
      });
      setFilterData((prev) => {
        return prev.map((option) => {
          if (option.name === 'field')
            return {
              ...option,
              data: [{ key: 'Tất cả', value: null }, ...tempField],
            };
          else return option;
        });
      });
    } catch (error) {
      console.log('getFields', error);
    }
  };

  useEffect(() => {
    getFaqs();
  }, [params]);

  useEffect(() => {
    if (user) getFields();
  }, [user]);

  const values = {
    faqs,
    setFaqs,
    loading,
    setLoading,
    params,
    setParams,
    pages,
    setPages,
    showFaqDetailModal,
    setShowFaqDetailModal,
    selectedFaq,
    setSelectedFaq,
    filterData,
    showAddFaqModal,
    setShowAddFaqModal,
    getFaqs,
  };

  return (
    <DepheadFaqContext.Provider value={values}>
      {children}
    </DepheadFaqContext.Provider>
  );
};
