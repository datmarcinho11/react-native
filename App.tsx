import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import COLORS from './consts/colors';
import DetailsScreen from './views/screens/DetailsScreen';
import BottomNavigator from './views/navigation/BottomNavigator';
import OnBoardScreen from './views/screens/OnBoardScreen';
import RegisterScreen from './views/screens/RegisterScreen';
import LoginScreen from './views/screens/LoginScreen';
import UserProvider from './views/context/UserProvider';
import CartProvider from './views/context/CartProvider';
import CheckOutScreen from './views/screens/CheckOutScreen';
import FavouritesProvider from './views/context/FavouritesProvider';
import FavouritesScreen from './views/screens/FavouritesScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <UserProvider>
        <CartProvider>
          <FavouritesProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
            <Stack.Screen name="CheckOut" component={CheckOutScreen} />
            <Stack.Screen name="Favourites" component={FavouritesScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={BottomNavigator} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          </Stack.Navigator>
          </FavouritesProvider>
        </CartProvider>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
