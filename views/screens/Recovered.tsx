import React, { useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../consts/colors';
import { PrimaryButton } from '../components/Button';
import { useUser } from '../context/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const Recovered = () => {
   
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>



                <View >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>OK</Text>
                </View>
               
        </SafeAreaView>
    );
};


export default Recovered;
