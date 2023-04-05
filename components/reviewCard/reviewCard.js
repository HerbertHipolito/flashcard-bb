import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
//mport transformarKeys from '../../data/transformarKeys';
import paletteColor from '../PaletteColor/paletteColor';
//import {materiaTransformada} from '../cards/newCardFunctions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {myStorageClass ,getAnElementFromArrayRandomly} from '../../myStorageFunction'

export default function ReviewCard({route,navigation}){

    const [cards,setCards] = useState(null);
    const [seeOutcome,setSeeOutcome] = useState(false);
    const [selectedCard,setSelectedCard] = useState(null);
    const [learnedCard,setLearnedCard] = useState({});

    useEffect(()=>{
        
        const StorageCards = new myStorageClass('@my_cards',navigation)
        console.log(route.params.materia)
        StorageCards.loadingCards(route.params.materia,setCards,setSelectedCard)

    },[])

    const LearnedCardHandler = () => {

        myStorage('@cards_learned').then(data =>{ //remove a card from @my_cards and add it to @cards_learned

        })

    }

    return <SafeAreaView style = {styles.ReviewCard}>

        <Text style = {styles.reviewTitle}>{route.params.materia}</Text>

        <View style = {styles.CardView}>

            <View style ={styles.questionView}>
                <Text style = {styles.questionTitle}>{selectedCard?Object.keys(selectedCard):null}</Text>
            </View>
            <View style = {styles.ButtonView}>

                <TouchableOpacity>
                    <Icon  style={styles.rightButton} name="verified" size={60} color="#424F76" />
                </TouchableOpacity>

                <TouchableOpacity onPress = {e=>setSeeOutcome(!seeOutcome)}>
                    <Text style = {styles.outcomeButton}> {!seeOutcome?'Ver resposta':'Esconder'} </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress = {e => {
                    setSelectedCard(getAnElementFromArrayRandomly(cards))
                    if(seeOutcome) setSeeOutcome(!seeOutcome)
                    }}>
                    <Icon style = {styles.dontKnowButton} name="dangerous" size={60} color="#424F76" />
                </TouchableOpacity>

            </View>
            {seeOutcome?
            <View style= {styles.answerView}>
                <Text style = {styles.answerText}>{selectedCard[Object.keys(selectedCard)]}</Text>
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
        elevation:3
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