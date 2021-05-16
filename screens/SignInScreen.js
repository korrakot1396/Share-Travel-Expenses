import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button, Input, Checkbox } from 'galio-framework';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native'
import Alert from '@logisticinfotech/react-native-animated-alert';



// import auth
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


const SignInScreen = ({navigation}) => {
  

  const { colors } = useTheme();

  const [email,SetEmail] = useState('')
  const [password,SetPassword] = useState('')
  
  

  const theme = useTheme();

  const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }; 

  useEffect(() => {

    const user = auth().currentUser;

    if(user) {
      navigation.navigate('หน้าแรก')
    }
    
  }, []);

  

 

  async function LoginUser(){
    if(email && password) {
      await 
      auth()
      .signInWithEmailAndPassword(email.trim(),password)
      .then((user)=>{
          // Alert.alert(
          //   'เข้าสู่ระบบสำเร็จ',
          //   'ยินดีต้อนรับ',
          //   [
          //     { text: 'ตกลง' }
          //   ],
          // ); 
          console.log('User signed in!')
          SetEmail('')
          SetPassword('')
          navigation.navigate('หน้าแรก')
         
      })
      .catch((error)=>{
          alert(error)
      })
    } else {
      Alert.alert(
        'กรอกข้อมูลไม่ครบ',
        'กรุณากรอกข้อมูลให้ครบ',
        [
          { text: 'ตกลง' }
        ],
      );    
    }


  }

  
    return (
      <View style={styles.container}>

{/* <Button title="Show modal" onPress={toggleModal} />

<Modal isVisible={isModalVisible}>
  <View style={{flex: 1}}>
  <View style={{ justifyContent: 'center', alignItems: 'center', height: '40%', width: '90%'}}>
        <LottieView style={{height: '100%', width: '100%'}} source={require('../assets/lottiefiles/success.json')} autoPlay loop />
    </View>

    <Button title="Hide modal" onPress={toggleModal} />
  </View>
</Modal> */}

       
        <View style={styles.viewCarImage}>
            <Image source={require('../assets/images/car.png')}
              style={{width: 85, height: 85}} />
            <View style={styles.title}>
              <Text style={styles.textTitle}>Share</Text>
              <Text style={styles.textUnder}>travel expenses</Text>
            </View>       
        </View> 
        <View style={styles.viewInput}>
            <Input
                placeholder="อีเมล"
                left
                icon="user"
                family="antdesign"
                iconSize={30}
                iconColor="#616161"
                placeholderTextColor="#616161"
                onChangeText={(text)=>SetEmail(text)}
                value={email}
            />
            <Input 
                secureTextEntry
                placeholder="รหัสผ่าน"
                left
                icon="key"
                family="antdesign"
                iconSize={30}
                iconColor="#616161"
                placeholderTextColor="#616161"
                onChangeText={(text)=>SetPassword(text)}
                value={password}
            />
            <View style={styles.twoGrid}> 
                <TouchableOpacity onPress={()=>{
                    console.log('Remember me')
                }}>
                    <Checkbox color="info" onChange={() => console.log("remember me")} labelStyle={{ color: '#FFF' }} label="จำฉันไว้ในระบบ" style={styles.rememberMe} />

                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    console.log('Forget Password')
                }}>
                    <Text style={styles.textColor}>ลืมรหัสผ่าน{' '}
                      <Icon name="question-circle" color={"#FFF"} size={20} style={styles.optionTab}/>
                      {"\n"}
                    </Text>

                </TouchableOpacity>
            </View>
           
            
            <Button round uppercase color="#0097a7"
                style={styles.buttonSignin}
                onPress={()=>LoginUser()}>
                เข้าสู่ระบบ
            </Button>
            
           
            <Text style={styles.textColor}>หรือ เข้าสู่ระบบผ่าน{"\n"}</Text>

            <View style={styles.ViewSocial}>
                <Image source={require('../assets/images/google.jpg')}
                  style={styles.picIconSocial} />
                <Image source={require('../assets/images/facebook.png')}
                  style={styles.picIconSocial} />
                <Image source={require('../assets/images/twitter.png')}
                  style={styles.picIconSocial} />
            </View>
            <Text style={styles.textColor}>
                {"\n"}ต้องการสร้างบัญชี ?
                <TouchableOpacity onPress={()=>{
                        navigation.navigate('สมัครสมาชิก')
                    }}>
                    <Text style={styles.textSignup}>   สมัครสมาชิก</Text>

                </TouchableOpacity>
            </Text>
            
        </View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1C2352',
      alignItems: 'center',
      justifyContent: 'center',   
    },
    viewCarImage: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'center', 
      paddingTop:20,
      paddingBottom:0,
      marginBottom: 50,
    },
    title: {
      // textAlign: 'center',
      marginLeft:10,
    },
    textTitle: {
      fontSize: 47,
      color: 'white',
    },
    textUnder: {
      fontSize: 19,
      color: 'white',
    },
    signinButton: {
      width:"100%",
    },
    viewInput: {
      width:"70%",
      justifyContent: 'center',
      alignItems: 'center',
      // flex: 1,
    },
    ViewSocial: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    picIconSocial: {
      width: 50,
      height: 50,
      marginLeft: 15,
      marginRight: 15,  
    },
    textColor: {
      color: "white",
    },
    textSignup: {
      color: "yellow",
    },
    twoGrid: {
      flexDirection:'row',
    },
    rememberMe: {
      color:'white',
      width:190,
      alignItems:'flex-start',
    },
    iconStyle: {
      color: 'white',
      marginBottom: 1,
      marginLeft: 5,
      fontSize: 14
    },
    buttonSignin: {
      width:'100%',    
    },
   
  })
  
  