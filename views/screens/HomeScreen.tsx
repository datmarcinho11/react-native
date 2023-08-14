import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../consts/colors';
import categories from '../../consts/categories';
import foods from '../../consts/foods';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserProvider';
import { PrimaryButton } from '../components/Button';
import { useCart } from '../context/CartProvider';
import { check } from 'prettier';
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const HomeScreen = ({ navigation }) => {


  const addToCartBtn = (item) => {
    // Update cart item quantity if already in cart
    // console.log(item)
    if (carts.some((cartItem) => cartItem.id === item.id)) {
      setCart((cart) =>
        cart.map((cartItem) =>
          // console.log(cartItem),
          cartItem.id === item.id
            ? {
              ...cartItem,
              amount: cartItem.amount + 1,
            }
            : cartItem
        )
      );
      return;
    }

    // Add to cart
    setCart((cart) => [
      ...cart,
      { ...item, amount: 1 } // <-- initial amount 1
    ]);
  };

  const { user, setUser, getUser }: any = useUser();
  const { carts, setCart, getCart }: any = useCart();


  const [key, setKey] = useState('');
  const search = async () => {
    getFoods(7, key);
  }

  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  const [food, setFood] = useState([]);
  const getFoods = async (id: string | number, key: string | null) => {
    try {
      let res: any;
      if (id != 7) {

        res = await fetch('http://192.168.0.114:2000/api/product-by-cat-id/' + id)
      }
      else if (key != null) {
        res = await fetch('http://192.168.0.114:2000/api/product/?key=' + key)

      }
      else {
        res = await fetch('http://192.168.0.114:2000/api/product')

      }
      const data = await res.json();
      setFood(data.product)
    } catch (error) {
      console.log(error)
    }
  };
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const res = await fetch('http://192.168.0.114:2000/api/category')
      const data = await res.json();
      setCategories(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    getFoods(7, null);
    getCategories();
    // console.log(carts);
  }, [])
  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}>
        {categories.map((category: any, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => { setSelectedCategoryIndex(index); getFoods(category.id, null) }}>
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.secondary,
                ...style.categoryBtn,
              }}>
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={{
                    uri: category.image
                  }}
                  style={{ height: 35, width: 35, resizeMode: 'cover' }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    );
  };
  const Card = ({ food }) => {
    return (

      <View style={style.card}>
        <TouchableHighlight

          underlayColor={COLORS.white}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('DetailsScreen', food)}>
          <View style={{ alignItems: 'center', top: -40 }}>
            <Image
              style={{ height: 120, width: '100%', borderRadius: 10 }}
              source={{
                uri: food.image
              }}
            />

          </View>
        </TouchableHighlight>

        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{food.name}</Text>
          {/* <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
              {food.description}
            </Text> */}
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {food.price} VND
          </Text>
          <TouchableHighlight
            underlayColor={COLORS.white}
            activeOpacity={0.9}
            onPress={() => addToCartBtn(food)}>
            <View style={style.addToCartBtn}>
              {<Icon name="add-outline" size={20} color={COLORS.white} />}
            </View>
          </TouchableHighlight>
        </View>
      </View >

    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        {user.name != undefined ?
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 28 }}>Hello,</Text>
              <Text style={{ fontSize: 28, fontWeight: 'bold', marginLeft: 10 }}>

                {user.name}


              </Text>
            </View>

            <Text style={{ marginTop: 5, fontSize: 22, color: COLORS.grey }}>
              What do you want today
            </Text>
          </View>
          :
          <View>



          </View>
        }

        {/* <Image
          source={require('../../assets/person.png')}
          style={{ height: 50, width: 50, borderRadius: 25 }}
        /> */}
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={style.inputContainer}>
          {<Icon name="search-outline" size={28} />}
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Search for food" onChangeText={(value) => setKey(value)}
          />
        </View>
        <TouchableHighlight
          underlayColor={COLORS.white}
          activeOpacity={0.9}
          onPress={() => search()}>
          <View style={style.sortBtn}>
            {<Icon name="search-outline" size={28} color={COLORS.white} />}
          </View>
        </TouchableHighlight>
      </View>
      <View>
        <ListCategories />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={food}
        renderItem={({ item }) => <Card food={item} />}
      />

    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 250,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
