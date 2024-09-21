import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import colors from '../theme/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../config/firebase'
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async ()=>{
    if(email && password){
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log('error: ',error);
      }
    }
  }
  return (
    <View className="flex-1" style={{backgroundColor: colors.bg}}>
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
            source={require('../assets/images/signup.png')}
            style={{width: 170, height: 150}}
          />
        </View>
      </SafeAreaView>
      <View 
        className="flex-1 bg-white px-8 pt-8">
        <View className="form space-y-2">
        <Text className="ml-4 text-gray-600 text-base">Full Name</Text>
          <TextInput
            className="p-4 bg-gray-100 rounded-2xl mb-3 text-base"
            
            placeholder='Enter name'
          />
          <Text className="ml-4 text-gray-600 text-base">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 rounded-2xl mb-3 text-base"
            value={email}
            onChangeText={value=>setEmail(value)}
            placeholder='Enter email'
          />
          <Text className="ml-4 text-gray-600 text-base">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 rounded-2xl text-base mb-5"
            secureTextEntry
            value={password}
            onChangeText={value=>setPassword(value)}
            placeholder='Enter password'
          />
          <TouchableOpacity 
            className="py-3 rounded-xl" 
            style={{backgroundColor: colors.bt}}
            onPress={handleSubmit}
          >
            <Text className="text-xl font-bold text-center text-white">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-600 font-semibold">Already have an account?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
            <Text 
              className="font-semibold" 
              style={{color: colors.bt}}> 
              Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}