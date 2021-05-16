import React, { useState, useEffect } from 'react';
import { View, Modal, Image, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Button, Input } from 'galio-framework';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const myPostScreen = ({navigation}) => {

    const { colors } = useTheme();
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const theme = useTheme();
    const toggleTheme = () => {
      setIsDarkTheme(!isDarkTheme);
    };

    const [posts,setPosts] = useState([]);
    const [showModal = false,SetShowModal] = useState();
    const [userJoin,setUserJoin] = useState([]);


    const user = auth().currentUser;
    var user_id = '';
    if(user) {
        user_id = user.uid;
    } else {
        console.log('User not signed in');
    }

    useEffect(()=>{
      const postsCollectionRef = firestore().collection('posts').orderBy("createdAt","desc");
      postsCollectionRef.onSnapshot(querySnapShot => {
          let allPosts = [];
          querySnapShot.forEach(doc => {
              if(user_id == doc.data().user_id) {   //ถ้า user ที่ login เป็น user ที่ทำรายการ
                  allPosts.push(doc.data());
              }
          })
          setPosts(allPosts);
      })
    },[]);

    const openModalUserJoin = (user_join) => {
      SetShowModal(true);

      let keepUser = [];
      var i;
      if(user_join.length > 0) {
        for (i = 0; i < user_join.length; i++) {
          const usersCollectionRef = firestore().collection('users').doc(user_join[i]);
          usersCollectionRef.get().then(function(doc) {
            if (doc.exists) {
                keepUser.push(doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            // userJoin = keepUser;
            setUserJoin(keepUser);
            console.log("userJoin: "+JSON.stringify(userJoin));
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
        }
      } else {
        setUserJoin([]);
      }
   
      

     
    }

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
                    <Text style={styles.titleOnTab}>โพสต์ของฉัน</Text>
                  </View>
                </View>
            </View>
    
            <ScrollView style={styles.styleScrollView}>
              <Text style={styles.textBlankPost}>ไม่มีโพสต์</Text>
            </ScrollView>
    
          </View>
        );
        
      }
      else {
        

        return (


        <View style={styles.container}>

        <Modal transparent={true} visible={showModal} user_join={userJoin}>
          {/* <View style={{backgroundColor:"#FFF",flex:1,alignItems:"center",justifyContent:"center",}}> */}
            <View style={styles.viewModal}>
              <View style={styles.iconClose}>
                <Icon name='times' size={30} color='black'
                  onPress={()=>{
                    SetShowModal(false)
                  }}
                /> 
              </View>
              <Text style={styles.titleTxt}>ผู้ร่วมเดินทาง</Text>
              <ScrollView>
              { userJoin.length == 0 && <View><Text style={styles.textBlankPost}>ยังไม่มีผู้ร่วมเดินทาง</Text></View>
              }
              { userJoin.map((user,index) => 

                <View style={styles.cardInfoUserJoin} key={index}>
                    <Image source={{uri: user.imageURL}}
                    style={{width: 80, height: 80,borderRadius:80/2, marginLeft:15}} />
                    <View style={styles.viewInfoUserJoin}>
                      <View style={styles.row}>
                        <Text style={styles.textBold}>{user.username}{'   '}</Text>
                        <Icon name='envelope-square' size={15} color='blue'/>

                      </View>
                      <Text>{user.firstname}{' '}{user.lastname}</Text>
                      <Text>{user.email}</Text>
                      <Text>{user.phonenumber}</Text>
                    </View>
                </View>

              )}
              </ScrollView>

            </View>
          {/* </View> */}



        </Modal>


            <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>

            <View style={styles.topTab}>
                <View style={styles.row}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack();
                    }}>
                    <Icon name="chevron-left" color={"#FFF"} size={20} style={styles.optionTab}/>
                </TouchableOpacity>
                <View style={styles.ViewTitleOnTab}>
                    <Text style={styles.titleOnTab}>โพสต์ของฉัน</Text>
                </View>
                </View>
            </View>

            <ScrollView style={styles.styleScrollView}>
            {
                posts.map((item,index) => 
                    <View style={styles.cardsWrapper} key={index}>
                        <View style={styles.card} onPress={()=>{navigation.navigate('รายละเอียด',{ item: item, post_id: idPost[index]})}}>
                            <View style={styles.cardImgWrapper}>
                                <Image style={styles.cardImg} source={{uri: item.imageURL}}
                                style={{width: "100%", height: 150, borderTopLeftRadius: 8, borderTopRightRadius: 8}}/>
                            </View>
                        </View>
                        <View style={styles.cardInfo}>
                            <View style={styles.row}>
                                <View style={styles.viewInfoText}>
                                    <Text style={styles.textInfo}>
                                        จุดเริ่มต้น: {item.source}
                                    </Text>
                                    <Text style={styles.textInfo}>จำนวนที่นั่ง: {item.seat}</Text>
                                </View>
                                <View style={styles.viewInfoText}>
                                    <Text style={styles.textInfo}>ปลายทาง: {item.destination}</Text>
                                    <Text style={styles.textInfo}>ราคาต่อที่นั่ง: {item.price_seat} บาท</Text>
                                </View>
                            </View>
                            <View style={styles.viewInfoTextLong}>
                                    <Text style={styles.textInfo}>วันเดินทาง: {' '}{item.date}</Text>
                                    <Text style={styles.textInfo}>รายละเอียด: {item.description}</Text>
                            </View>
                            <TouchableOpacity style={styles.seat} onPress={() => {openModalUserJoin(item.user_join)}}>
                                <Text style={styles.textSeat}>{item.book_seat}/{item.seat}{' '}
                                <Icon name="user" color={"#28288C"} size={25}/>
                                </Text>
                            </TouchableOpacity>
              
                        </View>

                    </View>
                )                

            }
            </ScrollView>

        </View>
        );

        }

}
export default myPostScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
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
    textBlankPost: {
      color: "#616161",
      margin: 50,
      alignSelf: 'center',
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
      },
      viewInfoText: {
        marginLeft: 2,
        width: '50%',
      },
      viewInfoTextLong: {
        marginLeft: 2,
        width: '100%',
      },
      textInfo: {
          color: '#616161',
      },
      seat: {
        // justifyContent: 'flex-end',
        width: 80,
        alignSelf: 'flex-end',
      },
      textSeat: {
        fontSize: 23,
        fontWeight: 'bold',
        color: "#000",
        backgroundColor: '#bdbdbd',
        borderRadius: 10, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignSelf: 'center',
        paddingHorizontal: 2,
      },
      viewModal: {
        backgroundColor: "#FFF",
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 3,
        marginVertical: 120,
        marginHorizontal: 40,
        height: "50%",
        width: "80%",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    iconClose: {
      alignItems: "flex-end",
      width:"80%",
  },
  titleTxt : {
      color: "#000",
      fontSize: 17,
      marginTop: 2,
      fontWeight: 'bold',
  },
  cardInfoUserJoin: {
    paddingTop: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  viewInfoUserJoin: {
    marginRight: 2,
    width: '80%',
    alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: 'black',
    paddingLeft: 5,
  },
  textBold: {
    fontWeight: 'bold',
  },
  });
