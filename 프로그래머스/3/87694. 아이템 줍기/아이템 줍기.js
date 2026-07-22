function solution(rectangle, characterX, characterY, itemX, itemY) {
    let answer = 0;
    
    const path = new Set()
    const restrictedPath = new Set()
    
    rectangle.forEach((v) => {
        const [x1, y1, x2, y2] = v
        
        for(let x = x1; x <= x2; x += 0.5){
            for(let y = y1; y <= y2; y += 0.5){
                const coordinate = `${x},${y}`
                if(x == x1 || y == y1 || x == x2 || y == y2){
                    if(!restrictedPath.has(coordinate)) path.add(coordinate)
                }else{
                    restrictedPath.add(coordinate)
                    if(path.has(coordinate)) path.delete(coordinate)
                }
                
            }
        }
    })
    
    const directions = [[0.5, 0], [-0.5, 0], [0, 0.5], [0, -0.5]]
    
    const queue = []
    queue.push([characterX, characterY, 0])
    
    const visited = new Set()
    visited.add(`${characterX},${characterY}`)
    
    while(queue.length){
        const [x, y, count] = queue.shift()
        
        if(x == itemX && y == itemY){
            return count / 2
        }
        
        for(const direction of directions){
            const [nx, ny] = [x + direction[0], y + direction[1]]
            
            const coordinate = `${nx},${ny}`
            
            if(path.has(coordinate) && !visited.has(coordinate)){
                visited.add(coordinate)
                queue.push([nx, ny, count + 1])
            }
        }
    }
    
    return answer;
}

