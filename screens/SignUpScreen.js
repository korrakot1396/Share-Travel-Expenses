import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Modal,
    ScrollView,
    Image,
    ImageBackground
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Button, Input, Checkbox} from 'galio-framework';
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {State} from 'react-native-gesture-handler';
import PhotoUpload from 'react-native-photo-upload'

//BottomSheet
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

// import auth
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';

const SignUpScreen = ({navigation}) => {

    // const [image, setImage] = useState(null);
    // const [uploading, setUploading] = useState(false);
    // const [transferred, setTransferred] = useState(0);

    const {colors} = useTheme();
    const [username, SetUsername] = useState('')
    const [password, SetPassword] = useState('')
    const [confirmpassword, SetConfirmPassword] = useState('')
    const [firstname, SetFirstname] = useState('')
    const [lastname, SetLastname] = useState('')
    const [email, SetEmail] = useState('')
    const [phonenumber, SetPhoneNumber] = useState('')
    const [avatar, SetAvatar] = useState(null);
    const [defaultuserimage, setDefaultUserImage] = useState({
        uri:
          'https://firebasestorage.googleapis.com/v0/b/sharetravelexpenses.appspot.com/o/defaultImages%2Fupload_image.png?alt=media&token=5920f7cb-8664-49f1-8654-e7c82d3d4641',
      });

    const [front_idcardimage, setFrontIdCardImage] = useState({
        uri:
        'https://firebasestorage.googleapis.com/v0/b/sharetravelexpenses.appspot.com/o/defaultImages%2FIDCard_Front.jpg?alt=media&token=9af2c0f9-bdd0-43f0-84fc-af4f78675a77',
    });

    const [back_idcardimage, setBackIdCardImage] = useState({
        uri:
        'https://firebasestorage.googleapis.com/v0/b/sharetravelexpenses.appspot.com/o/defaultImages%2FIDCard_Back.jpg?alt=media&token=5d51749a-52a6-481a-ac94-ba2f0bf4e0a5',
    });



    

    // const [avatarurl, SetAvatarUrl] = useState('');
   

    const theme = useTheme();

    const buttonTextStyle = {
        color: '#FFF'
    };

    useEffect(() => {
        SetFirstname("");
        SetLastname("");
        SetUsername("");
        SetPassword("");
        SetConfirmPassword("");
        SetEmail("");
        SetPhoneNumber("");

    }, []);

    async function RegisterUser() {
        await
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                user
                    .user
                    .updateProfile({displayName: username})


                

                firestore()
                    .collection('users')
                    .doc(user.user.uid)
                    .set({
                        email: email,
                        username: username,
                        firstname: firstname,
                        lastname: lastname,
                        phonenumber: phonenumber,
                        role: 'user',
                        gender: 'ยังไม่ได้กำหนด',
                        imageURL: defaultuserimage.uri,
                        front_idcardURL: front_idcardimage,
                        back_idcardURL: back_idcardimage,
                    })

                if(avatar != '') {
                    const ref = storage().ref('avatar/'+ user.user.uid + '.png');
                    var task = ref.putString(avatar, "base64")
                    .then((taskSnapshot) => {
                        if (taskSnapshot.state === storage.TaskState.SUCCESS) {
                            console.log('Success: ', taskSnapshot.totalBytes);

                            ref.getDownloadURL().then( url => {
                                firestore()
                                .collection('users')
                                .doc(user.user.uid)
                                .update({
                                    imageURL: url
                                })
                            }).catch(e => {
                                console.log('getting downloadURL of image error => ', e)
                            })
                            
                        }
                        });
                }                                                                   
                console.log('User created login!')
                navigation.navigate('ข้อตกลง')
            })
            .catch((error) => {
                alert(error)
            })

        }

    return (
        <View style={styles.container}>
            <View style={styles.topTab}>
                <View style={styles.row}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Icon name="chevron-left" color={"#FFF"} size={20} style={styles.optionTab}/>
                    </TouchableOpacity>
                    <View style={styles.ViewTitleOnTab}>
                        <Text style={styles.titleOnTab}>สมัครสมาชิก</Text>
                    </View>
                </View>
            </View>

            <ProgressSteps activeStep={0}>
                <ProgressStep
                    label="ข้อมูลผู้ใช้"
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                    nextBtnText="ถัดไป">
                    <View
                        style={{
                            alignItems: 'center'
                        }}>

                        <PhotoUpload
                            onPhotoSelect={avatar => {
                                if (avatar) {
                                    SetAvatar(avatar);
                                }
                            }}>
                            <Image
                                style={{
                                    paddingVertical: 30,
                                    width: 100,
                                    height: 100,
                                    borderRadius: 75
                                }}
                                resizeMode='cover'
                                source={{ uri: defaultuserimage.uri }}/>
                        </PhotoUpload>

                        <View style={styles.viewInput}>
                            <Text style={styles.textLabel}>ชื่อจริง</Text>

                            <Input
                                placeholder="ระบุชื่อจริง"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => SetFirstname(text)}
                                value={firstname}/>
                            <Text style={styles.textLabel}>{"\n"}นามสกุล</Text>
                            <Input
                                placeholder="ระบุนามสกุล"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => SetLastname(text)}
                                value={lastname}/>
                            <Text style={styles.textLabel}>{"\n"}อีเมลล์</Text>

                            <Input
                                placeholder="ระบุอีเมลล์"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => SetEmail(text)}
                                value={email}/>
                            <Text style={styles.textLabel}>{"\n"}เบอร์โทรศัพท์</Text>

                            <Input
                                placeholder="ระบุเบอร์โทรศัพท์"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => SetPhoneNumber(text)}
                                value={phonenumber}/>
                        </View>
                    </View>
                </ProgressStep>
                <ProgressStep
                    label="บัตรประชาชน"
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                    previousBtnText="ก่อนหน้า"
                    nextBtnText="ถัดไป">
                    <View
                        style={{
                            alignItems: 'center'
                        }}>
                        <View style={styles.viewIDCard}>
                        <PhotoUpload 
                            onPhotoSelect={avatar => {
                                if (avatar) {
                                    console.log('Image base64 string: ', avatar)
                                }
                            }}>
                            <Image
                                style={{
                                    paddingVertical: 30,
                                    width: 300,
                                    height: 200
                                }}
                                resizeMode='cover'
                                source={require('../assets/images/IDCard_Front.png')}/>
                        </PhotoUpload>
                        <Text>
                            {"\n"}
                        </Text>
                        {/* <PhotoUpload
                            onPhotoSelect={avatar => {
                                if (avatar) {
                                    console.log('avatar: ', avatar)
                                }
                            }}>
                            <Image
                                style={{
                                    paddingVertical: 30,
                                    width: 300,
                                    height: 200
                                }}
                                resizeMode='cover'
                                source={require('../assets/images/IDCard_Back.png')}/>
                        </PhotoUpload> */}
                     
                        </View>
                    </View>
                </ProgressStep>
                <ProgressStep label="ชื่อผู้ใช้" onSubmit={() => RegisterUser()}
                    nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle} previousBtnText="ก่อนหน้า" finishBtnText="สมัครสมาชิก">
                    <View
                        style={{
                            alignItems: 'center'
                        }}>
                        <View style={styles.viewInput}>
                            <Text style={styles.textLabel}>ชื่อผู้ใช้</Text>
                            <Input
                                placeholder="ระบุชื่อผู้ใช้"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => SetUsername(text)}
                                value={username}/> 
                            <Text style={styles.textLabel}>{"\n"}รหัสผ่าน</Text>
                            <Input
                                secureTextEntry={true}
                                placeholder="ระบุรหัสผ่าน"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => SetPassword(text)}
                                value={password}/>
                            <Text style={styles.textLabel}>{"\n"}ยีนยันรหัสผ่าน</Text>
                            <Input
                                secureTextEntry={true}
                                placeholder="ยืนยันรหัสผ่าน"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => SetConfirmPassword(text)}
                                value={confirmpassword}/>
                        </View>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C2352',
        //   alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {
        fontSize: 47,
        color: 'white'
    },
    viewTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 0
    },
    viewInput: {
        width: "70%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5%'
    },
    viewIDCard: {
        width: "70%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '15%'
    },
    textLabel: {
        color: 'white'
    },
    buttonRegister: {
        width: '100%'
    },
    textColor: {
        color: "white"
    },
    textSignin: {
        color: "yellow"
    },
    textLabel: {
        width: "100%",
        color: "#FFF"
    },
    viewLeft: {
        alignItems: 'flex-start',
        width: '100%'
    },
    agree: {
        color: 'yellow',
        textDecorationLine: 'underline'
    },
    viewModal: {
        backgroundColor: "#1C2352",
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 5,
        margin: 30,
        height: "80%",
        width: "80%",
        borderRadius: 10
    },

    titleAgree: {
        color: "white",
        fontSize: 20
    },
    contentAgree: {
        backgroundColor: "#e0e0e0",
        marginTop: 10,
        width: "80%",
        flex: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    iconClose: {
        alignItems: "flex-end",
        width: "80%"
    },
    textBold: {
        fontWeight: 'bold'
    },

    //top tab
    row: {
        flexDirection: "row"
    },
    topTab: {
        width: '100%',
        color: "#FFF",
        backgroundColor: '#28288C'
    },
    optionTab: {
        paddingBottom: 17,
        paddingTop: 17,
        color: "#FFF",
        paddingLeft: 10,
      },
      titleOnTab: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 18
    },
    ViewTitleOnTab: {
        marginLeft: 45,
        marginTop: 15
    },
    textWhite: {
        color: "#FFF"
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20, borderTopRightRadius: 20, shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0}, shadowRadius: 5, shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {
            width: -1,
            height: -3
        },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    panelHeader: {
        alignItems: 'center'
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10
    },
    panelTitle: {
        fontSize: 27,
        height: 35
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios'
            ? 0
            : -12,
        paddingLeft: 10,
        color: '#05375a'
    }
})
