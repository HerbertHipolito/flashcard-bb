import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function Home(){

    const [areas,setAreas] = useState({
        ConhecimentosBasicos:["Portugues","ingles","Matemática","Atualidades do Mercado Financeiro"],
        ConhecimentosEspecificos:["prob. e estatística","Conh. Bancários","Tecnologia da informação"]
    })

    return <View style = {styles.container}>
        
        {
            Object.keys(areas).map(areaKey =>
            <View style = {styles.area}>
                
                <Text key={areaKey} >{areaKey}</Text>
                
                {areas[areaKey].map(materia =>
                <View key={materia+areaKey}>
                    <Text>{materia}</Text>
                </View>
                )}

            </View>
            )
        }
    </View>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#5EC2B7',
        backgroundColor: '#424F76',
        alignItems: 'center',
        justifyContent: 'center',
    },
    area:{
        alignItems:'center',
        //backgroundColor:'#2CA6A4',
        backgroundColor: '#516090',
        padding:10,
        marginVertical:10,
    }
  });
  