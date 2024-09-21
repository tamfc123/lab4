import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../theme/colors'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: colors.bg}}>
        <View className="flex-1 flex justify-around my-4">
          <Text className="text-gray-600 font-bold text-4xl text-center">Welcome!</Text>
          <View className="flex-row justify-center">
            <Image source={require("../assets/images/welcome.png")}
              style={{width: 350, height: 350}}/>
          </View>
          <View className="space-y-4">
            <TouchableOpacity 
              onPress={()=> navigation.navigate('SignUp')}
              className="py-3 mx-7 rounded-xl" 
              style={{backgroundColor: colors.bt}}>
              <Text className="text-xl font-bold text-center text-white">Sign Up</Text>
            </TouchableOpacity>
            <View className="flex-row justify-center">
              <Text className="text-gray-600 font-semibold">Already have an account?</Text>
              <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                <Text 
                  className="font-semibold" 
                  style={{color: colors.bt}}> 
                  Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

    </SafeAreaView>
  )
}