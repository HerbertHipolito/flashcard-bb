import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
//mport transformarKeys from '../../data/transformarKeys';
import paletteColor from '../PaletteColor/paletteColor';
//import {materiaTransformada} from '../cards/newCardFunctions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {myStorageClass ,getAnElementFromArrayRandomly} from '../../myStorageFunction'
/*
tests I need to do:

What will happen if I remove all cards from the card array?

*/


export default function ReviewCard({route,navigation}){

    const [cards,setCards] = useState(null);
    const [seeOutcome,setSeeOutcome] = useState(false);
    const [sortedCard,setSortedCard] = useState(null);
    //const [learnedCard,setLearnedCard] = useState({});
    const [unlearnedCard, setUnlearnedCard] = useState(null);
    const [learnedCard, setLearnedCard] = useState(null);

    useEffect(()=>{
        
        const StorageCardsUnlearned = new myStorageClass('@my_cards',navigation,route.params.materia,setCards,setSortedCard)
        const StorageCardsLearned = new myStorageClass('@cards_learned',navigation,route.params.materia,setCards,setSortedCard)

        StorageCardsUnlearned.loadingCards()
        setUnlearnedCard(StorageCardsUnlearned)

        StorageCardsLearned.loadingCards(false,false)
        setLearnedCard(StorageCardsLearned)

    },[])

    const LearnedCardHandler = async () => {

        const cardToBeRemoved = sortedCard
        
        try{
            let resultRemo = await unlearnedCard.removeCard(cardToBeRemoved)

            if(!resultRemo) throw new Error("Error in removal")

            let resultAdd = await learnedCard.addingALearnedCard(sortedCard)
            
            if(!resultAdd) throw new Error("Error in add")

            const cardLearnedafterChanging = await learnedCard.gettingDataAllSubject()

            console.log(cardLearnedafterChanging)

        }catch(e){
            console.log('something went wrong',e.message)
        }        

    }

    return <SafeAreaView style = {styles.ReviewCard}>

        <Text style = {styles.reviewTitle}>{route.params.materia}</Text>

        <View style = {styles.CardView}>

            <View style ={styles.questionView}>
                <Text style = {styles.questionTitle}>{sortedCard?Object.keys(sortedCard):null}</Text>
            </View>
            <View style = {styles.ButtonView}>

                <TouchableOpacity onPress = {e=>LearnedCardHandler()}>
                    <Icon  style={styles.rightButton} name="verified" size={60} color="#424F76" />
                </TouchableOpacity>

                <TouchableOpacity onPress = {e=>setSeeOutcome(!seeOutcome)}>
                    <Text style = {styles.outcomeButton}> {!seeOutcome?'Ver resposta':'Esconder'} </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress = {e => {
                    setSortedCard(getAnElementFromArrayRandomly(cards))
                    if(seeOutcome) setSeeOutcome(!seeOutcome)
                    }}>
                    <Icon style = {styles.dontKnowButton} name="dangerous" size={60} color="#424F76" />
                </TouchableOpacity>

            </View>
            {seeOutcome?
            <View style= {styles.answerView}>
                <Text style = {styles.answerText}>{sortedCard[Object.keys(sortedCard)]}</Text>
            </View>:null}   

        </View>

    </SafeAreaView>

    
}

const styles = StyleSheet.create({


    ReviewCard:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        paddingVertical:'5%',
        backgroundColor:paletteColor.backGroundColor
    },
    reviewTitle:{
        fontSize:30,
        marginVertical:'10%',
        color:paletteColor.fontColor,
        fontFamily:paletteColor.FontFamily
    },
    questionView:{
        marginVertical:'5%',
        minHeight:'30%',
        minWidth:'80%',
        backgroundColor:paletteColor.secondColor,
        alignSelf:'center',
        padding:'5%',
        elevation:3,
        marginHorizontal:'2%'
    },
    questionTitle:{
        fontSize:20,
    },
    outcomeButton:{
        padding:'5%',
        minWidth:'5%',
        alignSelf:'center',
        backgroundColor:paletteColor.secondColor,
        elevation: 4,

    },
    answerText:{
        backgroundColor:paletteColor.secondColor,
        fontFamily:paletteColor.FontFamily,
        textAlign:'center',
        marginVertical:'5%',
        padding:'5%',
        alignSelf:'center',
        minWidth:'5%'
    },
    ButtonView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        marginVertical:'8%',

    },
    rightButton:{
        color:'#8AFF8A'
    },
    dontKnowButton:{
        color:'#CD5C5C'
    }


})