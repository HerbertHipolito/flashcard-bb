import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import {materiaTransformada} from './components/cards/newCardFunctions';
import transformarKeys from './data/transformarKeys';

export class myStorageClass{

    constructor(key,navigation,subject,setCards,setSortedCard){

        this.key = key // the key of the storage data.
        this.navigation = navigation
        this.JsonSubject = null
        this.subject = subject
        this.setCards = setCards
        this.setSortedCard = setSortedCard

    }

    async gettingDataAllSubject(){ //test this method.

        try{
            let jsonPromise = await AsyncStorage.getItem(this.key)
            return JSON.parse(jsonPromise)

        }catch(error){
            console.log(error)
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

        let successfulRemoval = false
        
        try{

            let subjects = await this.gettingDataAllSubject()

            const newArray = subjects[materiaTransformada(transformarKeys,this.subject)].filter(card => {
                return Object.keys(card)[0] !== Object.keys(cardToRemove)[0]?card:null
            });

            subjects[materiaTransformada(transformarKeys,this.subject)] = newArray

            await AsyncStorage.setItem(this.key,JSON.stringify(subjects))

            this.setCards(newArray)
            this.setSortedCard(getAnElementFromArrayRandomly(newArray))
            successfulRemoval = true

        }catch(e){
            
            this.errorAlert(line1='Something went wrong during the deletion of the card',BackHomePageIfArrayCardIsEmpty=false)
        }


        return successfulRemoval

    }

/*
    async removeCard(cardToRemove){

        let sucessullyRemove = false
        
        this.gettingDataAllSubject().then(async subjects => {

            try{

                const newArray = subjects[materiaTransformada(transformarKeys,this.subject)].filter(card => {
                    return Object.keys(card)[0] !== Object.keys(cardToRemove)[0]?card:null
                });

                subjects[materiaTransformada(transformarKeys,this.subject)] = newArray

                await AsyncStorage.setItem(this.key,JSON.stringify(subjects))

                this.setCards(newArray)
                this.setSortedCard(getAnElementFromArrayRandomly(newArray))
                sucessullyRemove = true

            }catch(e){
                
                this.errorAlert(line1='Something went wrong during the deletion of the card',BackHomePageIfArrayCardIsEmpty=false)
            }

        })

        return sucessullyRemove

    }
*/
    async addingALearnedCard(card){

        const CardAlreadyExists = this.findACard(card)
        console.log('CardExists',CardAlreadyExists)
        let successfulAdd = false

        if(CardAlreadyExists) return null

        try{
            
            let data = await this.gettingDataAllSubject()

            data[materiaTransformada(transformarKeys,this.subject)].push(card)

            await AsyncStorage.setItem(this.key, JSON.stringify(data))

            successfulAdd = true
            
        }catch(e){
            
            this.errorAlert(line1='Something went wrong during the insertion of the card',false)

        }

        return successfulAdd

    }

    async loadingCards(BackHomePageIfArrayCardIsEmpty=true,updateCards=true){


        this.initializingCreateStorage().then(data =>{ 

            if( BackHomePageIfArrayCardIsEmpty  &&  data[materiaTransformada(transformarKeys,this.subject)].length === 0 ){

                const secondLineTextError = BackHomePageIfArrayCardIsEmpty?'You will be redirected to home page':''
                this.errorAlert(`There is no card registered in ${this.subject}`,secondLineTextError,BackHomePageIfArrayCardIsEmpty)
                
            }else{

                const myCards = data[materiaTransformada(transformarKeys,this.subject)]
                
                if(updateCards){
                    this.setCards(myCards)
                    this.setSortedCard(getAnElementFromArrayRandomly(myCards))
                } 
                
            }

        })

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
