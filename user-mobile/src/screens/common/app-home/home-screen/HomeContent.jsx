import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { fonts } from '../../../../../constant';
import TitleBar from '../../../../molecule/title-bar';
import {
  getDepFieldsSv,
  getDepsSv,
} from '../../../../services/guest/department.sv';
import { getQuestionsSv } from '../../../../services/guest/question.sv';
import DropdownItem from './DropdownItem';
import HomeSkeletonGroup from './HomeSkeletonGroup';
import { HomeContext } from './HomeStore';
import SearchModal from './SearchModal';
import SortModal from './SortModal';
import { styles as homeScreenStyles } from './const';

import {
  transformDepartments,
  transformsFields,
} from '../../../../util/convert.util';

const HomeContent = () => {
  const homeContext = useContext(HomeContext);

  const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);

  function setQuestions(questions) {
    // deleteAllQuestions();
    let mergeQuestions;
    homeContext.setQuestions((prev) => {
      r;
      if (homeContext.params.keyword === '') {
        mergeQuestions = [...questions];
      } else {
        mergeQuestions = [...prev, ...questions];
      }
      // saveAllQuestions(mergeQuestions);
      return mergeQuestions;
    });
  }

  function setDepartments(departments) {
    const retDepartments = transformDepartments(departments);
    homeContext.setDepData(retDepartments);
  }

  function setFields(fields) {
    const retFields = transformsFields(fields);
    homeContext.setFieldData(retFields);
  }

  // get getAllDepartments
  async function getAllDepartments() {
    try {
      const response = await getDepsSv();
      const departments = response.departments;
      setDepartments(departments);
    } catch (error) {
      console.log('Lỗi khi lấy dữ liệu khoa!', error);
    }
  }

  // get getAllFields
  async function getAllFields() {
    if (!homeContext.chosenDep) return;
    try {
      homeContext.setFieldData(null);
      homeContext.setChosenField(null);
      const response = await getDepFieldsSv(homeContext.chosenDep);
      const fields = response.fields;

      setFields(fields);
    } catch (error) {
      console.log('Lỗi khi lấy dữ liệu lĩnh vực của khoa!', error);
    }
  }

  // getHomeScreen data
  const getQuestions = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await getQuestionsSv(homeContext.params);
      const questions = response.questions;
      setQuestions(questions);
      homeContext.setPages(response.pages);
    } catch (error) {
      // if (homeContext.questions.length === 0) {
      //   homeContext.setQuestions(storedQuestions);
      // }
      // console.log("Lỗi khi lấy dữ liệu câu hỏi!", error);
    } finally {
      setEndReached(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDepartments();
  }, []);

  useEffect(() => {
    getAllFields();
  }, [homeContext.chosenDep]);

  useEffect(() => {
    getQuestions();
  }, [homeContext.params]);

  const handleItemSelect = (id) => {
    if (id === homeContext.selected) {
      homeContext.setSelected(-1);
    } else {
      homeContext.setSelected(id);
    }
  };

  const handleLazy = (nativeEvent) => {
    if (
      !endReached &&
      isCloseToBottom(nativeEvent) &&
      homeContext.params.page < homeContext.pages
    ) {
      homeContext.setParams((prev) => ({ ...prev, page: prev.page + 1 }));
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

  return (
    <>
      <SearchModal />
      <SortModal />
      <View style={homeScreenStyles.container}>
        <TitleBar
          title={'Hỏi đáp'}
          onSearch={() => homeContext.setSearchVisible(true)}
          onSort={() => homeContext.setSortVisible(true)}
        />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => handleLazy(nativeEvent)}
        >
          {homeContext.questions.map((question) => (
            <DropdownItem
              key={question._id}
              data={question}
              id={question._id}
              isOpen={homeContext.selected === question._id}
              onSelect={() => handleItemSelect(question._id)}
            />
          ))}
          {loading && <HomeSkeletonGroup />}
          {homeContext.pages !== 0 &&
            homeContext.params.page === homeContext.pages && (
              <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>Đã hết câu hỏi ...</Text>
              </View>
            )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 8,
  },
  fallbackContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
  fallbackText: {
    fontSize: 16,
    fontFamily: fonts.BahnschriftRegular,
  },
});

export default HomeContent;
