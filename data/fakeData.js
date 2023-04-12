//The fakeData object is used to simulate the Android Local Storage in the AsyncStorage mocked methods.

export default {

    '@key1':JSON.stringify({
            Portugues:[],
            ingles:[{'key1':'value1'},{'key2':'value2'},{'key3':'value3'},{'key4':'value4'}], 
            Matemática:[],
            Atualidades_do_Mercado_Financeiro:[{'key3':'value3'},{'key4':'value4'}],
            prob_e_estatística:[],
            Conh_Bancários:[],
            Tecnologia_da_informação:[]
        }),
    '@key2':JSON.stringify({
            Portugues:[],
            ingles:[], 
            Matemática:[{'key3':'value3'},{'key4':'value4'}],
            Atualidades_do_Mercado_Financeiro:[],
            prob_e_estatística:[],
            Conh_Bancários:[{'key1':'value1'},{'key2':'value2'}],
            Tecnologia_da_informação:[]
        })

    }   