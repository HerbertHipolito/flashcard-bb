import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import paletteColor from '../PaletteColor/paletteColor'; 
import materias from '../../data/materias'
import transformarKeys from '../../data/transformarKeys'
import AsyncStorage from '@react-native-async-storage/async-storage';

// make the app saves the data in the async-storage https://react-native-async-storage.github.io/async-storage/docs/usage

export default function NewCards({route,navigation}){

    const [materiaName, setMateriaName] = useState("")
    const [questionCard, setQuestionCard] = useState("")
    const [answerCard, setAnswerCard] = useState("")
    const [deck, setDeck] = useState([])
    const [currentCards, setCurrentCards] = useState(null)

    useEffect(()=>{

        const getData = async () => {

            try {
                let jsonValue = await AsyncStorage.getItem('@my_cards')
                console.log(jsonValue)
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
              // error reading value
              console.log(e)
            }
        }
        
        getData().then(value => setCurrentCards(value))

    },[])

    const addCard = async () => { 
        const newCards = {...currentCards}
        let keyTransformada = null

        for(key in transformarKeys) {
            if(transformarKeys[key] === route.params.materia){
                keyTransformada = key
                break
            }
        }

        newCards[keyTransformada].push({[questionCard]:answerCard}) 
        setCurrentCards(newCards)

        const result = await AsyncStorage.setItem('@my_cards', JSON.stringify(newCards)) //the return is undefined. https://reactnative.dev/docs/asyncstorage
        console.log(result)
        if(result){
            Alert.alert(
                `Card registrado com sucesso`,
                [
                    {
                        text:'Voltar',
                        onPress:() => {navigation.navigate('Home')}
                    },
                    {
                        text:'Novo card'
                    }
                ]
            )
        }else{
            console.log('something went wrong')
        }

    }

    return <View style = {styles.newCardView}>

        <View>
            <Text style = {styles.NewCardTitle}>Novo Card</Text>
        </View>

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

        <TouchableOpacity onPress= {e => {addCard()}}>
            <Text style={styles.registerButton} > Registrar </Text>
        </TouchableOpacity>

    </View>

}

const styles = StyleSheet.create({
    NewCardTitle:{
        fontFamily:paletteColor.FontFamily,
        fontSize:50,
        marginVertical:"25%",
        color:paletteColor.fontColor
    },
    newCardView:{
        flexDirection: 'column',
        alignItems:'center',
        flex:1,
        backgroundColor:paletteColor.backGroundColor,
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
    }
})

