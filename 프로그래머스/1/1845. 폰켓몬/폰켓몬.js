function solution(nums) {
    const poketmonObj = {}
    nums.forEach((v) =>{
        poketmonObj[v] ? poketmonObj[v] += 1 : poketmonObj[v] = 1
    })
    const typeNum = Object.keys(poketmonObj).length
    
    return Math.min(nums.length / 2, typeNum)
}