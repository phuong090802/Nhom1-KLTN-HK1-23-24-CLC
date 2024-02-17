import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from './constants/colors';
import Account from './screens/Account';
import Consulter from './screens/Consulter';
import Home from './screens/Home';
import News from './screens/News';
import FAQ from './screens/FAQ';
import HomeHeader from './components/HomeHeader';
import Login from './screens/Login';
import Register from './screens/Register';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ICON_SIZE = 24;

function MainHome() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarShowLabel: false,

        headerTitleStyle: {
          fontWeight: 'bold',
          color: Colors.primary,
          fontSize: 24,
        },

        tabBarActiveTintColor: 'white',
        tabBarActiveBackgroundColor: Colors.primary,

        tabBarInactiveTintColor: 'black',
        tabBarInactiveBackgroundColor: Colors.black10,
        tabBarItemStyle: {
          borderRadius: ICON_SIZE,
          marginVertical: 4,
          marginHorizontal: 16,
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          title: 'Trang chủ',

          tabBarIcon: ({ color }) => (
            <MaterialIcons name='home-filled' size={ICON_SIZE} color={color} />
          ),
          headerRight: () => <HomeHeader />,
        }}
      />
      <Tab.Screen
        name='Question'
        component={FAQ}
        options={{
          title: 'Thư viện câu hỏi',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='frequently-asked-questions'
              size={ICON_SIZE}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name='Consulter'
        component={Consulter}
        options={{
          title: 'Danh sách tư vấn viên',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='group' size={ICON_SIZE} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name='News'
        component={News}
        options={{
          title: 'Tin tức',
          tabBarIcon: ({ color }) => (
            <Ionicons name='newspaper' size={ICON_SIZE} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name='User'
        component={Account}
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color }) => (
            <Feather name='user' size={ICON_SIZE} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='MainHome'
          component={MainHome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
