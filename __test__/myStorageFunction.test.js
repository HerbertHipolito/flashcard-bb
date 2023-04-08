function getAnElementFromArrayRandomly(array) {

    if(array.length===0) return null;
    return  array[Math.round(Math.random() * (array.length-1) )]
    
}

describe('StorageFunction class validation', ()=>{

    it(' should validate my generate random card function',()=>{

        expect( getAnElementFromArrayRandomly([]) ).toBe(null)
        expect( getAnElementFromArrayRandomly([5]) ).toBe(5)

    })

})