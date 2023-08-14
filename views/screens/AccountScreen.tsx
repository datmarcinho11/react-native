import React, { useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../consts/colors';
import { PrimaryButton } from '../components/Button';
import { useUser } from '../context/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = ({ navigation }) => {
    const { user, setUser, getUser, delUser }: any = useUser();

    const logOut = async () => {
        delUser();
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

            <View >
                <View>

                    <Text style={{ fontSize: 32, fontWeight: 'bold', }}>
                        account
                    </Text>

                </View>


                <PrimaryButton
                    onPress={() => navigation.navigate('Register')}
                    title="Sign Up"
                />
                <PrimaryButton
                    onPress={() => navigation.navigate('Login')}
                    title="Sign in"
                />
                <PrimaryButton
                    onPress={() => logOut()}
                    title="Log out"

                />
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
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
