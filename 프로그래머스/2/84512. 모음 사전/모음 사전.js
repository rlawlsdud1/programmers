function solution(word) {
    const vowels = ['A', 'E', 'I', 'O', 'U']
    const dictionary = []
    
    function BT(word) {
        for(let i = 0; i < 5; i++) {
            if(word.length <= 4){
                const next = word + vowels[i]
                dictionary.push(next)  
                BT(next)    
            }
        }
    }
    
    BT('')
    
    return dictionary.findIndex((v) => v === word) + 1
}