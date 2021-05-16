import React, { useEffect, useState } from 'react';
import { View,  Button, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import auth
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import SignInScreen from './SignInScreen';


const ProfileScreen = ({navigation}) => {
  
  const [firstname,SetFirstname] = useState('')
  const [lastname,SetLastname] = useState('')
  const [phonenumber,SetPhoneNumber] = useState('')
  const [image,SetImage] = useState(null)
  const [gender,SetGender] = useState('')
  const [role,SetRole] = useState('')
  
  const [numberOfPost,SetNumberOfPost] = useState(0);

  const user = auth().currentUser;
  var user_id = '';
  var user_email = '';
  var user_displayname = '';

  useEffect(() => {
    user_id = user.uid;
    user_email = user.email;
    user_displayname = user.displayName;
  
    const usersCollection = firestore().collection('users');
    console.log('userCollection', usersCollection);
    console.log('userid: ',user.uid);
  
    var fetchData = async () => {
      user_profile = await usersCollection.doc(user.uid).get();
      console.log('user_profile: ', user_profile);
      SetPhoneNumber(user_profile.get('phonenumber'));
      console.log('phonenumber: ', phonenumber);
      SetFirstname(user_profile.get('firstname'));
      console.log('firstname: ', firstname);
      SetLastname(user_profile.get('lastname'));
      SetImage(user_profile.get('imageURL'));
      SetGender(user_profile.get('gender'));
      SetRole(user_profile.get('role'));
    }
    
    fetchData();

    const postsRef = firestore().collection('posts');
    postsRef.onSnapshot(querySnapShot => {
      let number = 0;
      querySnapShot.forEach(doc => {
          if(user_id == doc.data().user_id) {   //ถ้า user ที่ login เป็น user ที่ทำรายการ
              number = number + 1;
          }
      })
      SetNumberOfPost(number);
  })
  }, []);



  if( role == 'user' ) {
    return (
      <SafeAreaView style={styles.container}>
        
        <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row',  marginTop: 15}}>
              <Avatar.Image
                 source={{
                  uri: image
                }}
                size= {80}
              />
         
            <View style={{ marginLeft: 20}}>
              <Title style={[styles.title, {
                marginTop: 15,
                marginBottom: 5,
              }]} 
              onChangeText={(text)=>SetFirstname(text)}
              value={firstname}
              onChangeText={(text)=>SetLastname(text)}
              value={lastname}
              > { firstname + " " + lastname } </Title>
              <Caption style={styles.caption}> { user.displayName } </Caption>
              </View>
            </View>
        </View>

        <View style={styles.userInfoSection}>
              <View style={styles.row}>
                  <Ionicons name="md-transgender-sharp" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}> { gender } </Text>
              </View>
              <View style={styles.row}>
                  <Icon name="phone" color="#777777" size={20}/>
                  <Text style={{color:"#777777", marginLeft: 20}}  onChangeText={(text)=>SetPhoneNumber(text)}
                        value={phonenumber}
                        > { phonenumber } </Text>
              </View>
              <View style={styles.row}>
                  <Icon name="email" color="#777777" size={20}/>
                  <Text style={{color:"#777777", marginLeft: 20}}> { user.email } </Text>
              </View>
        </View>
{/*        
        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>20</Title>
            <Caption>จำนวนโพสต์</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>320</Title>
            <Caption>แต้มสะสม</Caption>
          </View>
      </View> */}
      
      
      <View>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}> 
            <Icon name="post-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>ประวัติการเดินทางของคุณ</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}> 
            <Ionicons name="settings-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>ตั้งค่า</Text>
          </View>
        </TouchableRipple>
      </View>
      
      </SafeAreaView>
    );
  }
  else {
    return (
      <SafeAreaView style={styles.container}>
        
        <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row',  marginTop: 15}}>
              <Avatar.Image
                 source={{
                  uri: image
                }}
                size= {80}
              />
         
            <View style={{ marginLeft: 20}}>
              <Title style={[styles.title, {
                marginTop: 15,
                marginBottom: 5,
              }]} 
              onChangeText={(text)=>SetFirstname(text)}
              value={firstname}
              onChangeText={(text)=>SetLastname(text)}
              value={lastname}
              > { firstname + " " + lastname } </Title>
              <Caption style={styles.caption}> { user.displayName } </Caption>
              </View>
            </View>
        </View>

        <View style={styles.userInfoSection}>
              <View style={styles.row}>
                  <Ionicons name="md-transgender-sharp" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}> { gender } </Text>
              </View>
              <View style={styles.row}>
                  <Icon name="phone" color="#777777" size={20}/>
                  <Text style={{color:"#777777", marginLeft: 20}}  onChangeText={(text)=>SetPhoneNumber(text)}
                        value={phonenumber}
                        > { phonenumber } </Text>
              </View>
              <View style={styles.row}>
                  <Icon name="email" color="#777777" size={20}/>
                  <Text style={{color:"#777777", marginLeft: 20}}> { user.email } </Text>
              </View>
        </View>
       
        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{numberOfPost}</Title>
            <Caption>จำนวนโพสต์</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>320</Title>
            <Caption>แต้มสะสม</Caption>
          </View>
      </View>
      
      
      <View>
        <TouchableRipple onPress={() => {navigation.navigate('โพสต์ของฉัน')}}>
          <View style={styles.menuItem}> 
            <Icon name="post-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>โพสต์ของฉัน</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {navigation.navigate('ข้อมูลรถ')}}>
          <View style={styles.menuItem}> 
            <Ionicons name="car-sport" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>ข้อมูลเกี่ยวกับรถ</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}> 
            <Ionicons name="settings-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>ตั้งค่า</Text>
          </View>
        </TouchableRipple>
      </View>
      
      </SafeAreaView>
    );
  }


  

   
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});