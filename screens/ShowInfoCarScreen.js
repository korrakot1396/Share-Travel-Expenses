import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


const ShowInfoCarScreen = ({navigation}) => {

  const { colors } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const theme = useTheme();
  const toggleTheme = () => {
      setIsDarkTheme(!isDarkTheme);
  };

  const [carDetail,setCarDetail] = useState([]);

  const user = auth().currentUser;
  var user_id = '';
  if(user) {
      user_id = user.uid;

  } else {
      console.log('User not signed in');
  }

  useEffect(()=>{
    const detailsCollectionRef = firestore().collection('car_details');
    detailsCollectionRef.onSnapshot(querySnapShot => {
        querySnapShot.forEach(doc => {
            if(user_id == doc.data().user_id) {   //ถ้า user ที่ login เป็น user ที่ทำรายการ
                setCarDetail(doc.data())
            }
        })
    })
  },[]);

  
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        
        <View style={styles.topTab}>
              <View style={styles.row}>
                <TouchableOpacity onPress={()=>{
                  navigation.goBack()
                  }}>
                  <Icon name="chevron-left" color={"#FF6347"} size={20} style={styles.optionTab}/>
                </TouchableOpacity>
                <View style={styles.ViewTitleOnTab}>
                  <Text style={styles.titleOnTab}>รายละเอียดรถ</Text>
                </View> 
              </View>
        </View>

        <View style={styles.viewContent}>
          <View style={styles.textLabel}>
            <Text style={styles.colorLabel}>
              <Ionicons name="car-sport" color={"#FF6347"} size={20}/>{' '}
              ยี่ห้อ:{' '}
              {carDetail.car_maker}
            </Text>
          </View>
          <View style={styles.textLabel}>
            <Text style={styles.colorLabel}>{"\n"}
              <Ionicons name="car-sport" color={"#FF6347"} size={20}/>{' '}
              รุ่น:{' '}
              {carDetail.car_model}
            </Text>          
          </View>
          <View style={styles.textLabel}>
            <Text style={styles.colorLabel}>{"\n"}
                <Ionicons name="car-sport" color={"#FF6347"} size={20}/>{' '}
                สี:{' '}
                {carDetail.color}
              </Text>          
          </View>
          <View style={styles.textLabel}>
          <Text style={styles.colorLabel}>{"\n"}
              <Ionicons name="car-sport" color={"#FF6347"} size={20}/>{' '}
              ทะเบียนรถ:{' '}
              {carDetail.driver_license}
            </Text>          
          </View>
        </View>

      </View>
    );
};

export default ShowInfoCarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  textLabel: {
    justifyContent: "flex-start",
    marginLeft: 5,
},
colorLabel: {
  color: "#616161",
  fontSize: 17,
},
viewContent: {
  width:"70%",
  alignSelf: 'center',
  justifyContent: 'center',
  flex: 1,
  marginTop: 100,
  marginBottom: 110,
  backgroundColor: '#FFF',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.32,
  shadowRadius: 5.46,
  elevation: 9,
  marginHorizontal: 5,
  paddingHorizontal: 15,
  paddingVertical: 5,
},


//Top tab
row: {
  flexDirection: "row"
},
topTab: {
  width: '100%',
  color: "#FFF",
  backgroundColor: '#28288C',
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
  fontSize: 18,
},
ViewTitleOnTab: {
  marginLeft: 45,
  marginTop: 15,
},
textWhite: {
  color: "#FFF",
},

});