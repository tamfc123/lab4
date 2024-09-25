import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import colors from '../theme/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { sendPasswordResetEmail } from 'firebase/auth'
import {auth} from '../config/firebase'
import Toast from 'react-native-toast-message'
export default function ResetPassWordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState({email: ''});
  const navigation = useNavigation();
    //funtion reset password
  const handleResetPassword = async () => {
    let check = true;
    let newer = {email: ''};
    if(!email){
        newer.email = 'Email is required';
        check = false;
    }else if(!/\S+@\S+\.\S+/.test(email)){
        newer.email = 'Invalid email format';
        check = false;
    }
    setError(newer);
    try{
      await sendPasswordResetEmail(auth, email);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Please check the email address',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 30,
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
      });
    }catch(err){
      console.log("Error in resetting password: ", error);
      //alert("Failed to send reset email. Please check the email address and try again.");
    }
  };
    return (
        <View className="flex-1" style={{backgroundColor: colors.bg}}>
          {/*back */}
          <SafeAreaView className="flex">
            <View className="flex-row justify-start">
              <TouchableOpacity 
                onPress={() => {
                  navigation.goBack();
                }}
                className="bg-orange-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-3">
                <Icon name="arrow-left" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View className="flex-row justify-center">
              <Image 
                source={require('../assets/images/resetpassword.png')}
                style={{width: 200, height: 200}}
              />
            </View>
          </SafeAreaView>
          <View 
            className="flex-1 bg-white px-8 pt-8">
            <View className="form space-y-2">
              {/*email */}
              <Text className="ml-4 text-gray-600 text-base">Email Address</Text>
              <TextInput
                className="p-4 bg-gray-100 rounded-2xl mb-3 text-base"
                value={email}
                onChangeText={value=>setEmail(value)}
                placeholder='Enter email'
              />
              {error.email ? (
                  <Text className="text-red-500 ml-4">{error.email}</Text>
              ) : null}
              {/*Button login */}
              <TouchableOpacity 
                className="py-3 rounded-xl" 
                style={{backgroundColor: colors.bt}}
                onPress={handleResetPassword}
              >
                <Text className="text-xl font-bold text-center text-white">
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
            <Toast/>
          </View>
        </View>
      )
}