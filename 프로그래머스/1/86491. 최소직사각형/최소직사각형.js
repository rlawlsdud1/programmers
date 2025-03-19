function solution(sizes) {
    let width = 0
    let height = 0
    sizes.forEach((v) => {
        v = v.sort((a,b) => a - b)
    })
    sizes.forEach((v) => {
        const [a, b] = v
        width = Math.max(width, a)
        height = Math.max(height, b)
    })
    
    return width * height
}
// 모두 수납할 수 있어야 하고, 가장 작아야 한다.