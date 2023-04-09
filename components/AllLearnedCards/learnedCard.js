import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import paletteColor from '../PaletteColor/paletteColor';
import {myStorageClass} from '../../myStorageClass';
import Icon from 'react-native-vector-icons/MaterialIcons';

//fix the loading icon location.

export default function ShowLearnedCards({route,navigation}){

    const [allLearnedCards, setAllLearnedCards] = useState(null)
    const [LearnedCardStorage,setLearnedCardsStorage] = useState(null)

    useEffect(() =>{

        const storage = new myStorageClass('@cards_learned',navigation,route.params.materia);
        
        storage.loadingCards(true,true,setAllLearnedCards)
        setLearnedCardsStorage(storage)

    },[])

    const removeACard = async (card) =>{

        const cardLeft = await LearnedCardStorage.removeCard(card)
        setAllLearnedCards(cardLeft.length!==0?cardLeft:[])

    }

    return <SafeAreaView style = {styles.LearnedCardView}>
        <View>
            <Text style = {styles.titleView1}>Cards que você aprendeu de</Text>
            <Text style = {styles.titleView2}>  {route.params.materia}  </Text>
        </View>

        <View>
            
            {allLearnedCards?
            allLearnedCards.length!==0?<FlatList data = {allLearnedCards}
            
            renderItem = {
                (card,index) =>{
                    {return card.item?<View key ={index}  style = {styles.cardView}>
                            <View style = {styles.iconView}>
                                <TouchableOpacity onPress = {e=>{removeACard(card.item)}}style={styles.icon}>
                                    <Icon name="delete" size={30} color="#424F76" /> 
                                </TouchableOpacity>
                            </View>
                            <Text style = {styles.cardViewText} >{Object.keys(card.item)}</Text>
                            <Text style = {styles.cardViewText}>Res.: {Object.values(card.item)}</Text>

                        </View>:null}
                }

            }/>:
            <Text style={styles.noCard}> Não há cards </Text>:
            <View >
                <ActivityIndicator size="large" /><Text>Carregando dados dos deputados</Text>
            </View>}
        </View>

    </SafeAreaView>

}

const styles = StyleSheet.create({

    LearnedCardView:{
        backgroundColor: paletteColor.backGroundColor,
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        paddingTop:'20%',
        paddingBottom:'30%'
    },
    titleView1:{
        fontSize:18,
        textAlign:'center',
        marginBottom:'3%',
    },
    titleView2:{
        fontSize:30,
        textAlign:'center',
    },
    cardView:{
        backgroundColor: paletteColor.secondColor,
        padding:'2%',
        margin:'5%',
        maxWidth:'90%',
        minWidth:'70%',
        alignSelf:'center'

    },
    cardViewText:{
        fontFamily:paletteColor.FontFamily,
        fontSize:15,
        marginVertical:'5%',
        textAlign:'center',
        flexDirection:'column',
        paddingBottom:10
    },
    icon:{
        minWidth:'20%',
        alignItems:'center'

    },
    iconView:{
        justifyContent:'center',
        alignItems:'flex-end',
    },
    noCard:{
        paddingVertical:'10%',
        fontSize:25
    }

})