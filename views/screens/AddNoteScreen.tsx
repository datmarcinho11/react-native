import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from "../../consts/colors";
import Title from "../components/Title";
import { PrimaryButton } from "../components/Button";

const AddNoteScreen = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

                <Title title="them moi" icon="arrow-back-outline" />

                {<Icon name="arrow-back-outline" size={28} onPress={navigation.goBack} />}

                <View style={{ borderWidth: 1, marginHorizontal: 20, borderRadius: 10 }}>
                    <TextInput
                        placeholder="tieu de"
                    />



                </View>
                <View style={{ borderWidth: 1, marginHorizontal: 20, marginTop: 15, borderRadius: 10 }}>
                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        style={{ height: 300, textAlignVertical: 'top', }} /></View>
                <View style={{ marginHorizontal: 30 }}>
                    <PrimaryButton title="SAVE" />
                </View>
            </SafeAreaView>
        </>
    );

};

export default AddNoteScreen;