/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';

// import ตัว Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// import Screen ของหน้าต่างๆ
import MainTabScreen from './screens/MainTabScreen';
import HistoryScreen from './screens/HistoryScreen';
import SearchScreen from './screens/SearchScreen';
import RegisterDriverScreen from './screens/RegisterDriverScreen';
import WebPageScreen from './screens/WebPageScreen';
import ContactScreen from './screens/ContactScreen';
import EmergencyScreen from './screens/EmergencyScreen';
import SettingScreen from './screens/SettingScreen';
import DetailScreen from './screens/DetailScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import InfoCarScreen from './screens/InfoCarScreen';
import AgreementScreen from './screens/AgreementScreen';
import EditProfileScreen from './screens/EditProfileScreen'
import myPostScreen from './screens/myPostScreen';
import ShowInfoCarScreen from './screens/ShowInfoCarScreen';
import ShowPolicyScreen from './screens/ShowPolicyScreen';
import ShowAgreementScreen from './screens/ShowAgreementScreen';
import SendMessageScreen from './screens/SendMessageScreen'

// import DrawerContent สำหรับ Navigation Bar
import { DrawerContent } from './screens/DrawerContent';

const Drawer = createDrawerNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent { ...props} />}>
        <Drawer.Screen name="หน้าต้อนรับ" component={WelcomeScreen}/>
        <Drawer.Screen name="หน้าแรก" component={MainTabScreen}/>
        <Drawer.Screen name="ประวัติ" component={HistoryScreen}/>
        <Drawer.Screen name="ค้นหา" component={SearchScreen}/>
        <Drawer.Screen name="สมัครคนขับ" component={RegisterDriverScreen}/>
        <Drawer.Screen name="เว็บไซต์" component={WebPageScreen}/>
        <Drawer.Screen name="ติดต่อ" component={ContactScreen}/>
        <Drawer.Screen name="ฉุกเฉิน" component={EmergencyScreen}/>
        <Drawer.Screen name="ตั้งค่า" component={SettingScreen}/>
        <Drawer.Screen name="รายละเอียด" component={DetailScreen}/>
        <Drawer.Screen name="เข้าสู่ระบบ" component={SignInScreen}/>
        <Drawer.Screen name="สมัครสมาชิก" component={SignUpScreen}/>
        <Drawer.Screen name="แนะนำ" component={OnboardingScreen}/>
        <Drawer.Screen name="สร้างโพสต์" component={CreatePostScreen}/>
        <Drawer.Screen name="กรอกข้อมูลรถ" component={InfoCarScreen}/>
        <Drawer.Screen name="ข้อตกลง" component={AgreementScreen}/>
        <Drawer.Screen name="แก้ไขโปรไฟล์" component={EditProfileScreen}/>
        <Drawer.Screen name="โพสต์ของฉัน" component={myPostScreen}/>
        <Drawer.Screen name="ข้อมูลรถ" component={ShowInfoCarScreen}/>
        <Drawer.Screen name="แสดงนโยบาย" component={ShowPolicyScreen}/>
        <Drawer.Screen name="แสดงข้อตกลง" component={ShowAgreementScreen}/>
        <Drawer.Screen name="แชท" component={SendMessageScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
    
  );
}


export default App;

