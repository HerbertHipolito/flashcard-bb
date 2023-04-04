import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import transformarKeys from '../../data/transformarKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import paletteColor from '../PaletteColor/paletteColor';

export default function ReviewCard({route,navigation}){

    const [currentCard,setCurrentCards] = useState(null);
    const [seeOutcome,setSeeOutcome] = useState(false);

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
        
        getData().then(value => {
            
            if(value[transformarKeys(route.params.key)].length === 0){
                Alert.alert(
                    `There is no card registered in ${route.params.key}`,
                    'You will be redirected to home page',
                    [
                        { text:'Voltar',onPress:() => navigation.navigate('Home') }
                    ]
                )
            }else{
                setCurrentCards(value[transformarKeys(route.params.key)])
            }
        
        })

    },[])

    const GenerateRandomNumber = () =>{ // generate a random number according to the array card size. Continue from here.

        Math.round(Math.random() * currentCard.length)

    }

    return <SafeAreaView style = {styles.ReviewCard}>

        <Text style = {styles.reviewTitle}>{route.params.materia}</Text>

        <View style = {styles.CardView}>

            <View style ={styles.question}>
                <Text></Text>
            </View>

            {seeOutcome?<View style= {styles.answer}>

            </View>:null}

        </View>

    </SafeAreaView>

    
}

const styles = StyleSheet.create({

})