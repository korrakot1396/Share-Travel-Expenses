import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity,ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button } from 'galio-framework';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import PhotoUpload from 'react-native-photo-upload'

const RegisterDriverScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
         
        <View style={styles.topTab}>
            <View style={styles.row}>
              <TouchableOpacity onPress={()=>{
                navigation.goBack()
                }}>
                <Icon name="chevron-left" color={"#FFF"} size={20} style={styles.optionTab}/>
              </TouchableOpacity>
              <View style={styles.ViewTitleOnTab}>
                <Text style={styles.titleOnTab}>ลงทะเบียนสำหรับคนขับ</Text>
              </View>
              
            </View>
        </View>

        <ScrollView>

        <View style={styles.viewContent}>
          <Text style={styles.textUnderline}>รายการจดทะเบียนรถ</Text>
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
                                source={require('../assets/images/regisBook.jpg')}/>
                        </PhotoUpload>
           

          <Text style={styles.textUnderline}>ใบขับขี่</Text>
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
                                source={require('../assets/images/license.jpg')}/>
                        </PhotoUpload>

          <Text style={styles.textUnderline}>พ.ร.บ. รถยนต์</Text>
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
                                source={require('../assets/images/insurance.png')}/>
                        </PhotoUpload>

          <Text style={styles.textUnderline}>ป้ายกำกับภาษี</Text>
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
                                source={require('../assets/images/tax.jpg')}/>
                        </PhotoUpload>
                        <Text style={styles.textUnderline}>รูปรถยนต์ของคุณ</Text>
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
                                source={require('../assets/images/imgcarURL.jpg')}/>
                        </PhotoUpload>
        </View>
       
   
          <View style={styles.viewSubmit}>
            <View style={styles.widthHalf}>
              <TouchableOpacity onPress={()=>{
                navigation.navigate('หน้าแรก')
                }}>
                <Text style={styles.optionBottom}>ยกเลิก</Text>
              </TouchableOpacity>           
            </View>
            <View style={styles.widthHalf}>
              <TouchableOpacity onPress={()=>{
                navigation.navigate('กรอกข้อมูลรถ')
                }}>
                <Text style={styles.optionBottom}>ต่อไป</Text>
              </TouchableOpacity>
            </View>
          </View>

          </ScrollView>
      </View>
    );
};

export default RegisterDriverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',  
  },
  textUnderline: {
      fontSize: 20,
      textDecorationLine: 'underline',
      margin: 10,
  },
  textWhite: {
    color: "#FFF",
  },
  viewContent: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 20,
  },

  //bottom tab
  viewSubmit: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection:'row',
    color: "#FFF",
    flex: 1,
  },
  widthHalf: {
    width: "50%",
    height: "100%",
    alignItems: 'center',
    backgroundColor: '#28288C',
  },
  optionBottom: {
    paddingBottom: 15,
    paddingTop: 15,
    color: "#FFF",
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
  }
})