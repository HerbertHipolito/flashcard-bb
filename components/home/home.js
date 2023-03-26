import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';

export default function Home(){

    const [areas,setAreas] = useState({
        'Conhecimentos Básicos':["Portugues","ingles","Matemática","Atualidades do Mercado Financeiro"],
        'Conhecimentos Específicos':["prob. e estatística","Conh. Bancários","Tecnologia da informação"]
    })

    const [showSection,setShowSection] = useState([false,false])

    const buttonSections = (index) =>{ //continue from here!!
        showSection[index] = !showSection[index]
        setShowSection(showSection);
    }

    return <View style = {styles.home}>    
        
        <Text style = {styles.homeTitle}>Flashcard para o Banco do Brasil</Text>
        <View style = {styles.container}>
            
            {
                Object.keys(areas).map((areaKey,index) =>
                <View key = {areaKey} style = {styles.area}>
                    
                    <TouchableOpacity onPress={e => buttonSections(index)} style={styles.areaButton}>
                        <Text style={styles.appButtonText}>{areaKey}</Text>
                    </TouchableOpacity>
                    
                    {areas[areaKey].map(materia =>
                    <View key = {materia+areaKey}>
                        <Text> {materia} </Text>
                    </View>
                    )}

                </View>
                )
            }
        </View>
    </View>
}

const styles = StyleSheet.create({
    home:{
        backgroundColor: '#424F76',
        flex:1,
    },
    homeTitle:{
        marginTop:80,
        marginBottom:50,
        textAlign: 'center',
        fontSize:28,
        marginHorizontal:17,
        fontFamily:'sans-serif-medium'
    },
    container: {
        //backgroundColor: '#5EC2B7',
        flex:1,
        backgroundColor: '#424F76',
        alignItems: 'center',
    },
    area:{
        alignItems:'center',
        //backgroundColor:'#2CA6A4',
        backgroundColor: '#516090',
        padding:10,
        marginVertical:10,
    },
    areaButton:{
        backgroundColor:'#424F76',
        padding:10
    },
    appButtonText:{
        fontSize:20
    }
  });
  