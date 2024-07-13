import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { colors } from "../../../../constant";
import CreateNavButton from "../../../molecule/create-nav-button";
import NavButton from "../../../molecule/nav-button";
import Layout from "../../../template/layout";
import CounsellorListScreen from "../../user/counsellor-list-screen/CounsellorListScreen";
import CreateQuestionScreen from "../../user/create-question-screen";
import FaqsScreen from "../../user/faqs-screen";
import NewsScreen from "../../user/news-screen";
import HomeScreen from "../app-home/home-screen/HomeScreen";

const Tab = createBottomTabNavigator();
const AppHome = () => {
  return (
    <Layout>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,

          tabBarInactiveTintColor: "#000",
          tabBarActiveTintColor: colors.primary,

          tabBarStyle: {
            height: 60,
          },

          tabBarItemStyle: {
            borderTopColor: colors.black10,
            borderTopWidth: 1,
            backgroundColor: "#fff",
            alignItems: "center",
          },
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <NavButton icon={"home"} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="FaqsScreen"
          component={FaqsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <NavButton icon={"question"} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="CreateQuestionScreen"
          component={CreateQuestionScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <CreateNavButton icon={"question"} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="CounsellorListScreen"
          component={CounsellorListScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <NavButton icon={"people"} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="NewsScreen"
          component={NewsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <NavButton icon={"note"} color={color} size={size} />
            ),
          }}
        />

      </Tab.Navigator>
    </Layout>
  );
};

export default AppHome;
