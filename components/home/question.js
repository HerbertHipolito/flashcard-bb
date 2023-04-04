import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import paletteColor from '../PaletteColor/paletteColor';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MakeQuestion({route,navigation}){

    return <View style = {styles.containerQuestion} >
        {console.log(route.params.materia)}
        <View>
            <Text style = {styles.titleQuestion}> Você deseja? </Text>
        </View>

        <Icon name="payment" size={160} color="#424F76" />

        <View style = {styles.buttonsView}> 
            <TouchableOpacity onPress={e => navigation.navigate('newCard',{materia:route.params.materia})}>
                <Text style = {styles.questionButtons}> Criar cards </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={e => navigation.navigate('ReviewCard',{materia:route.params.materia})}>
                <Text style = {styles.questionButtons}> Revisar Cards </Text>
            </TouchableOpacity>
        </View>

    </View>
}

const styles = StyleSheet.create({

    containerQuestion:{
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems:'center',
        flex:1,
        backgroundColor:paletteColor.backGroundColor,
        paddingVertical:60
    },
    titleQuestion:{
        fontSize:50,
        fontFamily:paletteColor.FontFamily,
        color:paletteColor.fontColor
    },
    buttonsView:{
        flexDirection: 'row',
        TextAlign: 'center',
        justifyContent:'space-around',
    },
    questionButtons:{
        fontSize:20,
        backgroundColor:paletteColor.secondColor,
        paddingVertical:10,
        paddingHorizontal:6,
        marginHorizontal:15
    }   

})

