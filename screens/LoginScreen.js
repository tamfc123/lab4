import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import colors from '../theme/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
export default function LoginScreen() {
  const navigation = useNavigation();
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
            source={require('../assets/images/login.png')}
            style={{width: 200, height: 200}}
          />
        </View>
      </SafeAreaView>
      <View 
        className="flex-1 bg-white px-8 pt-8">
        <View className="form space-y-2">
          <Text className="ml-4 text-gray-600 text-base">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 rounded-2xl mb-3 text-base"
            
            placeholder='Enter email'
          />
          <Text className="ml-4 text-gray-600 text-base">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 rounded-2xl text-base"
            secureTextEntry
            placeholder='Enter password'
          />
          <TouchableOpacity className="flex items-end mb-5">
            <Text 
              className="font-semibold text-base"
              style={{color: colors.bt}}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="py-3 rounded-xl" 
            style={{backgroundColor: colors.bt}}
          >
            <Text className="text-xl font-bold text-center text-white">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-600 font-bold text-center py-5">Or</Text>
        <View className="flex-row justify-center space-x-8">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
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
      </View>
    </View>
  )
}