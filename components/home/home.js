import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import paletteColor from '../PaletteColor/paletteColor'

export default function Home({navigation}){

    const [areas,setAreas] = useState({
        'Conhecimentos Básicos':["Portugues","ingles","Matemática","Atualidades do Mercado Financeiro"],
        'Conhecimentos Específicos':["prob. e estatística","Conh. Bancários","Tecnologia da informação"]
    })

    const [showSection,setShowSection] = useState([false,false])

    const buttonSections = (index) =>{
        var newArray = index === 0 ? [!showSection[0],showSection[1]] : [showSection[0],!showSection[1] ] //React native checks for state changes by looking at the changes of state variable ref, not by array value changes.
        setShowSection(newArray);
    }

    return <View style = {styles.home}>    
        
        <Text style = {styles.homeTitle}>Flashcard</Text>
        <Text style = {styles.homeSubTitle}>Focado para o Banco do Brasil</Text>
        <View style = {styles.container}>
        
            
            {
                Object.keys(areas).map((areaKey,i) =>
                <View key = {i} style = {styles.area}>
                    
                    <TouchableOpacity onPress={e => buttonSections(i)} style={styles.areaButton}>
                        <Text style={styles.appButtonText}>{areaKey}</Text>
                    </TouchableOpacity>

                    {showSection[i] ? areas[areaKey].map( (materia,j) =>
                        <View key={j}> 
                            <TouchableOpacity onPress = {e=>navigation.navigate('makeQuestion',{materia})}  > 
                                <Text key={j} style={styles.materiaButton} > {materia} </Text>
                            </TouchableOpacity>
                        </View>
                        ):null }
                    
                </View>
                )
            }
        </View>
    </View>
}

const styles = StyleSheet.create({
    home:{
        backgroundColor: paletteColor.backGroundColor,
        flex:1,
        alignItems: 'center',
    },
    homeTitle:{
        marginTop:80,
        marginBottom:10,
        textAlign: 'center',
        fontSize:58,
        marginHorizontal:17,
        fontFamily:paletteColor.FontFamily,
        color:paletteColor.fontColor
    },
    homeSubTitle:{
        textAlign: 'center',
        fontFamily:paletteColor.FontFamily,
        marginBottom:40,
        fontSize:14,
        borderBottomWidth:2,
        paddingBottom:5,
        borderBottomColor:paletteColor.secondColor,
        color:paletteColor.fontColor
    },
    materiaButton:{

        fontSize:15,
        padding:5,
        marginVertical:5,
        //borderWidth:1,
        elevation: 2,
        textAlign:'center',
        backgroundColor:paletteColor.backGroundColor,
        color:paletteColor.fontColor,
        borderRadius:5

    },
    container: {
        //backgroundColor: '#5EC2B7',
        flex:1,
        backgroundColor: paletteColor.backGroundColor,
        alignItems: 'center',
    },
    area:{
        alignItems:'center',
        //backgroundColor:'#2CA6A4',
        backgroundColor: paletteColor.secondColor,
        padding:10,
        marginVertical:10,
        elevation: 2,
        borderRadius:10,
        minWidth:'85%'
    },
    areaButton:{
        backgroundColor:paletteColor.backGroundColor,
        paddingVertical:13,
        paddingHorizontal:15,
        margin:5,
        elevation: 2,
        borderRadius:20,
    },
    appButtonText:{
        fontSize:21,
        color:paletteColor.fontColor
    }
  });
  