import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';


// import auth
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database';

const SendMessageScreen = ({navigation}) => {

    const [messages, setMessages] = useState([]);

    const [firstname,SetFirstname] = useState('')
    const [lastname,SetLastname] = useState('')
    const [phonenumber,SetPhoneNumber] = useState('')
    const [image,SetImage] = useState(null)
    const [gender,SetGender] = useState('')
    const [role,SetRole] = useState('')
    const [chatrooms,SetChatRooms] = useState([])
    const [theusers, SetTheUsers] = useState([])
  
    const user = auth().currentUser;
    var userLogin_id = '';
    var userLogin_email = '';
    var userLogin_displayname = '';
 
    useEffect(() => {

      const usersCollection = firestore().collection('users');
      console.log('Message_Page_userCollection', usersCollection);
      console.log('Message_Page_userid: ',user.uid);

      const rooms = database().ref('rooms');

      

      setMessages([
        {
          _id: 1,
          text: 'คุณสนใจร่วมเดินทางกับเราใช่ไหม',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
   
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    
   
    return (
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }

export default SendMessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});