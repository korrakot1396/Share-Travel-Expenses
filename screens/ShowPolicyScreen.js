import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome'

const ShowPolicyScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
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
              <Text style={styles.titleOnTab}>นโยบายข้อมูลส่วนบุคคล</Text>
            </View> 
          </View>
      </View>

      {/* <Text style={styles.titleAgree}>ข้อตกลงการใช้บริการ</Text> */}

      <View style={styles.contentAgree}>
        <ScrollView style={styles.styleScrollView}>
            
            <Text style={styles.textBold}>{'\n\n'}การเก็บข้อมูลส่วนบุคคล</Text>
            <Text>{'     '}กรอกรายละเอียดในการสมัครสมาชิก</Text>
            <Text>{'     '}รูปหน้าบัตรและ หลังบัตรประชาชน เพื่อยืนยันตัวบุคคล</Text>
            <Text>{'     '}ในการสมัครคนขับ ใส่ข้อมูลเพื่อใช้ในการประเมินคุณสมบัติของผู้ใช้ในการให้บริการในฐานะคนขับ</Text>
            <Text></Text>

            <Text style={styles.textBold}>การใช้ข้อมูลส่วนบุคคล</Text>
            <Text>{'     '}เก็บข้อมูลส่วนบุคคล เพื่อวัตถุประสงค์ในการ</Text>
            <Text style={styles.textBold}>{'     '}ให้บริการ</Text>
            <Text>{'     '}■ ยืนยันตัวบุคคล</Text>
            <Text>{'     '}■ สร้างบัญชี</Text>
            <Text>{'     '}■ ติดต่อสื่อสารระหว่างผู้ใช้งาน</Text>
            <Text></Text>

            
            <Text style={styles.textBold}>การเปิดเผยข้อมูลส่วนบุคคล</Text>
            <Text>{'     '}ให้ข้อมูลส่วนบุคคลกับ</Text>
            <Text>{'     '}ผู้ใช้คนอื่น : ชื่อ, ข้อมูลส่วนบุคคลและภาพถ่าย และข้อมูลยานพาหนะในกรณีที่เป็นคนชับ</Text>
           
          </ScrollView>

      </View>

    </View>
    );
};

export default ShowPolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  styleScrollView : {
    width:'100%',
    flex: 1,
  },
  titleAgree: {
    color: "white",
    fontSize: 20,
},
contentAgree: {
    backgroundColor: "#e0e0e0",
    marginTop: 10,
    marginBottom: 10,
    width: "80%",
    flex: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
},
buttonRegister: {
    width:'70%',    
},

  //top tab
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
  textBold: {
    fontWeight: 'bold',
},
});