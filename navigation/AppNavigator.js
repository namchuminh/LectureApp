import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { List, Add, Edit } from '../screens/Lecturers';
import { ListDepartment, AddDepartment, EditDepartment } from '../screens/Department';
import { ListCourse, AddCourse, EditCourse, LecturerListByCourse, AddLecturerByCourse } from '../screens/Courses';
import { LecturerScheduleScreen, AddLecturerSchedule } from '../screens/Schedule';
import { Profile } from '../screens/Profile';
import { Login } from '../screens/Auth'; // Import màn hình đăng nhập
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack cho Home
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ListCourse" component={ListCourse} />
    <Stack.Screen name="AddCourse" component={AddCourse} />
    <Stack.Screen name="EditCourse" component={EditCourse} />
    <Stack.Screen name="LecturerListByCourse" component={LecturerListByCourse} />
    <Stack.Screen name="AddLecturerByCourse" component={AddLecturerByCourse} />
  </Stack.Navigator>
);

// Stack cho Department
const DepartmentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ListDepartment" component={ListDepartment} />
    <Stack.Screen name="AddDepartment" component={AddDepartment} />
    <Stack.Screen name="EditDepartment" component={EditDepartment} />
  </Stack.Navigator>
);

// Stack cho Schedule
const ScheduleStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LecturerScheduleScreen" component={LecturerScheduleScreen} />
    <Stack.Screen name="AddLecturerSchedule" component={AddLecturerSchedule} />
  </Stack.Navigator>
);

// Stack cho Lecturer
const LecturerStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="List" component={List} />
    <Stack.Screen name="Edit" component={Edit} />
  </Stack.Navigator>
);

// Stack cho Profile
const ProfileStack = ({ setIsLoggedIn }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile">
      {props => <Profile {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Stack.Screen>
    <Stack.Screen name="Login">
      {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token); // Nếu có token, isLoggedIn sẽ là true, ngược lại false
    };

    checkLoginStatus();
  }, []);

  // Nếu chưa xác định trạng thái đăng nhập, có thể hiển thị một loading spinner
  if (isLoggedIn === null) {
    return null; // Hoặc có thể trả về một loading spinner
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? ( // Nếu đã đăng nhập
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Department') {
                iconName = 'school';
              } else if (route.name === 'Schedule') {
                iconName = 'event';
              } else if (route.name === 'Lecturer') {
                iconName = 'people';
              } else if (route.name === 'Setting') {
                iconName = 'settings';
              }

              return <MaterialIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#3F51B5',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeStack} 
            options={{ tabBarLabel: 'Trang Chủ' }} 
          />
          <Tab.Screen 
            name="Department" 
            component={DepartmentStack} 
            options={{ tabBarLabel: 'Chuyên Ngành' }} 
          />
          <Tab.Screen 
            name="Schedule" 
            component={ScheduleStack} 
            options={{ tabBarLabel: 'Lịch Giảng' }} 
          />
          <Tab.Screen 
            name="Lecturer" 
            component={LecturerStack} 
            options={{ tabBarLabel: 'Giảng Viên' }} 
          />
          <Tab.Screen 
            name="Setting" 
            options={{ tabBarLabel: 'Cá Nhân' }}
          >
            {props => <ProfileStack {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
        </Tab.Navigator>
      ) : ( // Nếu chưa đăng nhập, hiển thị màn hình đăng nhập
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={Add} />
          <Stack.Screen name="LecturerScheduleScreen" component={LecturerScheduleScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
