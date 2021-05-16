import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const AuthProvider = ({navigation}) => {

  const { colors } = useTheme();
  const theme = useTheme();
  
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      // <View>
      //   <Text>Login</Text>
      //   <Button
      //       title="Login"
      //       onPress={() => navigation.navigate('เข้าสู่ระบบ')}
      //   />
      // </View>
      <NavigationContainer>
        
      </NavigationContainer>
    );
  }

  
    return (
        <View>
        <Text>Welcome {user.email}</Text>
        <Button
            title="Logout"
            onPress={() => { 
                        
              auth()
              .signOut()
              .then(() => console.log('User signed out!'));
              
              props.navigation.navigate('เข้าสู่ระบบ') 
          }}
        />
      </View>
    );
};

export default AuthProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});