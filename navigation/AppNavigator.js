import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { List, Add, Edit } from '../screens/Lecturers';
import { ListDepartment, AddDepartment, EditDepartment } from '../screens/Department';
import { ListCourse, AddCourse, EditCourse, LecturerListByCourse, AddLecturerByCourse } from '../screens/Courses';
import { LecturerScheduleScreen, AddLecturerSchedule } from '../screens/Schedule';
import { Profile } from '../screens/Profile';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ListCourse" component={ListCourse} />
    <Stack.Screen name="AddCourse" component={AddCourse} />
    <Stack.Screen name="EditCourse" component={EditCourse} />
    <Stack.Screen name="LecturerListByCourse" component={LecturerListByCourse} />
    <Stack.Screen name="AddLecturerByCourse" component={AddLecturerByCourse} />
  </Stack.Navigator>
);

const DepartmentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ListDepartment" component={ListDepartment} />
    <Stack.Screen name="AddDepartment" component={AddDepartment} />
    <Stack.Screen name="EditDepartment" component={EditDepartment} />
    <Stack.Screen name="ListCourse" component={ListCourse} />
    <Stack.Screen name="AddCourse" component={AddCourse} />
    <Stack.Screen name="EditCourse" component={EditCourse} />
    <Stack.Screen name="LecturerListByCourse" component={LecturerListByCourse} />
    <Stack.Screen name="AddLecturerByCourse" component={AddLecturerByCourse} />
  </Stack.Navigator>
);

const ScheduleStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LecturerScheduleScreen" component={LecturerScheduleScreen} />
    <Stack.Screen name="AddLecturerSchedule" component={AddLecturerSchedule} />
  </Stack.Navigator>
);

const LecturerStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="List" component={List} />
    <Stack.Screen name="Add" component={Add} />
    <Stack.Screen name="Edit" component={Edit} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Setting" component={Profile} />
    {/* Add other settings-related screens here if needed */}
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
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
          options={{ tabBarLabel: 'Thính Giảng' }} 
        />
        <Tab.Screen 
          name="Setting" 
          component={ProfileStack} 
          options={{ tabBarLabel: 'Cá Nhân' }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
