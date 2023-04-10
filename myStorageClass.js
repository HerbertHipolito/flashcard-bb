import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import {materiaTransformada} from './components/cards/newCardFunctions';
import transformarKeys from './data/transformarKeys';

export class myStorageClass{

    constructor(key=null,navigation=null,subject=null){

        this.key = key // the key of the storage data.
        this.navigation = navigation
        this.JsonSubject = null
        this.subject = subject

    }

    async gettingDataAllSubject(){

        try{
            let jsonPromise = await AsyncStorage.getItem(this.key)
            return JSON.parse(jsonPromise)

        }catch(error){
            this.errorAlert()
        }

    }

    async CheckDataExist(){ 

        let jsonValue = await AsyncStorage.getItem(this.key)

        return jsonValue?true:false
    }

    async clearAllData(){

        try {
            const savedUser = await AsyncStorage.clear();
        } catch (e) {
            this.errorAlert(line2='error during clearAllData')
            console.log(e.message);
        }

    }

    async initializingCreateStorage(){

        try {

            let jsonValue = await AsyncStorage.getItem(this.key) 
            this.JsonSubject = jsonValue
            let result = null

            if(!jsonValue) {
                jsonValue = JSON.stringify({
                    Portugues:[],
                    ingles:[], 
                    Matemática:[],
                    Atualidades_do_Mercado_Financeiro:[],
                    prob_e_estatística:[],
                    Conh_Bancários:[],
                    Tecnologia_da_informação:[]
                })
                await AsyncStorage.setItem(this.key, jsonValue)
            }

            return JSON.parse(jsonValue)
    
        } catch(e) {
            console.log(e.message)
            this.errorAlert()
        }
    }

    findACard(cards,selectedCard){

        const cardQuestion = Object.keys(selectedCard)
    
        result = cards.filter( element => {
            if(element){
                if (cardQuestion === Object.keys(element)) 
                    return  element
                }
        })

        return result.length !==0 ? true : false

    }

    
    async removeCard(cardToRemove){
        
        try{

            let subjects = await this.gettingDataAllSubject()

            const newArray = subjects[materiaTransformada(transformarKeys,this.subject)].filter(card => {
                if(card===null) return null;
                return Object.keys(card)[0] !== Object.keys(cardToRemove)[0]?card:null
            });

            subjects[materiaTransformada(transformarKeys,this.subject)] = newArray

            await AsyncStorage.setItem(this.key,JSON.stringify(subjects))
            
            return newArray

        }catch(e){
            
            this.errorAlert(line1='Something went wrong during the card removal',line2=e.message,BackHomePageIfArrayCardIsEmpty=false)
        }
        return false

    }

    async addingALearnedCard(card){

        try{
            
            let data = await this.gettingDataAllSubject()

            const CardAlreadyExists = this.findACard(data[materiaTransformada(transformarKeys,this.subject)],card)
            if(CardAlreadyExists) throw Error('Card already exists')

            data[materiaTransformada(transformarKeys,this.subject)].push(card)

            await AsyncStorage.setItem(this.key, JSON.stringify(data))

            return data 

        }catch(e){
            
            this.errorAlert(line1='Something went wrong during the card insertion',line2=e.message,false)

        }

        return false

    }

    async loadingCards(BackHomePageIfArrayCardIsEmpty=true,updateCards=true,setCards=()=>null){

        data  = await this.initializingCreateStorage()
        
        if( BackHomePageIfArrayCardIsEmpty  &&  data[materiaTransformada(transformarKeys,this.subject)].length === 0 ){

            const secondLineTextError = BackHomePageIfArrayCardIsEmpty?'You will be redirected to home page':''
            this.errorAlert(`There is no card registered in ${this.subject}`,secondLineTextError,BackHomePageIfArrayCardIsEmpty)
            return []
            
        }else{

            const myCards = data[materiaTransformada(transformarKeys,this.subject)]
            
            if(updateCards){
                setCards(myCards)
            }
            
            this.JsonSubject = data
            return myCards
            
        }

    }

    errorAlert(line1='Something went wrong',line2='You will be redirected to home page',BackHomePageIfArrayCardIsEmpty=true){

        Alert.alert(
            line1,
            line2,
            [
                { text:'Voltar',onPress:() => BackHomePageIfArrayCardIsEmpty?this.navigation.navigate('Home'):null }
            ]
        )}

}

export function getAnElementFromArrayRandomly(array) {

    if(array.length===0) return null;
    return  array[Math.round(Math.random() * (array.length-1) )]

}
