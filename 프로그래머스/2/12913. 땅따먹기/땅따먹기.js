function solution(land) {
    let prevRow = land[0]
    
    for(let i=1; i<land.length; i++){
        const curRow = Array.from({length : 4})
        for(let j=0; j<4; j++){
            let max = 0
            for(let k=0; k<4; k++){
                if(j !== k) max = Math.max(max, prevRow[k])
            }
            curRow[j] = max + land[i][j]
        }
        prevRow = curRow
    }
    
    return Math.max(...prevRow)

}