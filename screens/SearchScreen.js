import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';
import { getFocusedRouteNameFromRoute, useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Input } from 'react-native-elements';

import database from '@react-native-firebase/database';

import firestore from '@react-native-firebase/firestore';
import { set } from 'react-native-reanimated';

const SearchScreen = ({navigation}) => {

  const { colors } = useTheme();

  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState([]);

  const [username, setUsername] = useState('');


  useEffect(()=>{
    const postRef = firestore().collection('posts').orderBy("createdAt","desc");

    postRef.onSnapshot(querySnapShot => {
      let allposts = [];
      let allid = [];
      querySnapShot.forEach(doc => {    
        // console.log("id post :"+doc.id);
        allid.push(doc.id);    
        allposts.push(doc.data());
      })
      setPosts(allposts);
      setIdPost(allid);
    })
  },[]);

  displayUsername = (user_id) => {
    console.log("in display")
    // firestore().collection('users').doc(user_id)
    //   .onSnapshot(documentSnapshot => {
    //     // console.log(documentSnapshot.get("username"));
    //     const keepName = documentSnapshot.get("username");
    //     console.log("keepName: "+keepName);
    //     // return getUsername(keepName);
    //     // return username; 
    // });

  firestore().collection('users').doc(user_id).get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data().username);
        return { name : doc.data().username };
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }

  const theme = useTheme();

  if(posts.length == 0) {
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
                <Text style={styles.titleOnTab}>ค้นหาการเดินทาง</Text>
              </View>
              <View style={styles.viewSearch}>
                <TouchableOpacity>
                  <Icon name="search" color={"#FFF"} size={22} style={styles.optionTab}/>
                </TouchableOpacity>
              </View>  
            </View>
        </View>

        <ScrollView style={styles.styleScrollView}>
          <Text style={styles.textBlankPost}>ไม่มีโพสต์หาผู้ร่วมเดินทาง</Text>
        </ScrollView>

      </View>
    );
    
  }
  else {
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
                <Text style={styles.titleOnTab}>ค้นหาการเดินทาง</Text>
              </View>
              <View style={styles.viewSearch}>
                <TouchableOpacity>
                  <Icon name="search" color={"#FFF"} size={22} style={styles.optionTab}/>
                </TouchableOpacity>
              </View>  
            </View>
        </View>
        
        
        <ScrollView style={styles.styleScrollView}>
          {
          posts.map((item,index) => 
          <View style={styles.cardsWrapper} key={index}>

            <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('รายละเอียด',{ item: item, post_id: idPost[index]})}}>

              <View style={styles.cardImgWrapper}>
                <Image style={styles.cardImg} source={{uri: item.imageURL}}
                style={{width: "100%", height: 150, borderTopLeftRadius: 8, borderTopRightRadius: 8}}/>

                { (new Date() < new Date(item.date.substring(13,17)+"-"+item.date.substring(10,12)+"-"+item.date.substring(7,9)))
                  && item.seat > item.book_seat &&
                <View style={{position:'absolute',width:100,height:35,borderTopLeftRadius:10,borderBottomLeftRadius:10,backgroundColor:'#558b2f',marginLeft:"70%",marginTop:10}}>
                  <Text style={{color:'#FFF',fontWeight:'bold',fontSize:23,alignSelf:'center'}}>ว่าง</Text>
                </View>
                }

                { (new Date() < new Date(item.date.substring(13,17)+"-"+item.date.substring(10,12)+"-"+item.date.substring(7,9)))
                  && item.seat == item.book_seat &&
                <View style={{position:'absolute',width:100,height:35,borderTopLeftRadius:10,borderBottomLeftRadius:10,backgroundColor:'#d32f2f',marginLeft:"70%",marginTop:10}}>
                  <Text style={{color:'#FFF',fontWeight:'bold',fontSize:23,alignSelf:'center'}}>เต็ม</Text>
                </View>
                }

                {
                  (new Date() > new Date(item.date.substring(13,17)+"-"+item.date.substring(10,12)+"-"+item.date.substring(7,9))) &&
                  <View style={{position:'absolute',width:200,height:35,borderTopLeftRadius:10,borderBottomLeftRadius:10,backgroundColor:'#9e9e9e',marginLeft:"39%",marginTop:10,paddingTop:2}}>
                    <Text style={{color:'#FFF',fontWeight:'bold',fontSize:20,alignSelf:'center'}}>ถึงวันเดินทางแล้ว</Text>
                  </View>
                }

              </View>
              <View style={styles.cardInfo}>
                {/* <Image source={require('../assets/images/imageProfile.png')}
                  style={{width: 50, height: 50}} /> */}
                <View style={styles.row}>
                  <View style={styles.viewInfoText}>
                    {/* <Text style={styles.textBold}>{item.user_id}</Text> */}
                    {/* <Text style={styles.textBold}>{ console.log("display : "+displayUsername(item.user_id))}</Text> */}
                    <Text>
                      <Icon name="map-marker" color={"#c62828"} size={15} />
                      {' '}{item.source} - {item.destination}
                    </Text>
                    <Text style={styles.Date}>วันเดินทาง: {' '}{item.date}</Text>
                  </View>
                  <View style={styles.seat}>
                    <Text style={styles.textSeat}>{item.book_seat}/{item.seat}{' '}
                      <Icon name="user" color={"#28288C"} size={25}/>
                    </Text>
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

export default SearchScreen;

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
  card: {
    marginTop: 10,
    // flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  cardInfo: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  viewInfoText: {
    marginLeft: 15,
    width: "65%",
  },
  Date : {
    fontSize: 10,
    color: "#616161",
  },
  row: {
    flexDirection: "row",
  },
  seat: {
    justifyContent: 'flex-end',
    marginLeft: 28,
  },
  textSeat: {
    fontSize: 23,
    fontWeight: 'bold',
    color: "#000",
  },
  textBlankPost: {
    color: "#616161",
    margin: 50,
    alignSelf: 'center',
  },
  textBold: {
    fontWeight: "bold",
  },

  //top tab
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
  viewSearch: {
    alignItems: 'flex-end',
    width: "37%",
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
});