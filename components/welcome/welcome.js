import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import paletteColor from '../PaletteColor/paletteColor'

//https://www.pexels.com/pt-br/procurar/educa%C3%A7%C3%A3o/

export default function Welcome({navigation}){

    return <SafeAreaView style = {styles.welcomeContainer}>

        <Text style = {styles.title} >Bem-vindo!</Text>
        
        <Icon name="school" size={160} color="#424F76" />

        <Text style = {styles.phare} >
            Aprenda a sua materia de forma rápida e eficiente!
        </Text>
        <View style = {styles.buttons_view}>
            <TouchableOpacity>
                <Text style={styles.buttons} onPress={e=>navigation.navigate('Home')}>Continue</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>

}

const styles = StyleSheet.create({

    welcomeContainer:{
        alignItems:'center',
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor: paletteColor.backGroundColor,
        paddingVertical:90,
    },
    title:{
        fontSize:50,
        fontFamily:paletteColor.fontFamily,
    },
    phare:{
        fontSize:23,
        marginHorizontal:10,
        textAlign:'center',
        fontFamily:paletteColor.fontFamily,
    },
    buttons_view:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    buttons:{
        fontFamily:paletteColor.fontFamily,
        padding:15,
        backgroundColor:paletteColor.secondColor,
        fontSize:30,
        borderRadius: 7,
        elevation: 3,
        marginHorizontal:25,
        minWidth:'30%',
        textAlign:'center'
    },

})
