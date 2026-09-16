function solution(phone_book) {
    phone_book.sort()
    const n = phone_book.length
    
    for(let i = 1; i < n; i++){
        const prev = phone_book[i - 1]
        const cur = phone_book[i]
        
        if(cur.startsWith(prev)) return false
    }
    
    return true
}