import {
  Image,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSubmit = () => {
    if (email && password) {
      // ready to add trip
      navigation.goBack();
      navigation.navigate('Home');
    } else {
      // Show error
    }
  };
  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative">
            <View className="absolute top-0 left-0">
              <BackButton />
            </View>

            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              Sign Up
            </Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="w-96 h-96"
              source={require('../assets/images/register.png')}
            />
          </View>
          <View>
            <Text className={`${colors.heading} text-lg font-bold my-2`}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={value => setEmail(value)}
              className="p-4 bg-white rounded-full mb-4"
            />
            <Text className={`${colors.heading} text-lg font-bold my-2`}>
              Password
            </Text>
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={value => setPassword(value)}
              className="p-4 bg-white rounded-full mb-4"
            />
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{backgroundColor: colors.button}}
            className="my-6 rounded-full p-3 shadow-sm">
            <Text className="text-center text-white text-lg font-bold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
