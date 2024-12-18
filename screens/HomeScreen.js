import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/EmptyList';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth, tripsRef} from '../config/firebase';
import {useSelector} from 'react-redux';
import {getDocs, query, where} from 'firebase/firestore';

// data structure
// const items = [
//   {id: 1, place: 'Malindi', country: 'Kenya'},
// ];

export default function HomeScreen() {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.user);
  const [trips, setTrips] = useState([]);

  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const queryTrips = query(tripsRef, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(queryTrips);
    let data = [];
    querySnapshot.forEach(doc => {
      data.push({...doc.data(), id: doc.id});
    });

    setTrips(data);
  };

  useEffect(() => {
    if (isFocused) {
      fetchTrips();
    }
  }, [isFocused]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <ScreenWrapper className="flex-1">
      <View className="flex-row justify-between items-center p-5">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>
          Hesabu Poa
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="p-2 px-3 bg-white border border-gray-200 rounded-full">
          <Text className={colors.heading}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center items-center bg-yellow-100 rounded-xl mx-4 mb-4">
        <Image
          source={require('../assets/images/banner.png')}
          className="w-80 h-60"
        />
      </View>

      <View className="px-4 space-y-3">
        <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} font-bold text-xl`}>
            Recent Trips
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTrip')}
            className="p-2 px-3 bg-white border border-gray-200 rounded-full">
            <Text className={colors.heading}>Add Trip</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-4" style={{height: 450}}>
          <FlatList
            data={trips}
            ListEmptyComponent={
              <EmptyList message="You have not recorded any trips yet" />
            }
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            className="mx-3"
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('TripExpenses', {
                      ...item,
                      userId: user.uid,
                    })
                  }
                  className="bg-white p-5 mx-1 rounded-2xl mb-3 shadow-sm">
                  <View>
                    <Image source={randomImage()} className="w-36 h-36 mb-2" />
                    <Text className={`${colors.heading} font-bold`}>
                      {item.place}
                    </Text>
                    <Text className={`${colors.heading} text-xs`}>
                      {item.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
