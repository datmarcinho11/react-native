import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from "../../consts/colors";
import Title from "../components/Title";

const NoteScreen = ({navigation}) => {
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

                <Title title="my note" icon="menu" />

                <View style={{ marginTop: 50, backgroundColor: 'pink', padding: 20, borderRadius: 15, marginHorizontal: 20 }}>
                    <Text>Title note</Text>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel cumque sint, dolorem ipsam modi sequi. Numquam ea officia ad? Repudiandae vel dolore consectetur. Consectetur saepe fugiat placeat asperiores optio doloremque!</Text>
                    <View style={{ alignItems: 'flex-end' }}>

                        <Icon name="trash" style={{ fontSize: 35, color: 'red', }} />
                    </View>


                </View>
                <TouchableHighlight
                    underlayColor={COLORS.white}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('AddNote')}>
                    <View style={styles.ok}><Text style={{ color: 'red' }}><Icon name="add" style={{ fontSize: 50 }} />
                    </Text></View>
                </TouchableHighlight>
            </SafeAreaView >
        </>
    );

};
const styles = StyleSheet.create({
    ok: {
        alignSelf: 'flex-end',
        marginTop: 200,
        marginHorizontal: 20,
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
export default NoteScreen;