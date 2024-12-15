import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('Go Back');

        navigation.goBack();
      }}
      className="bg-white rounded-full h-8 w-8 justify-center items-center">
      <ChevronLeftIcon size="30" color={colors.button} />
    </TouchableOpacity>
  );
}
