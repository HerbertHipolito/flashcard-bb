//https://jestjs.io/pt-BR/docs/mock-functions
//https://react-native-async-storage.github.io/async-storage/docs/advanced/jest

import AsyncStorage from '@react-native-async-storage/async-storage';
import {myStorageClass} from '../myStorageClass'
import fakeData from '../data/fakeData' 

AsyncStorage.getItem = jest.fn(key => {

    if (!fakeData.hasOwnProperty(key)) return null
    return fakeData[key]

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

        expect(AsyncStorage.getItem('@key1')).toStrictEqual(fakeData['@key1']);
        expect(AsyncStorage.getItem('@key2')).toStrictEqual(fakeData['@key2']);
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
        expect(await storage1.initializingCreateStorage()).toStrictEqual(JSON.parse(fakeData['@key1']));

        const storage2 = new myStorageClass('@key2',null,'ingles');
        expect(await storage2.initializingCreateStorage()).toStrictEqual(JSON.parse(fakeData['@key2']));

        const storage3 = new myStorageClass('@keyThatDoesNotExistInMyStore',null,'ingles');
        expect(await storage3.initializingCreateStorage()).toStrictEqual(newData);
        
        expect(AsyncStorage.setItem).toBeCalledWith('@keyThatDoesNotExistInMyStore',JSON.stringify(newData));


    })

    
    it(' should validate the loadingCards method', async () =>{

        const storage = new myStorageClass('@key1',null,'ingles');
        
        expect(await storage.loadingCards(false,false)).toStrictEqual(JSON.parse(fakeData['@key1'])['ingles'])
        expect(await storage.loadingCards(false,false)).not.toStrictEqual(JSON.parse(fakeData['@key2'])['ingles'])
        
        storage.subject = 'Conh. Bancários' // testing using another subject

        expect(await storage.loadingCards(false,false)).toStrictEqual(JSON.parse(fakeData['@key1'])['Conh_Bancários'])
        expect(await storage.loadingCards(false,false)).not.toStrictEqual(JSON.parse(fakeData['@key2'])['Conh_Bancários'])

        storage.key = '@keyThatDoesNotExistInMyFakeData' // testing using a non-existent key

        expect(await storage.loadingCards(false,false)).toStrictEqual([])


    })

    it(' should validate the removeCard method', async () =>{

        const storage = new myStorageClass('@key1',null,'ingles');

        expect(await storage.removeCard({'key2':'value2'})).toStrictEqual([{'key1':'value1'},{'key3':'value3'},{'key4':'value4'}])

        storage.subject = 'Conh. Bancários' // testing using another subject with any card registered

        expect(await storage.removeCard({'key2':'value2'})).toStrictEqual([])

        storage.key = '@keyThatDoesNotExistInMyFakeData'

        expect(await storage.removeCard({'key2':'value2'})).toBe(false)

        storage.key = '@key2'
        storage.subject = 'Conh. Bancários'

        expect(await storage.removeCard({'key2':'value2'})).toStrictEqual([{'key1':'value1'}])

    })
    


})