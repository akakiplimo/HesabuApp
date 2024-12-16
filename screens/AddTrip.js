import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import Snackbar from 'react-native-snackbar';
import {addDoc} from 'firebase/firestore';
import {tripsRef} from '../config/firebase';
import {useSelector} from 'react-redux';

export default function AddTrip() {
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(state => state.user);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const navigation = useNavigation();

  const handleAddTrip = async () => {
    if (place && country) {
      // ready to add trip
      // navigation.navigate('Home');
      setLoading(true);
      let doc = await addDoc(tripsRef, {
        place,
        country,
        userId: user.uid,
      });
      setLoading(false);

      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      // Show error
      setLoading(false);
      Snackbar.show({
        text: 'Place & Country are required',
        backgroundColor: 'red',
      });
    }
  };
  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-5">
            <View className="absolute top-0 left-0">
              <BackButton />
            </View>

            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              Add Trip
            </Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className={`${
                windowHeight < 700 && windowWidth < 400
                  ? 'w-64 h-64'
                  : 'w-96 h-96'
              }`}
              source={require('../assets/images/whereto.png')}
            />
          </View>
          <View>
            <Text className={`${colors.heading} text-lg font-bold my-2`}>
              Where On Earth?
            </Text>
            <TextInput
              value={place}
              onChangeText={value => setPlace(value)}
              className="p-4 bg-white rounded-full mb-4"
            />
            <Text className={`${colors.heading} text-lg font-bold my-2`}>
              Which Country?
            </Text>
            <TextInput
              value={country}
              onChangeText={value => setCountry(value)}
              className="p-4 bg-white rounded-full mb-4"
            />
          </View>
        </View>

        <View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleAddTrip}
              style={{backgroundColor: colors.button}}
              className="my-6 rounded-full p-3 shadow-sm">
              <Text className="text-center text-white text-lg font-bold">
                Add Trip
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
