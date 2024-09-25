import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import colors from '../theme/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../config/firebase'
import Toast from 'react-native-toast-message'
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({name: '', email: '', password: ''});

  const handleSignUp = async ()=>{
    let check = true;
    let newer = {name: '', email: '', password: ''};
    if(!name){
      newer.name = 'Name is required';
      check = false;
    }
    if(!email){
      newer.email = 'Email is required';
      check = false;
    }else if(!/\S+@\S+\.\S+/.test(email)){
      newer.email = 'Invalid email format';
      check = false;
    }
    if(!password){
      newer.password = 'Password is required';
      check = false;
    }else if(password.length < 6){
      newer.password = 'Password must be at least 6 characters long';
      check = false;
    }
    setError(newer);
    if(check){
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('User created successfully');
      } catch (error) {
        console.log('error: ',error);
      }
    }
  }
  return (
    <View className="flex-1" style={{backgroundColor: colors.bg}}>
      <Toast/>
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
            value={name}
            onChangeText={setName}
            placeholder='Enter name'
          />
          {error.name ? (
              <Text className="text-red-500 ml-4">{error.name}</Text>
          ) : null}
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
          <Text className="ml-4 text-gray-600 text-base">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 rounded-2xl text-base"
            secureTextEntry
            value={password}
            onChangeText={value=>setPassword(value)}
            placeholder='Enter password'
          />
          {error.password ? (
              <Text className="text-red-500 ml-4">{error.password}</Text>
          ) : <View className="mb-3"></View>}
          <TouchableOpacity 
            className="py-3 rounded-xl" 
            style={{backgroundColor: colors.bt}}
            onPress={handleSignUp}
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