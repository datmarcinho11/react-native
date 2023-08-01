import React, { useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../consts/colors';
import { PrimaryButton } from '../components/Button';
import firestore from '@react-native-firebase/firestore';

const AccountScreen = ({ navigation }) => {
    useEffect(() => {
        firestore()
            .collection('user')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                });
            });

    },);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

            <View >
                <View>
                   
                        <Text style={{ fontSize: 32, fontWeight: 'bold',  }}>
                            Hihihi
                        </Text>

                </View>
              

                <PrimaryButton
                    onPress={() => navigation.navigate('Home')}
                    title="Log out"
                />
                <PrimaryButton
                    onPress={() => navigation.navigate('Home')}
                    title="Log in"
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
