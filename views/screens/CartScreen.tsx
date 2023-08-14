import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import COLORS from '../../consts/colors';
import foods from '../../consts/foods';
import { PrimaryButton } from '../components/Button';
import { useUser } from '../context/UserProvider';
import { useCart } from '../context/CartProvider';
import axios from 'axios';

const CartScreen = ({ navigation }) => {
  const [note, setNote] = useState('');

  const { user, setUser, getUser }: any = useUser();
  const { carts, setCart, getCart, delCart }: any = useCart();
  const checkOut = async () => {
    let formOrders = {
      note: note,
      user_id: user.id,
      shipDate: null
    }
    if (carts.length > 0) {
      axios.post('http://192.168.1.12:2000/api/orders/', formOrders).
        then((respone) => {
          if (respone.data.statusCode === 200) {

            if (respone.data.iD != null) {
              let formOrderDetails = [{}];
              let orderDetails: any;
              {
                carts.map((c) => (
                  orderDetails = {
                    product_id: c.proId,
                    price: c.proPrice,
                    quantity: c.quantity
                  }

                ))
                formOrderDetails.push(orderDetails);
                orderDetails = {
                  order_id: respone.data.iD,
                }
              }

              axios.post('http://192.168.1.12:2000/api/order_detail/', formOrderDetails).
                then((respone) => {
                  console.log(formOrderDetails);
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
          uri: item.proImg
        }} style={{ height: 80, width: 80 }} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.proName}</Text>

          <Text style={{ fontSize: 17, fontWeight: 'bold' }}> {item.proPrice} VND</Text>
        </View>
        <View style={{ marginRight: 20, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.quantity}</Text>
          <View style={style.actionBtn}>
            {<Icon name="remove-outline" size={25} color={COLORS.white} />}
            {<Icon name="add-outline" size={25} color={COLORS.white} />}
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        {<Icon name="arrow-back-outline" size={28} onPress={navigation.goBack} />}
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cart</Text>
      </View>
      {user.name != undefined ?
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={carts}
          renderItem={({ item }) => <CartCard item={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
          ListFooterComponent={() => (
            // carts.map((item: any, index) => (

            <View>
              <View style={{alignItems:'flex-start'}}>
              {/* {<Icon name="trash" size={28} />} */}

              </View>
              <View style={{ marginHorizontal: 30 }}>
                <PrimaryButton title="REMOVE CART" onPress={() => delCart()} />
              </View>

              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Note : </Text>
              <View style={{ borderWidth: 1, marginHorizontal: 20, marginTop: 15, borderRadius: 10 }}>
                <TextInput
                  multiline={true}
                  numberOfLines={10}
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
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>VND</Text>
              </View>

              <View style={{ marginHorizontal: 30 }}>
                <PrimaryButton title="CHECKOUT" onPress={() => alert(1111)} />
              </View>
            </View>
            // ))

          )}

        /> :
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 15,
            }}>

          </View>
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
    height: 100,
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
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default CartScreen;
