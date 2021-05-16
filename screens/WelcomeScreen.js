import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';

//import lottie
import LottieView from 'lottie-react-native';

// import auth
import auth from '@react-native-firebase/auth';

const WelcomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();



  useEffect(() => {
    const user = auth().currentUser;

    if(user) {
      navigation.navigate('หน้าแรก')
    }
    else {
      setTimeout(() => {
    
        navigation.navigate('เข้าสู่ระบบ')
      }, 4500);
    }
    
  }, []);

  
    return (
      // <View style={styles.container}>
      //     <View style={styles.viewCarImage}> 
      //     <Image source={require('../assets/images/car.png')}
      //       style={{width: 85, height: 85}} />
      //     <View style={styles.title}>
      //       <Text style={styles.textTitle}>Share</Text>
      //       <Text style={styles.textUnder}>travel expenses</Text>
      //     </View>       
      // </View> 
      // </View>
     
      <View style={ styles.container }>
        <LottieView source={require('../assets/welcome/car-animation.json')} autoPlay loop />
      </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1C2352',
      alignItems: 'center',
      justifyContent: 'center',   
    },
    viewCarImage: {
      width:400, height:100, flex:1, flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'center', 
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
    }
  })