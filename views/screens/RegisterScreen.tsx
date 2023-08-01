import React from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView, View, Text } from "react-native";

const RegisterSceen = () => {
    return (
        <>
            <SafeAreaView>
                <View style={{
                    padding: 20,

                }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, color: '#F9813A', marginVertical: 20,fontWeight:'900' }}>
                            Create account
                        </Text>
                        <Text style={{ fontSize: 20, maxWidth: '80%', textAlign: 'center' }}>
                            Creat an account so you can explore all the existing jobs
                        </Text>
                    </View>
                    <View style={{
                        marginVertical: 30
                    }}>
                        <TextInput placeholder="Email"  style={{ fontSize: 14, padding: 20,  borderRadius: 10, marginVertical: 10,borderWidth:0.5 }} />
                        <TextInput placeholder="Password"  style={{ fontSize: 14, padding: 20,  borderRadius: 10, marginVertical: 10,borderWidth:0.5 }} />
                        <TextInput placeholder="Confirm password"  style={{ fontSize: 14, padding: 20,  borderRadius: 10, marginVertical: 10,borderWidth:0.5 }} />
                    </View>
                   
                    <TouchableOpacity style={{
                        padding: 20,
                        backgroundColor: '#F9813A',
                        marginVertical: 10,
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
                        }}>Sign up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        padding: 20
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: '#000',
                        }}>Alredy have an account</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );

};
export default RegisterSceen;