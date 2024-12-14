import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';

export default function HomeScreen() {
  return (
    <ScreenWrapper className="flex-1">
      <View className="flex-row justify-between items-center p-5">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>
          Hesabu Poa
        </Text>
        <TouchableOpacity className="p-2 px-3 bg-white border border-gray-200 rounded-full">
          <Text className={colors.heading}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
