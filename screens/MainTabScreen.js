import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { View,  StyleSheet } from 'react-native';

// import หน้า Screen ต่างๆ
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import ChatScreen from './ChatScreen';
import MapScreen from './MapScreen';
import { Avatar } from 'react-native-paper';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ChatStack = createStackNavigator();
const MapStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MainTabScreen  = () => (
  <Tab.Navigator
      initialRouteName="หน้าหลัก"
      tabBarOptions={{
        style: {
            activeColor: '#008080',
            backgroundColor: '#28288C'
        }
      }}
      
    >
      <Tab.Screen
        name="หน้าหลัก"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'หน้าหลัก' ,
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-home" color={color} size={30} />
          ),
        }}
      />
      
      <Tab.Screen
        name="แผนที่"
        component={MapStackScreen}
        options={{
          tabBarLabel: 'แผนที่',
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-location" color={color} size={30} />
          ),
        }}
        
      />
      
      <Tab.Screen
        name="ข้อความ"
        component={ChatStackScreen}
        options={{
          tabBarLabel: 'ข้อความ',
          tabBarIcon: ({ color, size }) => (
            <Icon name="md-chatbubble-ellipses" color={color} size={30} />
          ),
        }}
      />
      
    <Tab.Screen
        name="บัญชีของฉัน"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'บัญชี',
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-person" color={color} size={30} />
          ),
        //   tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
    
);

export default MainTabScreen;



const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
     backgroundColor: '#28288C',
   },
   headerTintColor: '#fff',
   headerTitleStyle: {
     fontWeight: 'bold'
   }
 }}>
   <HomeStack.Screen name="Home" component={HomeScreen} options={{
    title: 'หน้าหลัก',
    headerLeft: () => (
      <Icon.Button name="ios-menu" size={25} 
      backgroundColor="#28288C" onPress={() => {navigation.openDrawer
        ()}}></Icon.Button>
    ),
    headerRight: () => (
      <View style={{ flexDirection:'row', marginRight:10 }}> 
        <Icon.Button
           name="ios-search" 
           size={25} 
           backgroundColor="#28288C" 
        />
      </View>
    ),
   }}
   />
 </HomeStack.Navigator>
);



const ChatStackScreen = ({ navigation }) => (
  <ChatStack.Navigator screenOptions={{
    headerStyle: {
     backgroundColor: '#28288C',
   },
   headerTintColor: '#fff',
   headerTitleStyle: {
     fontWeight: 'bold'
   }
 }}>
   <ChatStack.Screen name="Chat" component={ChatScreen} options={{
   title: 'ข้อความ',
   headerLeft: () => (
    <Icon.Button name="ios-menu" size={25} 
    backgroundColor="#28288C" onPress={() => {navigation.openDrawer
      ()}}></Icon.Button>
    ) 
  }} />
 </ChatStack.Navigator>
);

const MapStackScreen = ({ navigation }) => (
  <MapStack.Navigator screenOptions={{
    headerStyle: {
     backgroundColor: '#28288C',
   },
   headerTintColor: '#fff',
   headerTitleStyle: {
     fontWeight: 'bold'
   }
 }}>
   <MapStack.Screen name="Map" component={MapScreen} options={{
   title: 'แผนที่',
   headerLeft: () => (
    <Icon.Button name="ios-menu" size={25} 
    backgroundColor="#28288C" onPress={() => {navigation.openDrawer
      ()}}></Icon.Button>
    ) 
  }} />
 </MapStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator screenOptions={{
      headerStyle: {
       backgroundColor: '#28288C',
     },
     headerTintColor: '#fff',
     headerTitleStyle: {
       fontWeight: 'bold'
     }
   }}>
     <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
     title: 'บัญชีของฉัน',
     headerLeft: () => (
      <Icon.Button name="ios-menu" size={25} 
      backgroundColor="#28288C" onPress={() => {navigation.openDrawer
        ()}}></Icon.Button>
      ),
      headerRight: () => (
        <MaterialCommunityIcons.Button name="account-edit" size={25} 
        backgroundColor="#28288C"  onPress={() => navigation.navigate('แก้ไขโปรไฟล์')}></MaterialCommunityIcons.Button>
      )
    }} />
   </ProfileStack.Navigator>
  );
