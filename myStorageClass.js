import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import {materiaTransformada} from './components/cards/newCardFunctions';
import transformarKeys from './data/transformarKeys';

export class myStorageClass{

    constructor(key,navigation,subject){

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

    async CheckDataExist(){ //test this method.

        let jsonValue = await AsyncStorage.getItem(this.key)

        return jsonValue?true:false
    }

    async initializingCreateStorage(){

        try {

            let jsonValue = await AsyncStorage.getItem(this.key) // continue from here
            this.JsonSubject = jsonValue
            let result = null
            //console.log(jsonValue,this.key)

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
                await AsyncStorage.setItem(this.key, jsonValue)
            }

            return jsonValue    
    
        } catch(e) {
            console.log(e.message)
            this.errorAlert()
        }
    }

    findACard(card){

        const cardQuestion = Object.keys(card)
    
        result = this.JsonSubject[materiaTransformada(transformarKeys,this.subject)].filter( element => cardQuestion === Object.keys(element))

        return result.length !==0 ? true : false

    }

    
    async removeCard(cardToRemove){
        
        try{

            let subjects = await this.gettingDataAllSubject()

            const newArray = subjects[materiaTransformada(transformarKeys,this.subject)].filter(card => {
                return Object.keys(card)[0] !== Object.keys(cardToRemove)[0]?card:null
            });

            subjects[materiaTransformada(transformarKeys,this.subject)] = newArray

            await AsyncStorage.setItem(this.key,JSON.stringify(subjects))

            //this.setCards(newArray)
            //this.setSortedCard(getAnElementFromArrayRandomly(newArray))
            
            return newArray

        }catch(e){
            
            this.errorAlert(line1='Something went wrong during the card removal',BackHomePageIfArrayCardIsEmpty=false)
        }
        return false

    }

    async addingALearnedCard(card){

        try{
            
            let data = await this.gettingDataAllSubject()

            const CardAlreadyExists = this.findACard(data[materiaTransformada(transformarKeys,this.subject)])
            if(CardAlreadyExists) return null

            data[materiaTransformada(transformarKeys,this.subject)].push(card)

            await AsyncStorage.setItem(this.key, JSON.stringify(data))

            return data 

        }catch(e){
            
            this.errorAlert(line1='Something went wrong during the card insertion',false)

        }

        return false

    }

    async loadingCards(BackHomePageIfArrayCardIsEmpty=true,updateCards=true,setCards=()=>null){

        data  = await this.initializingCreateStorage()
        
        if( BackHomePageIfArrayCardIsEmpty  &&  data[materiaTransformada(transformarKeys,this.subject)].length === 0 ){

            const secondLineTextError = BackHomePageIfArrayCardIsEmpty?'You will be redirected to home page':''
            this.errorAlert(`There is no card registered in ${this.subject}`,secondLineTextError,BackHomePageIfArrayCardIsEmpty)
            
        }else{

            const myCards = data[materiaTransformada(transformarKeys,this.subject)]
            
            if(updateCards){
                setCards(myCards)
                //this.setSortedCard(getAnElementFromArrayRandomly(myCards))
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
