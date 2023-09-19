import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../context/UserProvider";
import axios from "axios";
const LoginScreen = ({ navigation }) => {
    const {user,setUser,getUser }:any = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [errPassword, checkPassword] = useState('');
    const [errEmail, checkEmail] = useState('');
    const [errEmailRegex, setRegexEmail] = useState(true);
    const login = async () => {
        let formData = {
            email: email,
            password: password
        }
        let regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        if (!regexEmail.test(formData.email)) {
            setRegexEmail(false)
        } else {
            setRegexEmail(true)
        }
        formData.password === '' ? checkPassword('Password cannot be blank') : checkPassword('')
        formData.email === '' ? checkEmail('Email cannot be blank') : checkEmail('')
        if (formData.email !== '' && formData.password !== '' && regexEmail.test(formData.email)) {
            axios.post('http://10.192.12.51:2000/api/check_login/', formData).
                then((respone) => {
                    if (respone.data.statusCode === 200) {
                        setUser(respone.data.data)
                        AsyncStorage.setItem('users',JSON.stringify(respone.data.data))
                        navigation.navigate('home');
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
                        {/* <Text style={{ fontSize: 20, maxWidth: '60%', textAlign: 'center' }}>
                            Welcome back you've been missed!
                        </Text> */}
                    </View>
                    <View style={{
                        marginVertical: 30
                    }}>
                        <TextInput placeholder="Email" style={{ fontSize: 14, padding: 20, borderRadius: 10, marginVertical: 10, borderWidth: 1 }} onChangeText={(value) => setEmail(value)} />
                        <Text style={{ color: 'red', fontStyle: 'italic' }}>{errEmail}</Text>
                        <Text style={{ color: 'red', fontStyle: 'italic' }}>{!errEmailRegex ? 'Invalid email eg: admin@gmail.com' : ''}</Text>
                        <TextInput placeholder="Password" style={{ fontSize: 14, padding: 20, borderRadius: 10, marginVertical: 10, borderWidth: 1 }} secureTextEntry={true} onChangeText={(value) => setPassWord(value)} />
                        <Text style={{ color: 'red', fontStyle: 'italic' }}>{errPassword}</Text>
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
                    }} onPress={() => login()}>
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