import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../theme/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import {auth} from '../config/firebase'
import Toast from 'react-native-toast-message'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
GoogleSignin.configure({
  webClientId: '716742929709-kc1cjqaa2md19i34ddch02hphea5ka1q.apps.googleusercontent.com', // From your Google Cloud Console
  //androidClientId: '625060658238-8ra0p9hdoa7m2v5tvclhpr6vrevvpk7n.apps.googleusercontent.com',
  offlineAccess: true,
});
export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({email:'', password:''});
  //funtion login
  const handleLogin = async() => {
    let check = true;
    let newer = {email: '', password: ''};
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
    if(check) {
      try{
        const uselogin = await signInWithEmailAndPassword(auth, email, password);
        const user = uselogin.user;
        console.log('User signed in:', user);
      }catch(err){
        if(err.code === 'auth/invalid-credential'){
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error',
            text2: 'Email and password are required',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 50,
            bottomOffset: 30,
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
          });
        }
      }
    } 
  };
  useEffect(() =>{
    GoogleSignin.hasPlayServices().then(()=>{
      return GoogleSignin.getCurrentUser();
    }).then(user => {
      console.log('Current user:', user);
    }).catch(error => {
      console.error('Error checking user:', error);
    });
  },[]);
  //funtion login with google
  const handleGoogleLogin = async() => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const credential = GoogleAuthProvider.credential(idToken);
      const user = await signInWithCredential(auth, credential);
      console.log('User signed in with Google:', user.user);
    } catch (error) {
      console.log('Error signing in with Google:', error);
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
            source={require('../assets/images/login.png')}
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
          {/*password */}
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
            className="flex items-end mb-5"
            onPress={() => navigation.navigate('ResetPassWord')}
            >
            <Text 
              className="font-semibold text-base"
              style={{color: colors.bt}}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          {/*Button login */}
          <TouchableOpacity 
            className="py-3 rounded-xl" 
            style={{backgroundColor: colors.bt}}
            onPress={handleLogin}
          >
            <Text className="text-xl font-bold text-center text-white">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-600 font-bold text-center py-5">Or</Text>
        <View className="flex-row justify-center space-x-8">
          <TouchableOpacity 
            className="p-2 bg-gray-100 rounded-2xl"
            onPress={handleGoogleLogin}
            >
            <Image 
              source={require('../assets/images/googleicon.png')}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image 
              source={require('../assets/images/facebookicon.png')}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image 
              source={require('../assets/images/twittericon.png')}
              className="w-10 h-10"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-600 font-semibold">Don't have an account?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
            <Text 
              className="font-semibold" 
              style={{color: colors.bt}}> 
              SignUp</Text>
          </TouchableOpacity>
        </View>
        <Toast/>
      </View>
    </View>
  )
}