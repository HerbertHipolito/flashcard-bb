import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import {materiaTransformada} from './components/cards/newCardFunctions';
import transformarKeys from './data/transformarKeys';

export class myStorageClass{

    constructor(key,navigation){

        this.key = key // the key of the storage data.
        this.navigation = navigation

    }

    async gettingDataAllSubject(){ //test this method.

        let jsonValue = await AsyncStorage.getItem(this.key)

        return jsonValue
    }

    async CheckDataExist(){ //test this method.

        let jsonValue = await AsyncStorage.getItem(this.key)

        return jsonValue?true:false
    }

    async LoadOrCreateStorage(){

        try {

            let jsonValue = await AsyncStorage.getItem(this.key)

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

    loadingCards(subject,setCards,setSelectedCard){

        if(!subject) return

        this.LoadOrCreateStorage().then(data =>{ //continue from here. initialize the tests

            if(data[materiaTransformada(transformarKeys,subject)].length === 0){

                this.errorAlert(`There is no card registered in ${subject}`,'You will be redirected to home page')
                
            }else{
                const myCards = data[materiaTransformada(transformarKeys,subject)]
                setCards(myCards)
                console.log(getAnElementFromArrayRandomly(myCards))
                setSelectedCard(getAnElementFromArrayRandomly(myCards))
            }
        
        })

    }

    errorAlert(line1='Something went wrong',line2='You will be redirected to home page'){

        Alert.alert(
            line1,
            line2,
            [
                { text:'Voltar',onPress:() => this.navigation.navigate('Home') }
            ]
        )}

}

export function getAnElementFromArrayRandomly(array) {
    return  array[Math.round(Math.random() * (array.length-1) )]
}
/*

export async function myStorage(key) {

    try {

        let jsonValue = await AsyncStorage.getItem(key)

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
            await AsyncStorage.setItem(key, jsonValue)
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

*/