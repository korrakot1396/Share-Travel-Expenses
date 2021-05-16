import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from 'react-native-elements';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';

// import auth
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

const EditProfileScreen = () => {
        
        const { colors } = useTheme();

        const [firstname,SetFirstname] = useState('')
        const [lastname,SetLastname] = useState('')
        const [phonenumber,SetPhoneNumber] = useState('')
        const [image,SetImage] = useState(null)
        const [email,SetEmail]  = useState('')
        const [gender,SetGender]  = useState('')

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
              SetEmail(user_profile.get('email'));
              SetGender(user_profile.get('gender'));
            }
            
            fetchData();
          }, []);

          function EditUser() {
                firestore()
                    .collection('users')
                    .doc(user.uid)
                    .update({
                        phonenumber: phonenumber,
                        gender: gender,
                    })
          }
        
        


    return(
        <View style={styles.container}>
           
                <View style={{ alignItems: 'center' }}>
                <Text>{"\n"}</Text>
                    <TouchableOpacity >
                        <View style={{
                            height: 100,
                            width: 100,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}>
                            <ImageBackground
                                 source={{
                                    uri: image
                                }}
                            style={{ height:100, width: 100}}
                            imageStyle={{ borderRadius: 15}}
                            >
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Icon name="camera" size={35} color="#fff" style={{
                                        opacity: 0.7,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 10,
                                    }}
                                    />
                                </View>

                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold'}}> {user.displayName } </Text>
                </View>
                <View >
                <TextInput
                    label="อีเมล"
                    disabled
                    value={email}
                    onChangeText={(text)=>SetEmail(text)}
                />
                </View>
                <View >
                <TextInput
                    label="ชื่อจริง"
                    disabled
                    onChangeText={(text)=>SetFirstname(text)}
                    value={firstname}
                />
                </View>
                <View>
                <TextInput
                    label="นามสกุล"
                    disabled
                    onChangeText={(text)=>SetLastname(text)}
                    value={lastname}
                />
                </View>
                <View >
                <TextInput
                    label="เบอร์มือถือ"
                    value={phonenumber}
                    onChangeText={(text)=>SetPhoneNumber(text)}
                />
                </View>
                <View >
                <TextInput
                    label="เพศ"
                    value={gender}
                    onChangeText={(text)=>SetGender(text)}
                />
                </View>
                <TouchableOpacity style={styles.commandButton} onPress={() => EditUser()}>
                    <Text style={styles.panelButtonTitle}>ยืนยันการแก้ไข</Text>
                </TouchableOpacity>
        </View>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginTop: 10,
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
    },
  });