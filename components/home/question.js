import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import paletteColor from '../PaletteColor/paletteColor';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import QuestionButtons from './questionButtons/questionButtons';
import { MaterialIcons } from '@expo/vector-icons'; 
//<Icon name="payment" size={160} color={paletteColor.thirdColor} />

export default function MakeQuestion({route,navigation}){

    return <View style = {styles.containerQuestion} >
        <View>
            <Text style = {styles.titleQuestion}> Você deseja? </Text>
        </View>

        <MaterialIcons name="payment" size={160} color={paletteColor.thirdColor} />
        
        <QuestionButtons route={route} navigation = {navigation} />
        
    </View>
}

const styles = StyleSheet.create({

    containerQuestion:{
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems:'center',
        flex:1,
        backgroundColor:paletteColor.backGroundColor,
        paddingVertical:'10%',
        paddingBottom:'15%'
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
        marginHorizontal:15,
    },
    questionButtonsHover:{
        backgroundColor:'black'
    },
    seeLearnedButton:{
        fontSize:20,
        backgroundColor:paletteColor.secondColor,
        paddingVertical:10,
        paddingHorizontal:6,
        marginVertical:30,
        textAlign:'center',
        marginHorizontal:'10%',
    }   

})

