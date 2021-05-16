import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Button, Input } from 'galio-framework';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const InfoCarScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  const [license_plate,SetLicensePlate] = useState()
  const [car_maker,SetCarMaker] = useState()
  const [car_model,SetCarModel] = useState()
  const [color,SetColor] = useState()

  const detailsCollectionRef = firestore().collection('car_details');
  const user = auth().currentUser;
  var user_id = '';
  if (user) {
    user_id = user.uid;
  } else {
    console.log('User not signed in');
  }

  const userLoginRef = firestore().collection('users').doc(user_id);


  const RegisDriver=()=> {

    if(license_plate && car_maker && car_model && color) {
      detailsCollectionRef.add({
        driver_license : license_plate,
        car_maker : car_maker,
        car_model: car_model,
        color : color,
        user_id : user_id,
      })
      userLoginRef.update({
        role: 'driver',
      })
      Alert.alert(
        'สมัครคนขับสำเร็จ',
        'คุณสามารถโพสต์หาผู้ร่วมเดินทางได้',
        [
          { text: 'ตกลง', onPress: () => navigation.navigate('หน้าแรก') }
        ],
      );  
    } else {
      Alert.alert('กรอกข้อมูลไม่ครบ', 'กรุณากรอกข้อมูลให้ครบ', [
        {text: 'ตกลง'},
      ]);
    }  
  }

  
    return (
      <View style={styles.container}>

        <View style={styles.topTab}>
            <View style={styles.row}>
              <TouchableOpacity onPress={()=>{
                navigation.goBack()
                }}>
                <Icon name="chevron-left" color={"#FFF"} size={20} style={styles.optionTab}/>
              </TouchableOpacity>
              <View style={styles.ViewTitleOnTab}>
                <Text style={styles.titleOnTab}>รายละเอียดรถ</Text>
              </View> 
            </View>
        </View>

        <ScrollView style={styles.styleScrollView}>

        <View style={styles.viewInput}>
          <View style={styles.textLabel}>
                  <Text>{"\n"}ทะเบียนรถ</Text>
              </View>
              <Input
                  placeholder="ระบุทะเบียนรถ"
                  left
                  icon="idcard"
                  family="antdesign"
                  iconSize={30}
                  iconColor="#616161"
                  placeholderTextColor="#616161"
                  onChangeText={(text)=>{
                      SetLicensePlate(text)
                  }}
              />

              <View style={styles.textLabel}>
                  <Text>{"\n"}ยี่ห้อ</Text>
              </View>
              <Input
                  placeholder="ระบุยี่ห้อรถ"
                  left
                  icon="car"
                  family="antdesign"
                  iconSize={30}
                  iconColor="#616161"
                  placeholderTextColor="#616161"
                  onChangeText={(text)=>{
                      SetCarMaker(text)
                  }}
              />
              
              <View style={styles.textLabel}>
                  <Text>{"\n"}รุ่น</Text>
              </View>
              <Input
                  placeholder="ระบุรุ่นของรถ"
                  left
                  icon="car"
                  family="antdesign"
                  iconSize={30}
                  iconColor="#616161"
                  placeholderTextColor="#616161"
                  onChangeText={(text)=>{
                      SetCarModel(text)
                  }}
              />  

          <View style={styles.textLabel}>
                  <Text>{"\n"}สี</Text>
              </View>
              <Input
                  placeholder="ระบุสีของรถ"
                  left
                  icon="car"
                  family="antdesign"
                  iconSize={30}
                  iconColor="#616161"
                  placeholderTextColor="#616161"
                  onChangeText={(text)=>{
                      SetColor(text)
                  }}
              />  
            </View>

          </ScrollView>

            <View style={styles.viewSubmit}>
            <View style={styles.widthHalf}>
              <TouchableOpacity onPress={()=>{
                  navigation.goBack()
                }}>
                <Text style={styles.optionBottom}>กลับ</Text>
              </TouchableOpacity>           
            </View>
            <View style={styles.widthHalf}>
              <TouchableOpacity onPress={RegisDriver}>
                <Text style={styles.optionBottom}>ส่ง</Text>
              </TouchableOpacity>
            </View>
          </View>

      </View>
    );
};

export default InfoCarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  styleScrollView: {
    width: '100%',
    flex: 1,
    height: '100%',
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

   //bottom tab
   viewSubmit: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection:'row',
    color: "#FFF",
    marginTop: 10,
  },
  widthHalf: {
    width: "50%",
    alignItems: 'center',
    backgroundColor: '#28288C',
  },
  optionBottom: {
    paddingBottom: 15,
    paddingTop: 15,
    color: "#FFF",
  },


  textLabel: {
    justifyContent: "flex-start",
    width: "95%",
},
viewInput: {
  width:"70%",
  alignSelf: 'center',
  flex: 1,
  marginTop: 30,
},
});