import { View, Text, Button, Alert } from 'react-native'
import React from 'react'
import {auth} from '../config/firebase'
import {signOut} from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
export default function HomeScreen() {
  const navigation = useNavigation();
  const handleLogout = async() =>{
    try{
      await signOut(auth);
      console.log('User signed out');
      Alert.alert(
          'Thông báo', 
          'Bạn đã đăng xuất',
          [{text: 'OK', onPress: () => navigation.navigate('Login') } ]
      );
    }catch(err){
      console.error('Error signing out:', err);
    }
  };
  return (
    <View className="flex-1 justify-center items-center">
      <Button title='Logout' onPress={handleLogout}/>
    </View>
  )
}