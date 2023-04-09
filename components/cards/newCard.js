import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import paletteColor from '../PaletteColor/paletteColor'; 
import materias from '../../data/materias'
import transformarKeys from '../../data/transformarKeys'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {handleSubmit, RegexValidation, checkSameQuestion, materiaTransformada} from './newCardFunctions'
import {myStorageClass} from '../../myStorageClass'


export default function NewCards({route,navigation}){

    const [materiaName, setMateriaName] = useState("")
    const [questionCard, setQuestionCard] = useState("")
    const [answerCard, setAnswerCard] = useState("")
    const [deck, setDeck] = useState([])
    const [currentCards, setCurrentCards] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    useEffect(()=>{

        const getData = async () => {
            const StorageCards = new myStorageClass('@my_cards',navigation,route.params.materia)
            return await StorageCards.initializingCreateStorage()
        }
        
        getData().then(value => setCurrentCards(value))

    },[])

    const addCard = async () => {

        const validationInputAndErrorMessage = handleSubmit(questionCard, answerCard,currentCards,route.params.materia)

        if(!validationInputAndErrorMessage[0]) {
            setErrorMessage(validationInputAndErrorMessage[1])
            return;
        }

        const newCards = {...currentCards}
        let keyTransformada2 = null

        keyTransformada2 = materiaTransformada(transformarKeys,route.params.materia)

        newCards[keyTransformada2].push({[questionCard]:answerCard}) 
        setCurrentCards(newCards)
        setErrorMessage(null)
        setQuestionCard('')
        setAnswerCard('')

        try{
            
            await AsyncStorage.setItem('@my_cards', JSON.stringify(newCards))
            Alert.alert(
                'confirmação',
                `Card registrado com sucesso`,
                [
                    { text:'Voltar',onPress:() => navigation.navigate('Home') },
                    { text:'Novo card' }
                ]
            )
           
        }catch(e){
            Alert.alert('Something went wrong')
            console.log(e)
        }

    }

    return <SafeAreaView style = {styles.newCardView}>
        <View>
            <Text style = {styles.NewCardTitle}> Novo card  </Text>
        </View>

        {console.log(currentCards)}

        <Text style = {styles.novoCardText}><Text style = {styles.materia}> Materia: {route.params.materia} </Text></Text>
        <View style = {styles.TextInputView}> 
            <TextInput
            style = {styles.TextInputNewCard}
            placeholder = "Escreva a pergunta"
            onChangeText = { setQuestionCard }
            value = {questionCard}
            multiline
            numberOfLines={3}
            maxLength={180}
            />
            
            <TextInput
            style = {styles.TextInputNewCard}
            placeholder = "Escreva a resposta"
            onChangeText = {setAnswerCard}
            value = {answerCard}
            multiline
            numberOfLines={5}
            maxLength={250}
            />
        </View>

        {errorMessage?<View><Text style={styles.textError}>Input inválidos: {errorMessage}</Text></View>:null}

        <TouchableOpacity onPress= {e => addCard()} >
            <Text style={styles.registerButton} > Registrar </Text>
        </TouchableOpacity>

    </SafeAreaView>

}

const styles = StyleSheet.create({
    NewCardTitle:{
        fontFamily:paletteColor.FontFamily,
        fontSize:50,
        marginTop:"20%",
        color:paletteColor.fontColor
    },
    newCardView:{
        flexDirection: 'column',
        alignItems:'center',
        flex:1,
        backgroundColor:paletteColor.backGroundColor,
    },
    novoCardText:{
        marginBottom:"15%",
        marginTop:"3%",
        fontSize:14
    },
    TextInputNewCard:{
        backgroundColor:paletteColor.secondColor,
        fontFamily:paletteColor.FontFamily,
        padding:5,
        width:'80%',
        marginVertical:'5%',
        textAlign:'center',
        fontSize:15,
    },
    TextInputView:{
        width:'100%',
        alignItems:'center',
    },
    registerButton:{
        backgroundColor:paletteColor.secondColor,
        padding:10,
        color:paletteColor.fontColor,
        fontSize:25,
        marginTop:'13%',
        
    },
    materia:{
        fontSize:16,
        color:paletteColor.fontColor
    },
    textError:{
        marginVertical:'1%',
    }
})

