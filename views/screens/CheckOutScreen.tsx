import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import COLORS from '../../consts/colors';
import foods from '../../consts/foods';
import { PrimaryButton } from '../components/Button';
import { useUser } from '../context/UserProvider';
import { useCart } from '../context/CartProvider';
import axios from 'axios';

const CheckOutScreen = ({ navigation }) => {

  const [note, setNote] = useState('');

  const { user, setUser, getUser }: any = useUser();
  const { carts, setCart, getCart, delCart }: any = useCart();
  const removeCart = async () => {
    delCart();
  }
  const handleRemove = (id) => {
    setCart(carts => carts.filter(item => item.id !== id));
  };

  let price = carts.reduce((total, item) => total + item.amount * item.price, 0);
  const handleChange = (id, d) => {
    setCart((cart) =>
      carts.flatMap((cartItem) =>
        cartItem.id == id
          ? cartItem.amount + d < 1
            ? [cartItem] // <-- remove item if amount will be less than 1
            : [
              {
                ...cartItem,
                amount: cartItem.amount + d
              }
            ]
          : [cartItem]
      )
    );
  };
  const checkOut = async () => {
    let formOrders = {
      note: note,
      user_id: user.id,
      shipDate: null
    }
    if (carts.length > 0) {
      axios.post('http://192.168.0.114:2000/api/orders/', formOrders).
        then((respone) => {
          if (respone.data.statusCode === 200) {

            if (respone.data.iD != null) {
              let orderDetails: any;
              {
                carts.map((c) => (
                 
                  orderDetails = {
                    product_id: c.id,
                    price: c.price,
                    quantity: c.amount,
                    order_id: respone.data.iD
                  },
                  axios.post('http://192.168.0.114:2000/api/order_detail/', orderDetails).
                    then((respone) => {
                      // console.log(orderDetails);
                      // if (respone.data.statusCode === 200) {
                      //   navigation.navigate('Home');
                      // } else {
                      //   alert(respone.data.message);
                      // }
                    }
                    )
                    .catch((err) =>
                      console.log(err)
                    )
                ))
                removeCart();
                Alert.alert("Order successfully");



              }


            }

          } else {
            alert(respone.data.message);
          }
        }
        )
        .catch((err) =>
          console.log(err)
        )
    }
  }
  useEffect(() => {


  }, [])

  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        <Image source={{
          uri: item.image
        }} style={{ height: 80, width: 80 }} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>

          <Text style={{ fontSize: 17, fontWeight: 'bold' }}> {item.pricee = item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })} </Text>
        </View>
        <View style={{ marginRight: 20, alignItems: 'center' }}>
          {/* <View style={style.actionBtn}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleChange(item.id, -1)}>
              {<Icon name="remove-outline" size={25} color={COLORS.white} />}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleChange(item.id, 1)}>
              {<Icon name="add-outline" size={25} color={COLORS.white} />}
            </TouchableOpacity>
          </View> */}

        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>X {item.amount}</Text>

        {/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleRemove(item.id)}>
          {<Icon name="trash" size={28} />}
        </TouchableOpacity> */}
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        {<Icon name="arrow-back-outline" size={28} onPress={navigation.goBack} />}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Check Out</Text>
      </View>
      {user.name != undefined ?
        carts.length > 0 ?
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
            data={carts}
            renderItem={({ item }) => <CartCard item={item} />}
            ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
            ListFooterComponent={() => (
              // carts.map((item: any, index) => (

              <View>

                <View>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Information : </Text>
                  <View style={{ marginHorizontal: 20, marginTop: 5}}>

                    <Text style={{ fontSize: 18, }}>Orderer : {user.name}</Text>
                    <Text style={{ fontSize: 18, }}>Address : {user.address}</Text>
                  </View>
                </View>

                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Note : </Text>
                <View style={{ borderWidth: 1, marginHorizontal: 20, marginTop: 15, borderRadius: 10 }}>
                  <TextInput
                    // multiline={true}
                    // numberOfLines={10}
                    style={{ height: 100, textAlignVertical: 'top', marginLeft: 15 }} onChangeText={(value) => setNote(value)} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 15,
                  }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    Total Price
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{price = price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                  </Text>
                </View>

                <View style={{ marginHorizontal: 30 }}>
                  <PrimaryButton title="ORDER" onPress={() => checkOut()} />
                </View>
              </View>
              // ))

            )}

          /> :
          <View>
            <View style={{ marginHorizontal: 30 }}>
              <PrimaryButton onPress={() => navigation.navigate('home')} title="Continue Shopping " />
            </View>
          </View>



        :
        <View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 15,
            }}>

          </View> */}
          <View style={{ marginHorizontal: 30 }}>
            <PrimaryButton onPress={() => navigation.navigate('Login')} title="SIGN IN !!!" />
          </View>
        </View>
      }
    </SafeAreaView>


  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 130,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 100,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
});

export default CheckOutScreen;
