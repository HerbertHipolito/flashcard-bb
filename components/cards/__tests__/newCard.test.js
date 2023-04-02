import React from 'react';
//import renderer from 'react-test-renderer';
import {handleSubmit, RegexValidation, checkSameQuestion, materiaTransformada} from '../newCardFunctions'
import transformarKeys from '../../../data/transformarKeys'

describe('RegexValidation', () => {
    
  it('Test RegexValidation',()=>{
    
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

  it('Test submit validation',() => {

    expect(handleSubmit('daweaw','daqweqfdasdasfd',()=>null,currentCards,'ingles')).toBe(true)
    expect(handleSubmit('','31231',()=>null,currentCards,'ingles')).toBe(false)
    expect(handleSubmit('31231','',()=>null,currentCards,'ingles')).toBe(false)
    expect(handleSubmit('','',()=>null,currentCards,'ingles')).toBe(false)
    expect(handleSubmit('你好世界','daqweqfdasdasfd',()=>null,currentCards,'ingles')).toBe(false)

  })

})

describe('materiaTransformada validation', () => {

  it('test materiaTransformada',()=>{

    Object.keys(transformarKeys).map(key =>{
      expect(materiaTransformada(transformarKeys,transformarKeys[key])).toBe(key)
    })

  })

})
  

