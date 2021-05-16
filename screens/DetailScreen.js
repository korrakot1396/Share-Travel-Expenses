import React ,{ useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { BaseRouter, useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { Button } from 'galio-framework';

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const DetailScreen = ({route,navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();

  const { source, destination, date, seat, price_seat, user_id, description, imageURL, user_join, book_seat } = route.params.item;
  const [user,setUser] = useState([]);
  const [userJoin,setUserJoin] = useState([]);

  const usersCollection = firestore().collection('users');

  const userLogin = auth().currentUser;
  var userLogin_id = '';

  const joinsCollectionRef = firestore().collection('joins');
  const postsCollectionRef = firestore().collection('posts').doc(route.params.post_id);

  const chatRoomsRef = database().ref('rooms');

  function createChatRoom() {

    database()
  .ref('rooms')
  .push()
  .set({
    host_id: userLogin_id,
    resident_id: user_id,
    created:  database.ServerValue.TIMESTAMP
  })
  .then(() => console.log('Data set.',user));
  navigation.navigate('แชท')

  }


  if (userLogin) {
    userLogin_id = userLogin.uid;
  } else {
    // console.log('Detail Screen User not signed in');
  }

     userDocument = usersCollection.doc(user_id).onSnapshot(documentSnapshot => {
        // console.log('User data: ', documentSnapshot.data());
        setUser(documentSnapshot.data());
    });

    useEffect(() => {
    }, []);

    const join=()=> {
        Alert.alert(
            'ร่วมเดินทาง',
            'คุณต้องการร่วมเดินทาง',
            [
                { text: 'ยกเลิก', onPress: () => console.log('ยกเลิก') },
              { text: 'ตกลง', onPress: () => saveJoin()}
            ],
          );  
    }

    const saveJoin=()=>{
      
        joinsCollectionRef.add({
            user_id: userLogin_id,
            post_id: route.params.post_id,
            createdAt: firestore.FieldValue.serverTimestamp(),
        })

        let curSeat;

        postsCollectionRef.get().then(function(doc) {
            if(doc.exists) {
                curSeat = doc.data().user_join;

                user_join.push(userLogin_id);
                
                postsCollectionRef.update({
                    user_join : user_join,
                    book_seat : curSeat.length + 1,
                })
            } else {
                console.log("No such document!");
            }
        });

        // navigation.navigate('ประวัติ');
    }

    const findUserJoin=(userJoin, userLogin_id)=>{
        var i;
        for (i = 0; i < userJoin.length; i++) {
            if(userJoin[i] == userLogin_id) {
                return true;
            }
        }
        return false;
    }


    return (
        <View style={styles.container}>

        <View style={styles.topTab}>
        <View style={styles.row}>
          <TouchableOpacity onPress={()=>{
            navigation.goBack();
            }}>
            <Icon name="chevron-left" color={"#FFF"} size={20} style={styles.optionTab}/>
          </TouchableOpacity>
          <View style={styles.viewSearch}>
            <TouchableOpacity>
              <Icon name="search" color={"#FFF"} size={22} style={styles.optionTab}/>
            </TouchableOpacity>
          </View>  
        </View>
        </View>

        <ScrollView>

            <View style={styles.container}>
                <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
                <View style={styles.viewName}>
                    <Image source={{uri: user.imageURL}}
                    style={{width: 85, height: 85, borderRadius: 85/2}} />

                    <View style={styles.profile}>
                        <Text style={styles.textUsername}>{user.username}</Text>
                        <Text style={styles.textFullname}>{user.firstname}{' '}{user.lastname}</Text>
                        <Text>
                            <Icon name='phone' size={15} color='black'/>
                            {' '}{user.phonenumber}
                        </Text>
                        <Text onPress={() => createChatRoom()}>
                            <Icon name='envelope-square' size={15} color='blue'/>
                            {' '}ส่งข้อความ
                        </Text>
                    </View>
                </View>

                    <View style={styles.ViewDesc}>
                        <View style={styles.blockDesc}>
                            <Icon name='map-marker'size={35} color='#c62828'/>
                            <View style={styles.nextToColumn}>
                                <Text style={styles.greySmall}>จุดเริ่มต้น</Text>
                                <Text>{source}</Text>
                            </View>
                        </View>
                        <View style={styles.blockDesc}>
                            <Text style={styles.textGoTo}>ไปยัง</Text>
                        </View>
                        <View style={styles.blockDesc}>
                            <Icon name='map-marker' size={35} color='#c62828'/>
                            <View style={styles.nextToColumn}>
                                <Text style={styles.greySmall}>ปลายทาง</Text>
                                <Text>{destination}</Text>
                            </View>
                        </View>
                    </View>
              
                    <Image style={styles.cardImg} source={{uri: imageURL}} 
                    style={{width: "100%", height: 200}} />

                    <View style={styles.viewRow}>
                        <Icon name='clock-o' size={35} color='#28288C'/>
                        <View style={styles.nextToColumn}>
                            <Text style={styles.greySmall}>วันที่-เวลา</Text>
                            <Text>{date}</Text>
                        </View>
                    </View>
  
                    <View style={styles.viewRow}>
                        <View style={styles.blockTwoColumn}>
                            <Icon name='street-view' size={35} color='#28288C'/>
                            <View style={styles.nextToColumn}>
                                <Text style={styles.greySmall}>จำนวนที่นั่ง</Text>
                                <Text>{seat} ที่นั่ง</Text>
                            </View>
                        </View>
                        <View style={styles.blockTwoColumn}>
                            <Icon name='btc' size={35} color='#28288C'/>
                            <View style={styles.nextToColumn}>
                                <Text style={styles.greySmall}>ราคาต่อที่นั่ง</Text>
                                <Text>{price_seat} ฿</Text>
                            </View>
                        </View>
                    </View>
                   
                    <View style={styles.viewRow}>
                        <View style={styles.blockTwoColumn}>
                            <Icon name='car' size={35} color='#28288C'/>
                            <View style={styles.nextToColumn}>
                                <Text style={styles.greySmall}>ยี่ห้อรถ</Text>
                                <Text>TOYOTA</Text>
                            </View>
                        </View>
                        <View style={styles.blockTwoColumn}>
                            <Icon name='car' size={35} color='#28288C'/>
                            <View style={styles.nextToColumn}>
                                <Text style={styles.greySmall}>รุ่น</Text>
                                <Text>Altis</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.viewRow}>
                        <View style={styles.blockTwoColumn}>
                            <Icon name='address-card-o' size={35} color='#28288C'/>
                            <View style={styles.nextToColumn}>
                                <Text style={styles.greySmall}>ทะเบียนรถ</Text>
                                <Text>xx xxxx</Text>
                            </View>
                        </View>
                        <View style={styles.blockTwoColumn}>
                            <Icon name="paint-brush" size={35} color='#28288C'/>
                            <View style={styles.nextToColumn}>
                                <Text style={styles.greySmall}>สีรถ</Text>
                                <Text>ขาว</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.viewRow}>
                        <Icon name='comment' size={35} color='#28288C'/>
                        <View style={styles.nextToColumn}>
                            <Text style={styles.greySmall}>รายละเอียด</Text>
                            <Text>{description}</Text>
                        </View>
                    </View>

                    {(new Date() < new Date(date.substring(13,17)+"-"+date.substring(10,12)+"-"+date.substring(7,9)))
                        && (user_id != userLogin_id) 
                        && (findUserJoin(user_join,userLogin_id) == false) 
                        && (book_seat != seat)
                        &&
                    <Button round uppercase color="#0097a7"
                    onPress={join}>ร่วมเดินทาง</Button> }

                    {/* ไม่ใช่เจ้าของโพส และกดปุ่มร่วมเดินทางแล้ว */}
                    {(new Date() < new Date(date.substring(13,17)+"-"+date.substring(10,12)+"-"+date.substring(7,9)))
                        &&(user_id != userLogin_id) && (findUserJoin(user_join,userLogin_id) == true) &&    
                        <Button round uppercase color="#616161" disable={true}
                        >ร่วมเดินทางแล้ว</Button>
                    }


                    {(new Date() < new Date(date.substring(13,17)+"-"+date.substring(10,12)+"-"+date.substring(7,9)))
                        && (user_id != userLogin_id) 
                        && (findUserJoin(user_join,userLogin_id) == false) 
                        && (book_seat == seat)
                        &&
                    <Button round uppercase color="#b71c1c" disable={true}
                    >เต็ม</Button> }

                    {
                        (new Date() > new Date(date.substring(13,17)+"-"+date.substring(10,12)+"-"+date.substring(7,9)))
                        && <Button round uppercase color="#616161" disable={true}>ถึงวันเดินทางแล้ว</Button>
                    }

             
                    

            </View>
        </ScrollView>

        </View>

    );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  viewName: {
    flexDirection:'row',
    // alignItems: 'center',
    justifyContent: 'flex-start', 
    // flex: 1,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft: 20,
    borderBottomWidth: 2,
    borderBottomColor:'#616161',
    width:'100%',
},
profile: {
  marginLeft:20,
},
textUsername: {
    fontSize: 20,
    fontWeight: "bold",
},
textFullname: {
    fontSize: 15,
},
ViewDesc: {
    flexDirection:'row',
    marginBottom: 10,
},
blockDesc: {
    marginLeft: 10,
    marginTop: 10,
    flexDirection:'row',
    width:"30%",
},
nextToColumn: {
    flexDirection: 'column',
    marginLeft: 10
},
greySmall: {
    fontSize:13,
    color:"#616161"
},
textGoTo: {
    marginTop:10,
    left: 43,
    fontSize: 13,
    color:"#616161"
},
viewRow: {
    flexDirection:'row',
    paddingTop: 10,
    width: "100%",
    paddingLeft: 20,
    borderBottomWidth: 2,
    borderBottomColor:'#616161',
    paddingBottom: 10,
},
blockTwoColumn: {
    flexDirection:'row',
    width:"50%",
},
fontBold: {
    fontWeight: 'bold',
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
    width: "88%",
    // borderColor: "white",
    // borderWidth: 4,
},
row: {
    flexDirection: "row",
}
});