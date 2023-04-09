import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import paletteColor from '../../PaletteColor/paletteColor';
import {memo} from 'react'

function QuestionButtons({route,navigation}){

    return <View>
    
    <View style = {styles.buttonsView}> 
        <TouchableOpacity onPress={e => navigation.navigate('newCard',{materia:route.params.materia})}>
            <Text style = {styles.questionButtons}> Criar cards </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={e => navigation.navigate('ReviewCard',{materia:route.params.materia})}>
            <Text style = {styles.questionButtons}> Revisar Cards </Text>
        </TouchableOpacity>
    </View>

    <TouchableOpacity onPress = {e => navigation.navigate('showLearnedCards',{materia:route.params.materia})}>
        <Text style = {styles.seeLearnedButton}> Ver cards aprendidos </Text>
    </TouchableOpacity>
    
    </View>

}

export default memo(QuestionButtons)

const styles = StyleSheet.create({

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
        color:paletteColor.fontColor,
    },
    seeLearnedButton:{
        fontSize:20,
        backgroundColor:paletteColor.secondColor,
        paddingVertical:10,
        paddingHorizontal:6,
        marginVertical:30,
        textAlign:'center',
        color:paletteColor.fontColor,
        marginHorizontal:'10%',
    }   

})