import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import paletteColor from '../PaletteColor/paletteColor';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {myStorageClass ,getAnElementFromArrayRandomly} from '../../myStorageClass'

export default function ReviewCard({route,navigation}){

    const [cards,setCards] = useState(null);
    const [seeOutcome,setSeeOutcome] = useState(false);
    const [sortedCard,setSortedCard] = useState(null);
    const [unlearnedCard, setUnlearnedCard] = useState(null);
    const [learnedCard, setLearnedCard] = useState(null);

    useEffect(()=>{
            
            const StorageCardsUnlearned = new myStorageClass('@my_cards',navigation,route.params.materia)
            const StorageCardsLearned = new myStorageClass('@cards_learned',navigation,route.params.materia)

            setUnlearnedCard(StorageCardsUnlearned)
            setLearnedCard(StorageCardsLearned)
            
            StorageCardsUnlearned.loadingCards(true,true,setCards).then(cards =>{
                console.log(cards)
                setSortedCard(getAnElementFromArrayRandomly(cards))

            })
            StorageCardsLearned.loadingCards(false,false,setCards)

    },[])

    const LearnedCardHandler = async () => {

        const cardToBeRemoved = sortedCard
        
        try{

            if(!sortedCard) throw new Error('Card error')

            let cardsReturnRemo = await unlearnedCard.removeCard(cardToBeRemoved)

            if(!cardsReturnRemo) throw new Error("Card removal error")
            
            setCards(cardsReturnRemo)
            cardsReturnRemo.length > 0 ? setSortedCard(getAnElementFromArrayRandomly(cardsReturnRemo)) : setSortedCard(null)

            let cardsReturnRemoAdd = await learnedCard.addingALearnedCard(sortedCard)
            
            if(!cardsReturnRemoAdd) throw new Error("Card insertion error")


        }catch(e){
            console.log('something went wrong',e.message)
        }        

    }

    return <SafeAreaView style = {styles.ReviewCard}>

        <Text style = {styles.reviewTitle}>{route.params.materia}</Text>

        <View style = {styles.CardView}>

            <View style ={styles.questionView}>
                <Text style = {styles.questionTitle}>{sortedCard?Object.keys(sortedCard):<Text style = {styles.zeroCardsleft} >No Cards</Text>}</Text>
            </View>
            <View style = {styles.ButtonView}>

                <TouchableOpacity onPress = {e=>LearnedCardHandler()}>
                    <Icon  style={styles.rightButton} name="verified" size={60} color="#424F76" />
                </TouchableOpacity>

                <TouchableOpacity onPress = {e=>setSeeOutcome(!seeOutcome)}>
                    <Text style = {styles.outcomeButton}> {!seeOutcome?'Ver resposta':'Esconder'} </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress = {e => {

                    cards.length===1?setSortedCard(cards[0]):
                    cards.length===0?setSortedCard(null):
                    setSortedCard(getAnElementFromArrayRandomly(cards))
                    
                    if(seeOutcome) setSeeOutcome(!seeOutcome)
                    }}>

                    <Icon style = {styles.dontKnowButton} name="dangerous" size={60} color="#424F76" />
                </TouchableOpacity>

            </View>
            {seeOutcome?
            <View style= {styles.answerView}>
                <Text style = {styles.answerText}>{sortedCard?sortedCard[Object.keys(sortedCard)]:'??????'}</Text>
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
        marginHorizontal:'2%',
    },
    questionTitle:{
        fontSize:20,
    },
    zeroCardsleft:{
        
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