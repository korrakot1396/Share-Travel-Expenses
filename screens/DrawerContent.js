import React, { useEffect, useState } from 'react';
import { View,  StyleSheet } from 'react-native';
import { 
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch, ToggleButton
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import StarRating from '../assets/components/StarRating';

// import auth
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import SignInScreen from './SignInScreen';

export function DrawerContent(props) {

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    const [email, SetEmail] = useState('')
    const [username,SetUsername] = useState('')
    const [firstname,SetFirstname] = useState('')
    const [lastname,SetLastname] = useState('')
    const [phonenumber,SetPhoneNumber] = useState('')
    const [image,SetImage] = useState(null)
    const [role,SetRole] = useState('')

    const user = auth().currentUser;
    var user_id = '';
    var user_email = '';
    var user_displayname = '';

    useEffect(() => {
        console.log('DrawerContent user: ', user);
      
        const usersCollection = firestore().collection('users');
        console.log('userCollection', usersCollection);
      
        var fetchData = async () => {
          user_profile = await usersCollection.doc(user.uid).get();
          console.log('user_profile: ', user_profile);
          SetPhoneNumber(user_profile.get('phonenumber'));
          console.log('phonenumber: ', phonenumber);
          SetFirstname(user_profile.get('firstname'));
          console.log('firstname: ', firstname);
          SetLastname(user_profile.get('lastname'));
          SetImage(user_profile.get('imageURL'))
          console.log('image: ', image);
          SetUsername(user_profile.get('username'))
          SetEmail(user_profile.get('email'))
          SetRole(user_profile.get('role'))
          console.log('UserRole: ',role)

          console.log('DrawerContent userid: ',user.uid);

          user_id = user.uid;
          user_email = user.email;
          user_displayname = user.displayName;
        }
        if (user != null) {
            
            fetchData();
        }
      }, []);

   
   

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

   if(role == 'user') {
    return(
        <View style = {{ flex:1 }}>
            <DrawerContentScrollView {... props }>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection:'row', marginTop: 15}}>
                        <Avatar.Image
                            source={{
                                uri: image
                            }}
                            size= {50}
                            />
                            <View style={{ marginLeft:15, flexDirection: 'column'}}>
                                <Title style={styles.title}>  
                                    { username }
                                </Title>
                                <Caption style={styles.caption}>
                                    { email }
                                </Caption>
                            </View>
                    </View>

                   
                </View>
                
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="home"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="หน้าหลัก"
                        onPress={() => { props.navigation.navigate('หน้าหลัก')}}
                        />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="history"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="ประวัติทำรายการ"
                        onPress={() => {props.navigation.navigate('ประวัติ')}}
                        />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="book-search"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="ค้นหาการเดินทาง"
                        onPress={() => {props.navigation.navigate('ค้นหา')}}
                        />
                     <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="car"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="สมัครคนขับ"
                        onPress={() => {props.navigation.navigate('สมัครคนขับ')}}
                        />

                     {/* <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="web"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="เว็บไซต์"
                        onPress={() => {props.navigation.navigate('เว็บไซต์')}}
                        /> */}
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="card-account-phone"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="เกี่ยวกับเรา"
                        onPress={() => {props.navigation.navigate('ติดต่อ')}}
                        />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="alarm-light"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="แจ้งเหตุฉุกเฉิน"
                        onPress={() => {props.navigation.navigate('ฉุกเฉิน')}}
                        />
                     <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="cog"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="ตั้งค่า"
                        onPress={() => {props.navigation.navigate('ตั้งค่า')}}
                        />
                </Drawer.Section>
                <Drawer.Section title="กำหนดธีม">
                     <TouchableRipple onPress={() => { toggleTheme() }}>
                         <View style={styles.preference}>
                            <Text>ธีมดำ</Text>
                             <View pointerEvents="none">
                                <Switch value={ isDarkTheme } />
                             </View>
                         </View>
                     </TouchableRipple>
                </Drawer.Section>
             </View> 
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size}) => (
                        <Icon   
                            name="exit-to-app"
                            color={color}
                            size={ 30 }
                            />
                    )}
                    label="ออกจากระบบ"
                    onPress={() => { 
                        
                        auth()
                        .signOut()
                        .then(() => console.log('User signed out!'));
                        props.navigation.navigate('เข้าสู่ระบบ') 
                    }}
                />
            </Drawer.Section>


        </View>
    );
   }
   else{
    return(
        <View style = {{ flex:1 }}>
            <DrawerContentScrollView {... props }>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection:'row', marginTop: 15}}>
                        <Avatar.Image
                            source={{
                                uri: image
                            }}
                            size= {50}
                            />
                            <View style={{ marginLeft:15, flexDirection: 'column'}}>
                                <Title style={styles.title}>  
                                    { username }
                                </Title>
                                <Caption style={styles.caption}>
                                    { email }
                                </Caption>
                            </View>
                    </View>

                    <View style={ styles.row }>
                        <StarRating ratings={4} reviews={99} />
                    </View>
                </View>
                
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="home"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="หน้าหลัก"
                        onPress={() => { props.navigation.navigate('หน้าหลัก')}}
                        />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="history"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="ประวัติทำรายการ"
                        onPress={() => {props.navigation.navigate('ประวัติ')}}
                        />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="book-search"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="ค้นหาการเดินทาง"
                        onPress={() => {props.navigation.navigate('ค้นหา')}}
                        />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="car"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="เพิ่มเส้นทาง"
                        onPress={() => {props.navigation.navigate('สร้างโพสต์')}}
                        />
                        
                     {/* <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="web"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="เว็บไซต์"
                        onPress={() => {props.navigation.navigate('เว็บไซต์')}}
                        /> */}
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="card-account-phone"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="เกี่ยวกับเรา"
                        onPress={() => {props.navigation.navigate('ติดต่อ')}}
                        />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="alarm-light"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="แจ้งเหตุฉุกเฉิน"
                        onPress={() => {props.navigation.navigate('ฉุกเฉิน')}}
                        />
                     <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="cog"
                                color= { color }
                                size= { 30 }
                                />
                        )} 
                        label="ตั้งค่า"
                        onPress={() => {props.navigation.navigate('ตั้งค่า')}}
                        />
                </Drawer.Section>
                <Drawer.Section title="กำหนดธีม">
                     <TouchableRipple onPress={() => { toggleTheme() }}>
                         <View style={styles.preference}>
                            <Text>ธีมดำ</Text>
                             <View pointerEvents="none">
                                <Switch value={ isDarkTheme } />
                             </View>
                         </View>
                     </TouchableRipple>
                </Drawer.Section>
             </View> 
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size}) => (
                        <Icon   
                            name="exit-to-app"
                            color={color}
                            size={ 30 }
                            />
                    )}
                    label="ออกจากระบบ"
                    onPress={() => { 
                        
                        auth()
                        .signOut()
                        .then(() => console.log('User signed out!'));
                        props.navigation.navigate('เข้าสู่ระบบ') 
                    }}
                />
            </Drawer.Section>


        </View>
    );
   }
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });