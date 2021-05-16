import React from 'react';
import { View, Text, Button, Image,  StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({ selected }) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return(
        <View
            style={{
                width: 5,
                height: 5,
                marginHorizontal: 3,
                backgroundColor
            }}
        
        />
    )
}

const Skip = ({ ...props }) => (
    <TouchableOpacity 
        style={{ marginHorizontal:8 }}
        { ...props }
    >
    <Text 
        style ={{ fontSize: 16}}>ข้าม</Text>
</TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity 
         style={{ marginHorizontal:8 }}
        { ...props }
    >
    <Text 
        style ={{ fontSize: 16}}>ต่อไป</Text>
    </TouchableOpacity>
);

const Done = ({ ...props }) => (
    <TouchableOpacity 
        style={{ marginHorizontal:8 }}
        { ...props }
        >
        <Text 
        style ={{ fontSize: 16}}>เสร็จสิ้น</Text>
    </TouchableOpacity>
);  


const OnboardingScreen = ({ navigation }) => {
    return (
        <Onboarding 
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.navigate('หน้าแรก') }
        onDone={() => navigation.navigate('หน้าแรก') }
        pages={[
            {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/onboarding/onboarding1.png')} />,
                title: 'เพื่อนร่วมเดินทาง',
                subtitle: 'คุณจะได้พบเจอกับเพื่อนร่วมเดินทางมากมาย',
            },
            {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/onboarding/onboarding2.png')} />,
                title: 'ช่วยแชร์ค่าน้ำมัน',
                subtitle: 'หาใครสักคนมาช่วยคุณแชร์ค่าน้ำมันสิ',
                },
            {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/onboarding/onboarding3.png')} />,
                title: 'บริหารเวลาเดินทาง',
                subtitle: 'คุณสามารถไปถึงที่ทำงานเร็วและประหยัดเงินได้ด้วย',
                },         
        ]}
        />
       
    );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});