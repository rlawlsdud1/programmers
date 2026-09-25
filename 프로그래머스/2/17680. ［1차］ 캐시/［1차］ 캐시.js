function solution(cacheSize, cities) {
    let answer = 0;
    
    if(cacheSize === 0) return cities.length * 5
    
    const map = new Map()

    cities.forEach((v) => {
        const city = v.toLowerCase()
        
        if(map.has(city)) {
            answer++
            map.delete(city)
        } else answer += 5
        
        if(map.size === cacheSize) map.delete(map.keys().next().value)
        
        map.set(city, true)
    })
    
    return answer;
}