import React, { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser } from "../context/UserProvider";
import { ScrollView } from "react-native";


const RegisterSceen = ({ navigation }) => {
    // const {user,setUser,getUser }:any = useUser();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [address, setAddress] = useState('');
    const [errName, checkName] = useState('');
    const [errPassword, checkPassword] = useState('');
    const [errEmail, checkEmail] = useState('');
    const [errEmailRegex, setRegexEmail] = useState(true);
    const [errAddress, checkAddress] = useState('');
    const onSubmit = () => {
        let formData = {
            email: email,
            password: password,
            name: name,
            address: address,
        }
        let regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        if (!regexEmail.test(formData.email)) {
            setRegexEmail(false)
        } else {
            setRegexEmail(true)
        }
        formData.name === '' ? checkName('Name cannot be blank') : checkName('')
        formData.password === '' ? checkPassword('Password cannot be blank') : checkPassword('')
        formData.address === '' ? checkAddress('Address cannot be blank') : checkAddress('')
        formData.email === '' ? checkEmail('Email cannot be blank') : checkEmail('')
        if (formData.name !== '' && formData.address !== '' && formData.email !== '' && formData.password !== '' && regexEmail.test(formData.email)) {
            axios.post('http://192.168.0.114:2000/api/register', formData).
                then((respone) => {
                    if (respone.data.statusCode === 200) {
                        navigation.navigate('Login')

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
                    padding: 15,

                }}>
                    {<Icon name="arrow-back-outline" size={28} onPress={navigation.goBack} />}

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, color: '#F9813A', marginVertical: 20, fontWeight: '900', textTransform: 'uppercase' }}>
                            Sign Up
                        </Text>
                        {/* <Text style={{ fontSize: 20, maxWidth: '100%', textAlign: 'center' }}>
                            Creat an account so you can explore all the existing jobs
                        </Text> */}
                    </View>
                    <ScrollView>
                    <View style={{
                        marginVertical: 15
                    }}>
                        <TextInput placeholder="Name" style={{ fontSize: 14, padding: 20, borderRadius: 10, marginVertical: 10, borderWidth: 0.5 }} onChangeText={(value) => setName(value)} />
                        <Text style={{ color: 'red', fontStyle: 'italic' }}>{errName}</Text>
                        <TextInput placeholder="Email" style={{ fontSize: 14, padding: 20, borderRadius: 10, marginVertical: 10, borderWidth: 0.5 }} onChangeText={(value) => setEmail(value)} />
                        <Text style={{ color: 'red', fontStyle: 'italic' }}>{errEmail}</Text>
                        <Text style={{ color: 'red', fontStyle: 'italic' }}>{!errEmailRegex ? 'Invalid email eg: admin@gmail.com' : ''}</Text>

                        <TextInput placeholder="Password" style={{ fontSize: 14, padding: 20, borderRadius: 10, marginVertical: 10, borderWidth: 0.5 }} secureTextEntry={true} onChangeText={(value) => setPassWord(value)} />
                        <Text style={{ color: 'red', fontStyle: 'italic' }}>{errPassword}</Text>
                        <TextInput placeholder="Address" style={{ fontSize: 14, padding: 20, borderRadius: 10, marginVertical: 10, borderWidth: 0.5 }} onChangeText={(value) => setAddress(value)} />
                        <Text style={{ color: 'red', fontStyle: 'italic' }}>{errAddress}</Text>
                    </View>

                    <TouchableOpacity style={{
                        padding: 15,
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
                    }} onPress={() => onSubmit()}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: 'white',
                        }}>Sign up</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{
                        padding: 20
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: '#000',
                        }}>Alredy have an account</Text>
                    </TouchableOpacity> */}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );

};
const style = StyleSheet.create({
    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
});
export default RegisterSceen;