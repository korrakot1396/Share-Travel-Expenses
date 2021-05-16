import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome'

const ContactScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      <View style={styles.container}>
         <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>

          <View style={styles.topTab}>
              <View style={styles.row}>
                <TouchableOpacity onPress={()=>{
                  navigation.navigate('หน้าแรก');
                  }}>
                  <Icon name="chevron-left" color={"#FFF"} size={20} style={styles.optionTab}/>
                </TouchableOpacity>
                <View style={styles.ViewTitleOnTab}>
                  <Text style={styles.titleOnTab}></Text>
                </View>
              </View>
          </View>

        <View style={{flex:1, marginTop:15}}>
          <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('แสดงข้อตกลง')}}>
            <View style={styles.cardInfo}>
              <View style={styles.row}>
                <View style={{width: '90%'}}>
                  <Text style={styles.textBold}>เงื่อนไขและข้อตกลงการใช้บริการ</Text>
                </View>
                <View style={styles.viewArrowRight}>
                  <Icon name="chevron-right" color={"#28288C"} size={15}/>
                </View>    
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('แสดงนโยบาย')}}>
            <View style={styles.cardInfo}>
              <View style={styles.row}>
                <View style={{width: '90%'}}>
                  <Text style={styles.textBold}>นโยบายข้อมูลส่วนบุคคล</Text>
                </View>
                <View style={styles.viewArrowRight}>
                  <Icon name="chevron-right" color={"#28288C"} size={15}/>
                </View>    
              </View>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  card: {
    marginTop: 10,
    // flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardInfo: {
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
    height: 40,
    justifyContent: 'center',
  },
  textBold: {
    fontWeight: 'bold',
},
viewArrowRight: {
  marginTop: 2, 
  alignItems: 'flex-end',
  width: "10%",
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