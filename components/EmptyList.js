import {View, Text, Image} from 'react-native';
import React from 'react';

const EmptyList = ({message}) => {
  return (
    <View className="flex justify-center items-center my-5">
      <Image
        source={require('../assets/images/empty.png')}
        className="w-60 h-60 shadow"
      />
      <Text className="font-bold text-gray-400">
        {message || 'data not found'}
      </Text>
    </View>
  );
};

export default EmptyList;
