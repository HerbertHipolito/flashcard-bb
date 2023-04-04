import React from 'react';
//import renderer from 'react-test-renderer';
import {handleSubmit, RegexValidation, checkSameQuestion, materiaTransformada} from '../newCardFunctions'
import transformarKeys from '../../../data/transformarKeys'

describe('RegexValidation', () => {
    
  it('should test the Regex function',()=>{
    
    expect(RegexValidation('')).toBe(false)
    expect(RegexValidation('dasdia339820fe')).toBe(true)
    expect(RegexValidation('12312e21:ç~]ç[[´çç[')).toBe(true)
    expect(RegexValidation("!@#$%^&*()_+-=")).toBe(false) // only non-alphanumeric characters
    expect(RegexValidation("你好世界")).toBe(false) // non-Latin script characters

  })

})

describe('Submit validation', () => {

  const currentCards = {
    Portugues:[],
    ingles:[{'adas':'23123'}], 
    Matemática:[],
    Atualidades_do_Mercado_Financeiro:[],
    prob_e_estatística:[],
    Conh_Bancários:[],
    Tecnologia_da_informação:[]
  }

  it(' should test the handleSubmit function',() => { //Validate the input size.

    expect(handleSubmit('daweaw','daqweqfdasdasfd',currentCards,'ingles')).toStrictEqual([true,''])
    expect(handleSubmit('','31231',currentCards,'ingles')).toStrictEqual([false,'Algum ou ambos input estão vazios'])
    expect(handleSubmit('31231','',currentCards,'ingles')).toStrictEqual([false,'Algum ou ambos input estão vazios'])
    expect(handleSubmit('','',currentCards,'ingles')).toStrictEqual([false,'Algum ou ambos input estão vazios'])
    expect(handleSubmit('你好世界','daqweqfdasdasfd',currentCards,'ingles')).toStrictEqual([false,'Alguns dos inputs contêm caracteres inválidos'])

  })

})

describe('materiaTransformada validation', () => {

  it(' should test whether the transformarKeys is maping the correct subjects ',()=>{

    Object.keys(transformarKeys).map(key =>{
      expect(materiaTransformada(transformarKeys,transformarKeys[key])).toBe(key)
    })

  })

})
  

