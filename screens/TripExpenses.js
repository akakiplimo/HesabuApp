import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/EmptyList';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import ExpenseCard from '../components/ExpenseCard';

const items = [
  {id: 1, title: 'ate burger', amount: 2, category: 'food'},
  {id: 2, title: 'rode a dirt bike', amount: 100, category: 'entertainment'},
  {id: 3, title: 'bought a kikoy', amount: 50, category: 'shopping'},
  {id: 4, title: 'took a ferry', amount: 20, category: 'commute'},
];

export default function TripExpenses(props) {
  const {id, country, place} = props.route.params;

  const navigation = useNavigation();

  return (
    <ScreenWrapper className="flex-1">
      <View className="px-4">
        <View className="relative mt-5">
          <View className="absolute top-0 left-0">
            <BackButton />
          </View>

          <View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              {place}
            </Text>
            <Text className={`${colors.heading} text-xs text-center`}>
              {country}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-center items-center rounded-xl mb-4">
          <Image
            source={require('../assets/images/mock-1.png')}
            className="w-80 h-60"
          />
        </View>

        <View className="space-y-3">
          <View className="flex-row justify-between items-center">
            <Text className={`${colors.heading} font-bold text-xl`}>
              Expenses
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddExpense')}
              className="p-2 px-3 bg-white border border-gray-200 rounded-full">
              <Text className={colors.heading}>Add Expense</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-4" style={{height: 450}}>
            <FlatList
              data={items}
              ListEmptyComponent={
                <EmptyList message="You have not added any expenses yet" />
              }
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              className="mx-3"
              renderItem={({item}) => {
                return <ExpenseCard item={item} />;
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
