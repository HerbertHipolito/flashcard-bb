import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import paletteColor from '../PaletteColor/paletteColor'; 
import materias from '../../data/materias'
import transformarKeys from '../../data/transformarKeys'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {handleSubmit, RegexValidation, checkSameQuestion, materiaTransformada} from './newCardFunctions'

export default function NewCards({route,navigation}){

    const [materiaName, setMateriaName] = useState("")
    const [questionCard, setQuestionCard] = useState("")
    const [answerCard, setAnswerCard] = useState("")
    const [deck, setDeck] = useState([])
    const [currentCards, setCurrentCards] = useState(null)
    const [validationInput,setValidationInput] = useState(undefined)


    useEffect(()=>{

        const getData = async () => {

            try {
                let jsonValue = await AsyncStorage.getItem('@my_cards')
                if(jsonValue) {
                    jsonValue = JSON.parse(jsonValue)
                }else{
                    jsonValue = JSON.stringify({
                        Portugues:[],
                        ingles:[], 
                        Matemática:[],
                        Atualidades_do_Mercado_Financeiro:[],
                        prob_e_estatística:[],
                        Conh_Bancários:[],
                        Tecnologia_da_informação:[]
                    })
                    await AsyncStorage.setItem('@my_cards', jsonValue)
                }
                return jsonValue    

            } catch(e) {

              console.log(e.message)
              Alert.alert(
                'Something went wrong',
                'You will be redirected to home page',
                [
                    { text:'Voltar',onPress:() => navigation.navigate('Home') }
                ]
            )}
        }
        
        getData().then(value => setCurrentCards(value))

    },[])
/*
    const materiaTransformada = (transformarKeys) =>{

        let keyTransformada = null

        for(key in transformarKeys) {
            if(transformarKeys[key] === route.params.materia){
                keyTransformada = key
                break
            }
        }

        return keyTransformada

    }

    const checkSameQuestion = (question) =>{

        let cardExist = false

        for (card of currentCards[materiaTransformada(transformarKeys)]){
            if(Object.keys(card)[0] === question){
                cardExist = true
                break
            }
        }

        return cardExist

    }

    const RegexValidation = (input) => {
        let regex = /[A-Za-z0-9]/;
        return regex.test(input);
    }

    const handleSubmit = (questionInput, answerInput) =>{

        var passed = true

        if(!questionInput || !answerInput) passed = false
        else if(questionInput.length > 180 || answerInput.length > 250) passed = false
        else if(checkSameQuestion(questionInput)) passed = false //check for duplicate question
        else if(!RegexValidation(questionInput) || !RegexValidation(answerInput)) passed = false

        if(!passed) setValidationInput(passed)

        return passed

    }
*/
    const addCard = async () => {

        if (!handleSubmit(questionCard, answerCard,setValidationInput,currentCards,route.params.materia)) return;

        const newCards = {...currentCards}
        let keyTransformada2 = null

        keyTransformada2 = materiaTransformada(transformarKeys,route.params.materia)

        console.log(keyTransformada2,newCards)

        newCards[keyTransformada2].push({[questionCard]:answerCard}) 
        setCurrentCards(newCards)

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

    return <View style = {styles.newCardView}>
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

        {validationInput !== undefined?
        validationInput?
        null:<View><Text style={styles.textError}>Input inválidos</Text></View>:null}

        <TouchableOpacity onPress= {e => addCard()}  testID="registerCardButton">
            <Text style={styles.registerButton} > Registrar </Text>
        </TouchableOpacity>

    </View>

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
        marginVertical:'5%',
    }
})

