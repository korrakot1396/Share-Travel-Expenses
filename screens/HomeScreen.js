import React,{ useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

//import swiper สำหรับ slide picture
import Swiper from 'react-native-swiper';

import Icon from 'react-native-vector-icons/dist/FontAwesome';


//import Icon vector
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { ScrollView } from 'react-native-gesture-handler';
import StarRating from '../assets/components/StarRating';
import { color } from 'react-native-reanimated';
import firestore from '@react-native-firebase/firestore';


const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();

  const [idPost, setIdPost] = useState([]);
  const [postShow, setPostShow] = useState([]);
  
  useEffect(()=>{
    const postRef = firestore().collection('posts').orderBy("createdAt","desc");

    postRef.onSnapshot(querySnapShot => {
      let allposts = [];
      let allid = [];
      let allidshow = []
      let allshow = [];
      querySnapShot.forEach(doc => {
        if(doc.data().seat > doc.data().book_seat && ((new Date() < new Date(doc.data().date.substring(13,17)+"-"+doc.data().date.substring(10,12)+"-"+doc.data().date.substring(7,9))))) {
          allid.push(doc.id);    
          allposts.push(doc.data());
        }  
      })

      if(allposts.length > 0) {
        let indexPost1 = Math.floor(Math.random() * allposts.length);
        let indexPost2 = Math.floor(Math.random() * allposts.length);
        allshow.push(allposts[indexPost1]);
        allidshow.push(allid[indexPost1].id);
  
        if(indexPost1 != indexPost2) {
          allshow.push(allposts[indexPost2]);
          allidshow.push(allid[indexPost2].id);
        }
        setPostShow(allshow);
        setIdPost(allid);
      }
   
    })
  },[]);


  
    return (
      <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <View style={styles.slideContainer}>
        <Swiper autoplay height={200} activeDotColor="#FF6347">
          <View style={styles.slide}>
            <Image
              source={require('../assets/swipers/slide1.jpg')}
              resizeMode="cover"
              style={styles.slideImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/swipers/slide2.jpg')}
              resizeMode="cover"
              style={styles.slideImage}
            />
          </View>

          <View style={styles.slide}>
            <Image
              source={require('../assets/swipers/slide3.jpg')}
              resizeMode="cover"
              style={styles.slideImage}
            />
          </View>

          <View style={styles.slide}>
            <Image
              source={require('../assets/swipers/slide4.jpg')}
              resizeMode="cover"
              style={styles.slideImage}
            />
          </View>

          <View style={styles.slide}>
            <Image
              source={require('../assets/swipers/slide5.jpg')}
              resizeMode="cover"
              style={styles.slideImage}
            />
          </View>
        </Swiper>
        </View>

        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
             <Ionicons name="car-sport" size={35} color="#B4B4FF"/>
          </View>
             <Text style={styles.categoryBtnTxt}>เดินทาง</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
             <FontAwesome name="taxi" size={35} color="#B4B4FF"/>
          </View>
             <Text style={styles.categoryBtnTxt}>หารแท็กซี่</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
             <MaterialCommunityIcons name="wallet-travel" size={35} color="#B4B4FF"/>
          </View>
            <Text style={styles.categoryBtnTxt}>ประวัติ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
             <Ionicons name="star" size={35} color="#B4B4FF"/>
          </View>
            <Text style={styles.categoryBtnTxt}>แต้มสะสม</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
             <Ionicons name="location" size={35} color="#B4B4FF"/>
          </View>
            <Text style={styles.categoryBtnTxt}>ตำแหน่ง</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
             <FontAwesome5 name="route" size={35} color="#B4B4FF"/>
          </View>
           <Text style={styles.categoryBtnTxt}>เส้นทาง</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBtn} onPress={() => navigation.navigate("ค้นหา")} >
          <View style={styles.categoryIcon}>
             <FontAwesome name="search" size={35} color="#B4B4FF"/>
          </View>
            <Text style={styles.categoryBtnTxt}>ค้นหา</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
             <Fontisto name="preview" size={35} color="#B4B4FF"/>
          </View>
            <Text style={styles.categoryBtnTxt}>รายการ</Text>
          </TouchableOpacity>
        </View>

        { postShow.length > 2 &&
        <View style={styles.cardsWrapper}>
          <Text style = {{
            alignSelf: 'center',
            fontSize: 22,
            fontWeight: 'bold',
            color: '#333'
          }} >การเดินทางที่คุณอาจจะสนใจ</Text>

          { postShow.map((item,index) => 
            <View key={index}>
              <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('รายละเอียด',{ item: item, post_id: idPost[index]})}}>
                <View style={styles.cardImgWrapper}>
                  <Image 
                  source={{uri: item.imageURL}} 
                  resizeMode="cover" 
                  style={styles.cardImg}
                  />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>
                    <Icon name="map-marker" color={"#c62828"} size={15} />
                    {' '}{item.source}{' '}-{' '}{item.destination}</Text>
                  {/* <StarRating ratings={4} reviews={99} /> */}
                </View>
              </TouchableOpacity>
            
          </View> 
          )
          }

        </View>
        }

      </View>
      </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  slideContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  slideImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,

  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
    color: '#28288C'
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#28288C',
    borderRadius: 50,
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
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
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff'
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,

  }

});