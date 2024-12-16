import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';
// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {auth} from '../config/firebase';
import Snackbar from 'react-native-snackbar';

GoogleSignin.configure({
  webClientId: Config.GOOGLE_SIGNIN_WEB_CLIENT_ID,
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // recommended to get fresh tokens on each login
});

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      // Use signInSilently() first to check for existing sign-in
      const userInfo = await GoogleSignin.signInSilently();

      const {data} = await GoogleSignin.signIn();

      const googleCredentials = GoogleAuthProvider.credential(data.idToken);

      await signInWithCredential(auth, googleCredentials);
      // if (isSuccessResponse(response)) {
      //   setState({userInfo: response.data});
      // } else {
      //   // sign in was cancelled by user
      // }
    } catch (error) {
      console.log('error', error);

      Snackbar.show({
        text: 'Please Try Again',
        backgroundColor: 'red',
      });

      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  return (
    <ScreenWrapper>
      <View className="h-full flex justify-around">
        <View className="flex-row justify-center mt-10">
          <Image
            source={require('../assets/images/welcome.gif')}
            className="h-96 w-96 shadow"
          />
        </View>
        <View className="mx-5 mb-20">
          <Text
            className={`text-center font-bold text-4xl ${colors.heading} mb-10`}>
            Hesabu Bora
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            className="shadow p-3 rounded-full mb-5"
            style={{backgroundColor: colors.button}}>
            <Text className="text-center text-white text-lg font-bold">
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            className="shadow p-3 rounded-full mb-5"
            style={{backgroundColor: colors.button}}>
            <Text className="text-center text-white text-lg font-bold">
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signIn()}
            className="shadow p-3 rounded-full bg-white">
            <View className="flex-row justify-center items-center">
              <Image
                source={require('../assets/images/googleIcon.png')}
                className="w-8 h-8"
              />
              <Text className="text-center text-gray-700 text-lg font-bold ml-3">
                Sign In with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
