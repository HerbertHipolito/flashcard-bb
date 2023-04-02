import transformarKeys from '../../data/transformarKeys'

export const materiaTransformada = (transformarKeys,subject) =>{

    let keyTransformada = null

    for(key in transformarKeys) {
        if(transformarKeys[key] === subject){
            keyTransformada = key
            break
        }
    }

    return keyTransformada
}

export const checkSameQuestion = (question, currentCards, subject) =>{

    let cardExist = false
    console.log(currentCards[materiaTransformada(transformarKeys,subject)])
    for (card of currentCards[materiaTransformada(transformarKeys,subject)]){
        if(Object.keys(card)[0] === question){
            cardExist = true
            break
        }
    }
    return cardExist

}

export const RegexValidation = (input) => {
    let regex = /[A-Za-z0-9]/;
    return regex.test(input);
}

export const handleSubmit = (questionInput, answerInput, setValidationInput, currentCards, subject) =>{

    var passed = true

    if(!questionInput || !answerInput) passed = false
    else if(questionInput.length > 180 || answerInput.length > 250) passed = false
    else if(checkSameQuestion(questionInput,currentCards,subject)) passed = false //check for duplicate question
    else if(!RegexValidation(questionInput) || !RegexValidation(answerInput)) passed = false

    if(!passed) setValidationInput(passed)

    return passed

}
