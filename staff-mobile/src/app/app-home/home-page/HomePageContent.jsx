// import React, { useContext } from "react";
// import { FlatList, StyleSheet, View } from "react-native";
// import { paths } from "../../../../constance";
// import { AppContext } from "../../AppProvider";
// import { HomePageButton } from "./HomePageButton";

// export const HomePageContent = () => {
//   const { user } = useContext(AppContext);

//   const data = {
//     ADMIN: [
//       {
//         id: "1",
//         text: "Quản lý khoa",
//         iconName: "business-outline",
//         iconPackage: "Ionicons",
//         link: paths.admin.department,
//       },
//       {
//         id: "2",
//         text: "Quản lý người dùng",
//         iconName: "users",
//         iconPackage: "Feather",
//         link: paths.admin.user,
//       },
//     ],
//     DEPARTMENT_HEAD: [
//       {
//         id: "4",
//         text: "Quản lý lĩnh vực",
//         iconName: "layers",
//         iconPackage: "Feather",
//         link: paths.dephead.field,
//       },
//       {
//         id: "3",
//         text: "Quản lý tư vấn viên",
//         iconName: "users",
//         iconPackage: "Feather",
//         link: paths.dephead.counsellor,
//       },
//       {
//         id: "6",
//         text: "Quản lý thư viện câu hỏi",
//         iconName: "question",
//         iconPackage: "Octicons",
//         link: paths.dephead.faq,
//       },
//       {
//         id: "7",
//         text: "Danh sách câu hỏi",
//         iconName: "question",
//         iconPackage: "Octicons",
//         link: paths.counsellor.question,
//       },
//       {
//         id: "5",
//         text: "Duyệt câu hỏi",
//         iconName: "question",
//         iconPackage: "Octicons",
//         link: paths.dephead.aprove,
//       },
//     ],
//     COUNSELLOR: [
//       {
//         id: "10",
//         text: "Danh sách câu hỏi",
//         iconName: "question",
//         iconPackage: "Octicons",
//         link: paths.counsellor.question,
//       },
//     ],
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         style={{ flex: 1, gap: 8 }}
//         data={data[user?.role]}
//         renderItem={HomePageButton}
//         numColumns={2}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ gap: 12 }}
//         columnWrapperStyle={{ gap: 12 }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     flex: 1,
//   },
// });

import { router } from 'expo-router';
import { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, paths } from '../../../../constance';
import MyIcon from '../../../component/atomic/my-icon';
import { AppContext } from '../../AppProvider';
import { Welcome } from './Welcome';

const Card = ({ name, content, icon, iconPackage, link }) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.6}
    onPress={() => {
      router.push(link);
    }}
  >
    <MyIcon
      iconPackage={iconPackage}
      name={icon}
      size={40}
      color={colors.primary}
    />
    <Text style={styles.cardName}>{name}</Text>
    <Text style={styles.cardContent}>{content}</Text>
  </TouchableOpacity>
);

export const HomePageContent = () => {
  const { user } = useContext(AppContext);

  const data = {
    ADMIN: [
      {
        id: 'admin_1',
        text: 'Khoa',
        iconName: 'business-outline',
        iconPackage: 'Ionicons',
        link: paths.admin.department,
      },
      {
        id: 'admin_2',
        text: 'Người dùng',
        iconName: 'users',
        iconPackage: 'Feather',
        link: paths.admin.user,
      },
      {
        id: 'admin_3',
        text: 'Tin tức',
        iconName: 'newspaper-outline',
        iconPackage: 'Ionicons',
        link: paths.admin.news,
      },
    ],
    DEPARTMENT_HEAD: [
      {
        id: 'dep_4',
        text: 'Lĩnh vực',
        iconName: 'layers',
        iconPackage: 'Feather',
        link: paths.dephead.field,
      },
      {
        id: 'dep_3',
        text: 'Tư vấn viên',
        iconName: 'users',
        iconPackage: 'Feather',
        link: paths.dephead.counsellor,
      },
      {
        id: 'dep_6',
        text: 'FAQs',
        iconName: 'question',
        iconPackage: 'Octicons',
        link: paths.dephead.faq,
      },
      {
        id: 'dep_7',
        text: 'Câu hỏi',
        iconName: 'question',
        iconPackage: 'Octicons',
        link: paths.counsellor.question,
      },
      {
        id: 'dep_5',
        text: 'Duyệt câu hỏi',
        iconName: 'question',
        iconPackage: 'Octicons',
        link: paths.dephead.aprove,
      },
    ],
    COUNSELLOR: [
      {
        id: 'coun_10',
        text: 'Câu hỏi',
        iconName: 'question',
        iconPackage: 'Octicons',
        link: paths.counsellor.question,
      },
      {
        id: 'coun_11',
        text: 'Feedback',
        iconName: 'question',
        iconPackage: 'Octicons',
        link: paths.counsellor.question,
      },
    ],
  };
  return (
    <>
      <Welcome />
      <View style={styles.container}>
        {data[user?.role]?.map((card) => (
          <View key={card.id} style={styles.cardWrapper}>
            <Card
              name={card.text}
              content={card.content}
              icon={card.iconName}
              iconPackage={card.iconPackage}
              link={card.link}
            />
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  cardWrapper: {
    width: '48%', // Hai cột, mỗi cột chiếm 48% chiều rộng để có khoảng cách giữa hai card
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: colors.primary,
    fontFamily: fonts.BahnschriftBold,
  },
  cardContent: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
});
