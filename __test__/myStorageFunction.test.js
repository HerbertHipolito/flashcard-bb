//https://jestjs.io/pt-BR/docs/mock-functions
//https://react-native-async-storage.github.io/async-storage/docs/advanced/jest

import AsyncStorage from '@react-native-async-storage/async-storage';
import {myStorageClass} from '../myStorageClass' 

//The fakeStore object is used to simulate the Android Local Storage in the AsyncStorage mocked methods.

const fakeStore = {
    '@key1':JSON.stringify({'key1':'value1','key2':'value2'}),
    '@key2':JSON.stringify({'key3':'value3','key4':'value4'})
}

AsyncStorage.getItem = jest.fn(key => {

    let data = null

    if(key==='@key1') data = fakeStore[key]
    else if(key==='@key2') data = fakeStore[key]
    
    return data

});


AsyncStorage.setItem = jest.fn((keys) => {
    return true
});

function getAnElementFromArrayRandomly(array) {

    if(array.length===0) return null;
    return  array[Math.round(Math.random() * (array.length-1) )]
    
}

describe('StorageFunction class validation', ()=>{

    it(' should validate my generate random card function',()=>{

        expect( getAnElementFromArrayRandomly([]) ).toBe(null)
        expect( getAnElementFromArrayRandomly([5]) ).toBe(5)

    })

    it(' checks if Async Storage is used', async () => {
        
        const storage = new myStorageClass('@key1',null,'ingles');    
        storage.loadingCards(false,false)
        expect(AsyncStorage.getItem).toBeCalledWith('@key1');

    });

    it(' checks my async Storage.getItem mocked method', async () => {

        expect(AsyncStorage.getItem('@key1')).toStrictEqual(fakeStore['@key1']);
        expect(AsyncStorage.getItem('@key2')).toStrictEqual(fakeStore['@key2']);
        expect(AsyncStorage.getItem('@key1231231')).toBe(null); 

    })

    it(' should validate my initializingCreateStorage method ', async () => {

        const newData = {
            Portugues:[],
            ingles:[], 
            Matemática:[],
            Atualidades_do_Mercado_Financeiro:[],
            prob_e_estatística:[],
            Conh_Bancários:[],
            Tecnologia_da_informação:[]
        }

        const storage1 = new myStorageClass('@key1',null,'ingles');
        expect(await storage1.initializingCreateStorage()).toStrictEqual(JSON.parse(fakeStore['@key1']));

        const storage2 = new myStorageClass('@key2',null,'ingles');
        expect(await storage2.initializingCreateStorage()).toStrictEqual(JSON.parse(fakeStore['@key2']));

        const storage3 = new myStorageClass('@keyThatDoesNotExistInMyStore',null,'ingles');
        expect(await storage3.initializingCreateStorage()).toStrictEqual(newData);

        expect(AsyncStorage.setItem).toBeCalledWith('@keyThatDoesNotExistInMyStore',JSON.stringify(newData));


    })



})