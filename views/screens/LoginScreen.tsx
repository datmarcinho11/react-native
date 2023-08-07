import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {

    return (

        <>
            <SafeAreaView>
                <View style={{
                    padding: 20,

                }}>
                    {<Icon name="arrow-back-outline" size={28} onPress={navigation.goBack} />}

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, color: '#F9813A', marginVertical: 30, fontWeight: '900' }}>
                            Login here
                        </Text>
                        <Text style={{ fontSize: 20, maxWidth: '60%', textAlign: 'center' }}>
                            Welcome back you've been missed!
                        </Text>
                    </View>
                    <View style={{
                        marginVertical: 30
                    }}>
                        <TextInput placeholder="Email" style={{ fontSize: 14, padding: 20, borderRadius: 10, marginVertical: 10, borderWidth: 1 }} />
                        <TextInput placeholder="Password" style={{ fontSize: 14, padding: 20, borderRadius: 10, marginVertical: 10, borderWidth: 1 }} />
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text style={{
                                fontSize: 14,
                                color: 'blue',
                                alignSelf: 'flex-end'
                            }}>
                                Forgot your password ?
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity style={{
                        padding: 20,
                        backgroundColor: '#F9813A',
                        marginVertical: 30,
                        borderRadius: 10,
                        shadowColor: 'blue',
                        shadowOffset: {
                            width: 0,
                            height: 10
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 10
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: 'white',
                        }}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        padding: 20,

                    }}
                        onPress={() => navigation.navigate('Register')}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: '#000',
                            fontWeight: 'bold'
                        }}>Create new account</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );

};
export default LoginScreen;