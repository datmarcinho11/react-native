import React, { useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../consts/colors';
import { PrimaryButton } from '../components/Button';
import { useUser } from '../context/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFav } from '../context/FavouritesProvider';

const AccountScreen = ({ navigation }) => {
    const { user, setUser, getUser, delUser }: any = useUser();
    const {  delFav }: any = useFav();

    const logOut = async () => {
        delUser();
        delFav();
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

            <View >


                <View style={style.header}>
                    {<Icon name="arrow-back-outline" size={28} onPress={navigation.goBack} />}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Account</Text>
                </View>
                {user.name == undefined ?

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
                        <TouchableOpacity style={{ padding: 15, backgroundColor: COLORS.primary, borderRadius: 15 }} onPress={() => navigation.navigate('Login')}><Text>Sign in</Text></TouchableOpacity>
                        <TouchableOpacity style={{ padding: 15, backgroundColor: COLORS.primary, borderRadius: 15 }} onPress={() => navigation.navigate('Register')}><Text>Sign up</Text></TouchableOpacity>
                    </View>
                    :
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>

                        <TouchableOpacity style={{ padding: 15, backgroundColor: COLORS.primary, borderRadius: 15 }} ><Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}> {user.name}</Text></TouchableOpacity>
                        <TouchableOpacity style={{ padding: 15, backgroundColor: COLORS.primary, borderRadius: 15 }} onPress={() => logOut()}><Text>Log out</Text></TouchableOpacity>
                    </View>
                }
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <View style={{marginBottom: 20 }}>

                    <TouchableOpacity style={{ padding: 15, backgroundColor: COLORS.grey, borderRadius: 15 }} onPress={() => alert(111)}><Text style={{color:COLORS.white}}>List order</Text></TouchableOpacity>
                </View>
                <View style={{marginBottom: 20 }}>

                    <TouchableOpacity style={{ padding: 15, backgroundColor: COLORS.grey, borderRadius: 15 }} onPress={() => alert(111)}><Text style={{color:COLORS.white}}>Delivery</Text></TouchableOpacity>
                </View>
                
                

            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        paddingBottom: 15,
    },
    indicatorContainer: {
        height: 50,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentIndicator: {
        height: 12,
        width: 30,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        marginHorizontal: 5,
    },
    indicator: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: COLORS.grey,
        marginHorizontal: 5,
    },
});

export default AccountScreen;
