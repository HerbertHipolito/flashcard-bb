import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//https://www.pexels.com/pt-br/procurar/educa%C3%A7%C3%A3o/

export default function Welcome({navigation}){

    return <View style = {styles.welcomeContainer}>

        <Text style = {styles.title} >Flashcard</Text>
        
        <Icon name="school" size={160} color="#424F76" />

        <Text style = {styles.phare} >
            Aprenda a sua materia de forma rápida e eficiente!
        </Text>
        <View style = {styles.buttons}>
            <TouchableOpacity>
                <Text style={styles.cards} onPress={e=>navigation.navigate('Home')}>Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.criar} onPress={e=>navigation.navigate('Home')}>Criar</Text>
            </TouchableOpacity>
        </View>

    </View>

}

const styles = StyleSheet.create({

    welcomeContainer:{
        alignItems:'center',
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor: '#424F76',
        paddingVertical:90,
    },
    title:{
        fontSize:50,
        fontFamily:'sans-serif-medium'
    },
    phare:{
        fontSize:20,
        marginHorizontal:10,
        textAlign:'center',
        fontFamily:'sans-serif-medium',
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    cards:{
        fontFamily:'sans-serif-medium',
        padding:15,
        backgroundColor:'#516090',
        fontSize:25,
        borderRadius: 7,
        elevation: 5,
        marginHorizontal:25,
    },
    criar:{
        marginHorizontal:25,
        fontFamily:'sans-serif-medium',
        padding:15,
        backgroundColor:'#516090',
        fontSize:25,
        borderRadius: 7,
        elevation: 5,
    }
    

})
