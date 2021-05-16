import React, {useState, useEffect} from 'react';
import { View,  Button, StyleSheet, StatusBar, ScrollView, Image  } from 'react-native';
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
import { useTheme } from '@react-navigation/native';

// import auth
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database';
import { TouchableOpacity } from 'react-native-gesture-handler';



const ChatScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();

  const [firstname,SetFirstname] = useState('')
  const [lastname,SetLastname] = useState('')
  const [phonenumber,SetPhoneNumber] = useState('')
  const [image,SetImage] = useState(null)
  const [gender,SetGender] = useState('')
  const [role,SetRole] = useState('')
  const [chatrooms,SetChatRooms] = useState([])
  const [theusers, SetTheUsers] = useState([])

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

    const rooms = database().ref('rooms');
    
    const resident_rooms = database().ref('rooms');
   

    
  
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


      usersCollection.get().then(function(querySnapshot) {
        var all_user = []
        querySnapshot.forEach(function(doc) {
            // all_user.push({${doc.id}: doc.data()})
            let obj = {
              user_id : doc.id,
              ...doc.data()
            }
            all_user.push(obj);
        });
        SetTheUsers(all_user)

        rooms.orderByChild('host_id').equalTo(user_id).on('value', function (snap) {
          var all_rooms = []
          for (const [key, value] of Object.entries(snap.val()) ) {
            var show_user_id = value.host_id
            if (value.host_id == user_id) {
              show_user_id = value.resident_id
            }
            var show_user = all_user.find(function (user, index) {
              if (user.user_id == show_user_id) {
                return true;
              }
            });
               let obj = {
                 room_id : key,
                 show_user: show_user,
                 ...value
               }
               all_rooms.push(obj);
               
           }
           
  
          //  rooms.orderByChild('resident_id').equalTo(user_id).on('value', function (snap) {
          //   for (const [key, value] of Object.entries(snap.val()) ) {
          //         var show_user_id = value.host_id
          //       if (value.host_id == user_id) {
          //         show_user_id = value.resident_id
          //       }
          //       var show_user = all_user.find(function (user, index) {
          //         if (user.user_id == show_user_id) {
          //           return true;
          //         }
          //       });
          //        let obj = {
          //          room_id : key,
          //          show_user: show_user,
          //          ...value
          //        }
          //        all_rooms.push(obj);
          //    }

             // todo เรียงลำดับ array ก่อน
             SetChatRooms(all_rooms)
            // });
    });  
    })
      

       
}
    fetchData();
  
  }, []);




  
    return (

  //     <ScrollView>
  //     <View >
 
      
  // </View>
  // </ScrollView>
  <ScrollView style={styles.styleScrollView}>
  {
      chatrooms.map((item,index) => 

      <View  key={index}  >
        <TouchableOpacity  onPress={() => navigation.navigate("แชท")}>
            <View style={{ flexDirection: 'row',  marginTop: 15}} >
        <Avatar.Image
           source={{
            uri: item.show_user.imageURL
          }}
          size= {80}
        /> 
   
      <View style={{ marginLeft: 20}}>
        <Title style={[styles.title, {
          marginTop: 15,
          marginBottom: 5,
        }]} 
        > { item.show_user.firstname + " " + item.show_user.lastname } </Title>
        <Text> { item.show_user.firstname } </Text>
        </View>
       
       </View>
       </TouchableOpacity>

      </View>
    )}    
  
  </ScrollView>

  
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});