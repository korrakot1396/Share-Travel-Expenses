import React, {useState, useEffect} from 'react';
import { View, Text, Button,ScrollView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const HistoryScreen = ({navigation}) => {

  const { colors } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const theme = useTheme();
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const userLogin = auth().currentUser;
  var userLogin_id = '';

  const [joins, setJoins] = useState([]);
  const [posts, setPosts] = useState([]);

  if (userLogin) {
    // console.log('HistoryScreen User login id: ', userLogin.uid);
    userLogin_id = userLogin.uid;
  } else {
    console.log('User not signed in');
  }

  const joinRef = firestore().collection('joins').orderBy("createdAt","desc");
  const postRef = firestore().collection('posts');


  useEffect(()=>{
    console.log("useEffect History Screen called");

    joinRef.onSnapshot(querySnapShot => {
      let allJoins = [];
      let allPosts = [];
      querySnapShot.forEach(doc => {     
        if(userLogin_id == doc.data().user_id) {   //ถ้า user ที่ login เป็น user ที่ทำรายการ
          allJoins.push(doc.data());
          
          
          postRef.doc(doc.data().post_id).get().then(function(doc) {
            if(doc.exists) {
              allPosts.push(doc.data());
            }
          })
          setPosts(allPosts);
        }       
      })
      setJoins(allJoins);
    
      console.log("allPosts: "+allPosts);
    })
  },[]);

  if(joins.length == 0) {
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
                <Text style={styles.titleOnTab}>ประวัติการทำรายการ</Text>
              </View>  
            </View>
        </View>

        <ScrollView style={styles.styleScrollView}>
          <Text style={styles.textBlankPost}>ไม่มีประวัติการทำรายการ</Text>
        </ScrollView>

      </View>
    );
    
  } else {

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
                <Text style={styles.titleOnTab}>ประวัติการทำรายการ</Text>
              </View>
            </View>
        </View>

        <ScrollView style={styles.styleScrollView}>
          {
          joins.map((item,index) => 
            <View style={styles.cardsWrapper} key={index}>
              <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('รายละเอียด',{ item: posts[index] , post_id: item.post_id})}}>

                  <View style={styles.cardInfo}>
                    <View style={styles.row}>
                      <View style={{width: '90%'}}>
                        <Text style={styles.textBold}>ร่วมเดินทาง{' '}</Text>
                        {/* <Text style={styles.Date}>วันที่{new Date(item.createdAt)}</Text> */}
                        <Text style={styles.textViewDetail}>(คลิกเพื่อดูรายละเอียด)</Text>
                      </View>
                      <View style={styles.viewArrowRight}>
                        <Icon name="chevron-right" color={"#28288C"} size={15}/>
                      </View>     
                    </View>             
                </View>
              

              </TouchableOpacity>
                  
            </View>
          )}

        </ScrollView> 
       
      </View>
    );
  }
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
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
  styleScrollView : {
    width:'100%',
    flex: 1,
    marginTop: 10,
  },
  cardsWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 5,
  },
  Date : {
    fontSize: 10,
    color: "#616161",
  },
  textBold: {
    fontWeight: 'bold',
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
  },
  textBlankPost: {
    color: "#616161",
    margin: 50,
    alignSelf: 'center',
  },
  textViewDetail: {
    color: "#616161",
    fontSize: 10,
  },
  viewArrowRight: {
    marginTop: 8, 
    alignItems: 'flex-end',
    width: "10%",
  },
  

  //top tab
  row: {
    flexDirection: "row",
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
 
});