import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Button, Input} from 'galio-framework';
import {ScrollView} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import database, {firebase} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
const CreatePostScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const user = auth().currentUser;
  var user_id = '';
  if (user) {
    // console.log('InCreatePost User id: ', user.uid);
    user_id = user.uid;
  } else {
    console.log('User not signed in');
  }
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  const [Id, setId] = useState();
  const [source, SetSource] = useState('');
  const [destination, SetDestination] = useState('');
  const [price_seat, SetPriceSeat] = useState('');
  const [seat, SetSeat] = useState('');
  const [book_seat, SetBookSeat] = useState('');
  const [description, SetDescription] = useState('');
  const [photo, SetPhoto] = useState(null);
  const [isVisible, setIsVisible] = useState(false); //visible choose datetime
  const [chosenDate, SetChosenDate] = useState('วันที่ ---------- --:-- น.');
  const [selectedImage, setSelectedImage] = useState({
    uri:
      'https://firebasestorage.googleapis.com/v0/b/sharetravelexpenses.appspot.com/o/defaultImages%2Fphoto-coming-soon-picture-frame_100456-411.jpg?alt=media&token=5c36caf6-4261-4b10-a7ec-0e50a1b8bc12',
  });
  const [car_detail,SetCarDetail] = useState([]);   //id car detail

  const today = new Date();
  let tomorrow =  new Date();
  let nextmonth = new Date();
  tomorrow.setDate(today.getDate() + 1)
  nextmonth.setDate(today.getDate() + 30)

  const theme = useTheme();
  const postsCollectionRef = firestore().collection('posts');

  const savePosts = () => {
    if (
      source &&
      destination &&
      seat &&
      price_seat &&
      chosenDate != 'วันที่ ---------- --:-- น.'
    ) {
      if (photo) {
        const fileNameRandom =
          'posts' +
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        const fileName = `${fileNameRandom}`;
        console.log('filename: ' + fileName);
        var storageRef = storage().ref(`postsImage/${fileName}`);
        const task = storageRef.putFile(photo);
        task.on(
          storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            console.log('snapshot: ' + snapshot);
            console.log(
              'progress: ' +
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            if (snapshot.state === storage.TaskState.SUCCESS) {
              console.log('success');
            }
          },
          (error) => {
            // unsubscribe();
            console.log('image upload error: ' + error.toString());
          },
        );
        task.then((imageSnapshot) => {
          storage()
            .ref(imageSnapshot.metadata.fullPath)
            .getDownloadURL()
            .then((downloadURL) => {
              console.log('url: ' + downloadURL);
              addPostWithImage(downloadURL);
            });
        });
      } else {
        console.log('skipping image upload');
           postsCollectionRef
        .add({
          source: source,
          destination: destination,
          book_seat: 0, //ที่นั่งที่จองแล้ว
          seat: seat, //ที่นั่งทั้งหมด
          price_seat: price_seat,
          description: description,
          date: chosenDate,
          imageURL: 'https://firebasestorage.googleapis.com/v0/b/sharetravelexpenses.appspot.com/o/defaultImages%2Fphoto-coming-soon-picture-frame_100456-411.jpg?alt=media&token=5c36caf6-4261-4b10-a7ec-0e50a1b8bc12',
          createdAt: firestore.FieldValue.serverTimestamp(),
          user_id: user_id,
          user_join: [],
          car_detail_id : car_detail,

        })
        .then((result) => {
          Alert.alert(
            'สร้างโพสต์หาผู้ร่วมเดินทางสำเร็จ',
            'ดูโพสต์ได้ที่หน้าค้นหาการเดินทาง',
            [{text: 'ตกลง', onPress: () => navigation.navigate('ค้นหา')}],
          );
         
          setId(null);
          SetSeat('');
          SetPriceSeat('');
          SetDescription('');
          SetSource('');
          SetDestination('');
          SetPhoto(null);
          SetChosenDate('วันที่ ---------- --:-- น.');
          setSelectedImage({
            uri:
              'https://firebasestorage.googleapis.com/v0/b/sharetravelexpenses.appspot.com/o/defaultImages%2Fphoto-coming-soon-picture-frame_100456-411.jpg?alt=media&token=5c36caf6-4261-4b10-a7ec-0e50a1b8bc12',
          });
          navigation.navigate('ค้นหา')
        })
        .catch((error) => {
          console.log('error: ' + error);
        });
      }
    } else {
      Alert.alert('กรอกข้อมูลไม่ครบ', 'กรุณากรอกข้อมูลให้ครบ', [
        {text: 'ตกลง'},
      ]);
    }
  };

  function addPostWithImage(downloadURL) {
    postsCollectionRef
    .add({
      source: source,
      destination: destination,
      book_seat: 0, //ที่นั่งที่จองแล้ว
      seat: seat, //ที่นั่งทั้งหมด
      price_seat: price_seat,
      description: description,
      date: chosenDate,
      imageURL: downloadURL,
      createdAt: firestore.FieldValue.serverTimestamp(),
      user_id: user_id,
      user_join: [],
      car_detail_id : car_detail,
    })
    .then((result) => {
      Alert.alert(
        'สร้างโพสต์หาผู้ร่วมเดินทางสำเร็จ',
        'ดูโพสต์ได้ที่หน้าค้นหาการเดินทาง',
        [{text: 'ตกลง', onPress: () => navigation.navigate('ค้นหา')}],
      );
      setId(null);
      SetSeat('');
      SetPriceSeat('');
      SetDescription('');
      SetSource('');
      SetDestination('');
      SetPhoto(null);
      SetChosenDate('วันที่ ---------- --:-- น.');
      setSelectedImage({
        uri:
          'https://firebasestorage.googleapis.com/v0/b/sharetravelexpenses.appspot.com/o/defaultImages%2Fphoto-coming-soon-picture-frame_100456-411.jpg?alt=media&token=5c36caf6-4261-4b10-a7ec-0e50a1b8bc12',
      });
    })
    .catch((error) => {
      console.log('error: ' + error);
    });   
  }
  useEffect(() => {
    if (photo) {
      console.log('useEffect: ' + photo);
      setSelectedImage({uri: photo});
    }

    const detailsCollectionRef = firestore().collection('car_details');
    let carDetailId = '';

    detailsCollectionRef.onSnapshot(querySnapShot => {    
      querySnapShot.forEach(doc => {
        if(doc.data().user_id == user_id) {
          SetCarDetail(doc.id);
        }
      })
    })
  }, [photo]);
  handlePicker = (datetime) => {
    //confirm
    setIsVisible(false);
    SetChosenDate(moment(datetime).format('วันที่ DD-MM-YYYY HH:mm น.'));
  };
  hidePicker = (datetime) => {
    //cancle
    setIsVisible(false);
  };
  showPicker = () => {
    setIsVisible(true);
  };

  back = () => {
    setId(null);
    SetBookSeat('');
    SetSeat('');
    SetPriceSeat('');
    SetDescription('');
    SetSource('');
    SetDestination('');
    SetChosenDate('วันที่ ---------- --:-- น.');
    SetPhoto(null);
    setSelectedImage({
      uri:
        'https://firebasestorage.googleapis.com/v0/b/sharetravelexpenses.appspot.com/o/defaultImages%2Fphoto-coming-soon-picture-frame_100456-411.jpg?alt=media&token=5c36caf6-4261-4b10-a7ec-0e50a1b8bc12',
    });
    navigation.navigate('หน้าแรก');
  }
  handleChoosePhoto = () => {
    ImagePicker.showImagePicker(
      {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
      (response) => {
        if (response.error) {
          console.log('image error');
        } else {
          if(response.uri == undefined) {
            console.log('Image Undefined: ' + response.uri);
          } else {
            console.log('Image: ' + response.uri);
            setSelectedImage({uri: response.uri});
            setPostImage({uri: response.uri});
          }
        }
      },
    );
  };
  setPostImage = (image) => {
    SetPhoto(image.uri);
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={styles.topTab}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
                Alert.alert(
                  'กลับไปหน้าหลัก',
                  'โพสต์จะไม่ถูกบันทึก',
                  [
                    { text: 'ยกเลิก', onPress: () => console.log('ยกเลิก') },
                    {text: 'ตกลง', onPress: () => back()}
                  ]
                );
            }}>
            <Icon
              name="chevron-left"
              color={'#FFF'}
              size={20}
              style={styles.optionTab}
            />
          </TouchableOpacity>
          <View style={styles.ViewTitleOnTab}>
            <Text style={styles.titleOnTab}>เพิ่มเส้นทาง</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.styleScrollView}>
        <View style={styles.viewInput}>
          <View style={styles.textLabel}>
            <Text>{'\n'}จุดเริ่มต้น</Text>
          </View>
          <DropDownPicker
            items={[
              {label: 'กระบี่', value: 'กระบี่'},
              {label: 'กรุงเทพ', value: 'กรุงเทพ'},
              {label: 'กาญจนบุรี', value: 'กาญจนบุรี'},
              {label: 'กาฬสินธุ์', value: 'กาฬสินธุ์'},
              {label: 'กำแพงเพชร', value: 'กำแพงเพชร'},
              {label: 'ขอนแก่น', value: 'ขอนแก่น'},
              {label: 'จันทบุรี', value: 'จันทบุรี'},
              {label: 'ฉะเชิงเทรา', value: 'ฉะเชิงเทรา'},
              {label: 'ชลบุรี', value: 'ชลบุรี'},
              {label: 'ชัยนาท', value: 'ชัยนาท'},
              {label: 'ชัยภูมิ', value: 'ชัยภูมิ'},
              {label: 'ชุมพร', value: 'ชุมพร'},
              {label: 'ตรัง', value: 'ตรัง'},
              {label: 'ตราด', value: 'ตราด'},
              {label: 'ตาก', value: 'ตาก'},
              {label: 'นครนายก', value: 'นครนายก'},
              {label: 'นครปฐม', value: 'นครปฐม'},
              {label: 'นครพนม', value: 'นครพนม'},
              {label: 'นครราชสีมา', value: 'นครราชสีมา'},
              {label: 'นครศรีธรรมราช', value: 'นครศรีธรรมราช'},
              {label: 'นครสวรรค์', value: 'นครสวรรค์'},
              {label: 'นนทบุรี', value: 'นนทบุรี'},
              {label: 'นราธิวาส', value: 'นราธิวาส'},
              {label: 'น่าน', value: 'น่าน'},
              {label: 'บึงกาฬ', value: 'บึงกาฬ'},
              {label: 'บุรีรัมย์', value: 'บุรีรัมย์'},
              {label: 'ปทุมธานี', value: 'ปทุมธานี'},
              {label: 'ประจวบคีรีขันธ์', value: 'ประจวบคีรีขันธ์'},
              {label: 'ปราจีนบุรี', value: 'ปราจีนบุรี'},
              {label: 'ปัตตานี', value: 'ปัตตานี'},
              {label: 'พระนครศรีอยุธยา', value: 'พระนครศรีอยุธยา'},
              {label: 'พะเยา', value: 'พะเยา'},
              {label: 'พังงา', value: 'พังงา'},
              {label: 'พัทลุง', value: 'พัทลุง'},
              {label: 'พิจิตร', value: 'พิจิตร'},
              {label: 'พิษณุโลก', value: 'พิษณุโลก'},
              {label: 'ภูเก็ต', value: 'ภูเก็ต'},
              {label: 'มหาสารคาม', value: 'มหาสารคาม'},
              {label: 'มุกดาหาร', value: 'มุกดาหาร'},
              {label: 'ยะลา', value: 'ยะลา'},
              {label: 'ยโสธร', value: 'ยโสธร'},
              {label: 'ระนอง', value: 'ระนอง'},
              {label: 'ระยอง', value: 'ระยอง'},
              {label: 'ราชบุรี', value: 'ราชบุรี'},
              {label: 'ร้อยเอ็ด', value: 'ร้อยเอ็ด'},
              {label: 'ลพบุรี', value: 'ลพบุรี'},
              {label: 'ลำปาง', value: 'ลำปาง'},
              {label: 'ลำพูน', value: 'ลำพูน'},
              {label: 'ศรีสะเกษ', value: 'ศรีสะเกษ'},
              {label: 'สกลนคร', value: 'สกลนคร'},
              {label: 'สงขลา', value: 'สงขลา'},
              {label: 'สตูล', value: 'สตูล'},
              {label: 'สมุทรปราการ', value: 'สมุทรปราการ'},
              {label: 'สมุทรสงคราม', value: 'สมุทรสงคราม'},
              {label: 'สมุทรสาคร', value: 'สมุทรสาคร'},
              {label: 'สระบุรี', value: 'สระบุรี'},
              {label: 'สระแก้ว', value: 'สระแก้ว'},
              {label: 'สิงห์บุรี', value: 'สิงห์บุรี'},
              {label: 'สุพรรณบุรี', value: 'สุพรรณบุรี'},
              {label: 'สุราษฎร์ธานี', value: 'สุราษฎร์ธานี'},
              {label: 'สุรินทร์', value: 'สุรินทร์'},
              {label: 'สุโขทัย', value: 'สุโขทัย'},
              {label: 'หนองคาย', value: 'หนองคาย'},
              {label: 'หนองบัวลำพูน', value: 'หนองบัวลำพูน'},
              {label: 'อำนาจเจริญ', value: 'อำนาจเจริญ'},
              {label: 'อุดรธานี', value: 'อุดรธานี'},
              {label: 'อุตรดิตถ์', value: 'อุตรดิตถ์'},
              {label: 'อุทัยธานี', value: 'อุทัยธานี'},
              {label: 'อุบลราชธานี', value: 'อุบลราชธานี'},
              {label: 'อ่างทอง', value: 'อ่างทอง'},
              {label: 'เชียงใหม่', value: 'เชียงใหม่'},
              {label: 'เชียงราย', value: 'เชียงราย'},
              {label: 'เพชรบุรี', value: 'เพชรบุรี'},
              {label: 'เพชรบูรณ์', value: 'เพชรบูรณ์'},
              {label: 'เลย', value: 'เลย'},
              {label: 'แพร่', value: 'แพร่'},
              {label: 'แม่ฮ่องสอน', value: 'แม่ฮ่องสอน'},
            ]}
            containerStyle={{height: 50}}
            onChangeItem={(item) => console.log(item.label, item.value)}
            defaultNull
            placeholder="เลือกจังหวัดต้นทาง"
            labelStyle={{fontSize: 14, color: '#616161'}}
            activeLabelStyle={{color: '#616161', fontWeight: 'bold'}}
            activeItemStyle={{backgroundColor: '#eeeeee'}}
            onChangeItem={(item) => SetSource(item.value)}
            searchable={true}
            searchablePlaceholder="ค้นหาจังหวัด"
            searchableError={() => <Text>ไม่พบจังหวัดที่ค้นหา</Text>}
          />
          <View style={styles.textLabel}>
            <Text>{'\n'}ปลายทาง</Text>
          </View>
          <DropDownPicker
            items={[
              {label: 'กระบี่', value: 'กระบี่'},
              {label: 'กรุงเทพ', value: 'กรุงเทพ'},
              {label: 'กาญจนบุรี', value: 'กาญจนบุรี'},
              {label: 'กาฬสินธุ์', value: 'กาฬสินธุ์'},
              {label: 'กำแพงเพชร', value: 'กำแพงเพชร'},
              {label: 'ขอนแก่น', value: 'ขอนแก่น'},
              {label: 'จันทบุรี', value: 'จันทบุรี'},
              {label: 'ฉะเชิงเทรา', value: 'ฉะเชิงเทรา'},
              {label: 'ชลบุรี', value: 'ชลบุรี'},
              {label: 'ชัยนาท', value: 'ชัยนาท'},
              {label: 'ชัยภูมิ', value: 'ชัยภูมิ'},
              {label: 'ชุมพร', value: 'ชุมพร'},
              {label: 'ตรัง', value: 'ตรัง'},
              {label: 'ตราด', value: 'ตราด'},
              {label: 'ตาก', value: 'ตาก'},
              {label: 'นครนายก', value: 'นครนายก'},
              {label: 'นครปฐม', value: 'นครปฐม'},
              {label: 'นครพนม', value: 'นครพนม'},
              {label: 'นครราชสีมา', value: 'นครราชสีมา'},
              {label: 'นครศรีธรรมราช', value: 'นครศรีธรรมราช'},
              {label: 'นครสวรรค์', value: 'นครสวรรค์'},
              {label: 'นนทบุรี', value: 'นนทบุรี'},
              {label: 'นราธิวาส', value: 'นราธิวาส'},
              {label: 'น่าน', value: 'น่าน'},
              {label: 'บึงกาฬ', value: 'บึงกาฬ'},
              {label: 'บุรีรัมย์', value: 'บุรีรัมย์'},
              {label: 'ปทุมธานี', value: 'ปทุมธานี'},
              {label: 'ประจวบคีรีขันธ์', value: 'ประจวบคีรีขันธ์'},
              {label: 'ปราจีนบุรี', value: 'ปราจีนบุรี'},
              {label: 'ปัตตานี', value: 'ปัตตานี'},
              {label: 'พระนครศรีอยุธยา', value: 'พระนครศรีอยุธยา'},
              {label: 'พะเยา', value: 'พะเยา'},
              {label: 'พังงา', value: 'พังงา'},
              {label: 'พัทลุง', value: 'พัทลุง'},
              {label: 'พิจิตร', value: 'พิจิตร'},
              {label: 'พิษณุโลก', value: 'พิษณุโลก'},
              {label: 'ภูเก็ต', value: 'ภูเก็ต'},
              {label: 'มหาสารคาม', value: 'มหาสารคาม'},
              {label: 'มุกดาหาร', value: 'มุกดาหาร'},
              {label: 'ยะลา', value: 'ยะลา'},
              {label: 'ยโสธร', value: 'ยโสธร'},
              {label: 'ระนอง', value: 'ระนอง'},
              {label: 'ระยอง', value: 'ระยอง'},
              {label: 'ราชบุรี', value: 'ราชบุรี'},
              {label: 'ร้อยเอ็ด', value: 'ร้อยเอ็ด'},
              {label: 'ลพบุรี', value: 'ลพบุรี'},
              {label: 'ลำปาง', value: 'ลำปาง'},
              {label: 'ลำพูน', value: 'ลำพูน'},
              {label: 'ศรีสะเกษ', value: 'ศรีสะเกษ'},
              {label: 'สกลนคร', value: 'สกลนคร'},
              {label: 'สงขลา', value: 'สงขลา'},
              {label: 'สตูล', value: 'สตูล'},
              {label: 'สมุทรปราการ', value: 'สมุทรปราการ'},
              {label: 'สมุทรสงคราม', value: 'สมุทรสงคราม'},
              {label: 'สมุทรสาคร', value: 'สมุทรสาคร'},
              {label: 'สระบุรี', value: 'สระบุรี'},
              {label: 'สระแก้ว', value: 'สระแก้ว'},
              {label: 'สิงห์บุรี', value: 'สิงห์บุรี'},
              {label: 'สุพรรณบุรี', value: 'สุพรรณบุรี'},
              {label: 'สุราษฎร์ธานี', value: 'สุราษฎร์ธานี'},
              {label: 'สุรินทร์', value: 'สุรินทร์'},
              {label: 'สุโขทัย', value: 'สุโขทัย'},
              {label: 'หนองคาย', value: 'หนองคาย'},
              {label: 'หนองบัวลำพูน', value: 'หนองบัวลำพูน'},
              {label: 'อำนาจเจริญ', value: 'อำนาจเจริญ'},
              {label: 'อุดรธานี', value: 'อุดรธานี'},
              {label: 'อุตรดิตถ์', value: 'อุตรดิตถ์'},
              {label: 'อุทัยธานี', value: 'อุทัยธานี'},
              {label: 'อุบลราชธานี', value: 'อุบลราชธานี'},
              {label: 'อ่างทอง', value: 'อ่างทอง'},
              {label: 'เชียงใหม่', value: 'เชียงใหม่'},
              {label: 'เชียงราย', value: 'เชียงราย'},
              {label: 'เพชรบุรี', value: 'เพชรบุรี'},
              {label: 'เพชรบูรณ์', value: 'เพชรบูรณ์'},
              {label: 'เลย', value: 'เลย'},
              {label: 'แพร่', value: 'แพร่'},
              {label: 'แม่ฮ่องสอน', value: 'แม่ฮ่องสอน'},
            ]}
            containerStyle={{height: 50}}
            onChangeItem={(item) => console.log(item.label, item.value)}
            defaultNull
            placeholder="เลือกจังหวัดปลายทาง"
            labelStyle={{fontSize: 14, color: '#616161'}}
            activeLabelStyle={{color: '#616161', fontWeight: 'bold'}}
            activeItemStyle={{backgroundColor: '#eeeeee'}}
            onChangeItem={(item) => SetDestination(item.value)}
            searchable={true}
            searchablePlaceholder="ค้นหาจังหวัด"
            searchableError={() => <Text>ไม่พบจังหวัดที่ค้นหา</Text>}
          />

          <View style={styles.textLabel}>
            <Text>{'\n'}วันที่และเวลาเดินทาง</Text>
          </View>
          <Input
            // placeholder="วันที่ -------- เวลา --:-- น."
            left
            icon="calendar"
            family="antdesign"
            iconSize={30}
            iconColor="#616161"
            placeholderTextColor="#616161"
            value={chosenDate}
            editable={false}
          />
          <View style={styles.viewDate}>
            <TouchableOpacity style={styles.btnChooseDate} onPress={showPicker}>
              <Text style={styles.textChooseDay}>เลือกวันที่และเวลา</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            isVisible={isVisible}
            onConfirm={handlePicker}
            onCancel={hidePicker}
            mode={'datetime'}
            minimumDate={tomorrow}
            maximumDate={nextmonth}
          />
          <View style={styles.textLabel}>
            <Text>{'\n'}จำนวนที่นั่ง</Text>
          </View>
          <Input
            placeholder="ระบุจำนวนที่นั่ง"
            left
            icon="team"
            family="antdesign"
            iconSize={30}
            iconColor="#616161"
            placeholderTextColor="#616161"
            onChangeText={(text) => {
              SetSeat(text);
            }}
            value={seat}
            type="numeric"
          />
          <View style={styles.textLabel}>
            <Text>{'\n'}ราคาต่อที่นั่ง</Text>
          </View>
          <Input
            placeholder="ระบุราคาที่นั่ง"
            left
            icon="user"
            family="antdesign"
            iconSize={30}
            iconColor="#616161"
            placeholderTextColor="#616161"
            onChangeText={(text) => {
              SetPriceSeat(text);
            }}
            value={price_seat}
            type="numeric"
          />
          <View style={styles.textLabel}>
            <Text>{'\n'}เพิ่มรูปภาพ</Text>
          </View>

          <View style={styles.viewImage}>
            <TouchableOpacity  onPress={handleChoosePhoto}>
              <View style={{
                            height: 200,
                            width: 250,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
              }}>

              {selectedImage && (
                  <ImageBackground
                    source={{uri: selectedImage.uri}}
                    style={styles.previewImage}
                  >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                      <Icon name="camera" size={35} color="#fff" style={{
                          opacity: 0.7,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: '#fff',
                          borderRadius: 10,
                        }}/>
                    </View>
                  </ImageBackground>
                )}
                </View>
            </TouchableOpacity>
            {/* <Button color="#28288C" onPress={handleChoosePhoto}>
              <Text style={styles.textWhite}>
                <Icon name="image" color={'#fff'} size={15} />
                {'  '}เลือกรูปภาพ
              </Text>
            </Button> */}
          </View>
          <View style={styles.textLabel}>
            <Text>{'\n'}รายละเอียด</Text>
          </View>
          <Input
            multiline={true}
            numberOfLines={10}
            style={{height: 100}}
            placeholder="ระบุรายละเอียดเพิ่มเติมเกี่ยวกับจุดเริ่มต้นกับปลายทาง หรือรายละเอียดอื่นๆ"
            left
            icon="message1"
            family="antdesign"
            iconSize={30}
            iconColor="#616161"
            placeholderTextColor="#616161"
            onChangeText={(text) => {
              SetDescription(text);
            }}
            value={description}
          />
        </View>
        <View style={styles.viewSubmit}>
          <View style={styles.widthHalf}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'กลับไปหน้าหลัก',
                  'โพสต์จะไม่ถูกบันทึก',
                  [
                    { text: 'ยกเลิก', onPress: () => console.log('ยกเลิก') },
                    {text: 'ตกลง', onPress: () => back()}
                  ]
                );
              }}>
              <Text style={styles.optionBottom}>ยกเลิก</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.widthHalf}>
            <TouchableOpacity onPress={savePosts}>
              <Text style={styles.optionBottom}>โพสต์</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default CreatePostScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewInput: {
    width: '70%',
    alignSelf: 'center',
    flex: 1,
  },
  textLabel: {
    justifyContent: 'flex-start',
    width: '95%',
  },
  viewHalf: {
    width: '48%',
    marginHorizontal: 6,
  },
  styleScrollView: {
    width: '100%',
    flex: 1,
  },
  viewImage: {
    // marginTop: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  topTab: {
    width: '100%',
    color: '#FFF',
    backgroundColor: '#28288C',
  },
  optionTab: {
    paddingBottom: 17,
    paddingTop: 17,
    color: '#FFF',
    paddingLeft: 10,
  },
  titleOnTab: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  ViewTitleOnTab: {
    marginLeft: 45,
    marginTop: 15,
  },
  textWhite: {
    color: '#FFF',
  },
  btnChooseDate: {
    backgroundColor: '#28288c',
    borderRadius: 5,
    alignSelf: 'center',
    width: '60%',
    paddingVertical: 10,
  },
  textChooseDay: {
    color: '#FFF',
    alignSelf: 'center',
  },
  previewImage: {
    width: '100%',
    height: 150,
  },
  //bottom tab
  viewSubmit: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    color: '#FFF',
    flex: 1,
    marginTop: 10,
  },
  widthHalf: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#28288C',
  },
  optionBottom: {
    paddingBottom: 15,
    paddingTop: 15,
    color: '#FFF',
  },
});
