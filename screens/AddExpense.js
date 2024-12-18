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
import {categoryBG, colors} from '../theme';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {categories} from '../constants';
import Snackbar from 'react-native-snackbar';
import {addDoc} from 'firebase/firestore';
import {expensesRef} from '../config/firebase';
import {useSelector} from 'react-redux';
import Loading from '../components/Loading';

export default function AddExpense(props) {
  const {id, country, place} = props.route.params;
  console.log('props', props);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(state => state.user);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const navigation = useNavigation();

  const handleAddExpense = async () => {
    if (title && amount && category) {
      // ready to add expense
      // navigation.goBack();
      setLoading(true);
      let doc = await addDoc(expensesRef, {
        title,
        amount,
        category,
        tripId: id,
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
        text: 'Please fill all the fields',
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
              Add Expense
            </Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className={`${
                windowHeight < 700 && windowWidth < 400
                  ? 'w-52 h-52'
                  : 'w-96 h-96'
              }`}
              source={require('../assets/images/calc.png')}
            />
          </View>
          <View>
            <Text className={`${colors.heading} text-lg font-bold my-2`}>
              For What?
            </Text>
            <TextInput
              value={title}
              onChangeText={value => setTitle(value)}
              className="p-4 bg-white rounded-full mb-4"
            />
            <Text className={`${colors.heading} text-lg font-bold my-2`}>
              How Much?
            </Text>
            <TextInput
              value={amount}
              onChangeText={value => setAmount(value)}
              className="p-4 bg-white rounded-full mb-4"
            />
          </View>
          <View className="space-x-2">
            <Text className="text-lg font-bold">Category</Text>
            <View className="flex-row flex-wrap items-center">
              {categories.map(cat => {
                let bgColor = 'bg-white';
                if (cat.value == category) bgColor = 'bg-green-200';
                return (
                  <TouchableOpacity
                    onPress={() => setCategory(cat.value)}
                    key={cat.value}
                    className={`rounded-full ${bgColor} px-4 p-3 mb-2 mx-1`}>
                    <Text>{cat.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleAddExpense}
              style={{backgroundColor: colors.button}}
              className="my-6 rounded-full p-3 shadow-sm">
              <Text className="text-center text-white text-lg font-bold">
                Add Expense
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
