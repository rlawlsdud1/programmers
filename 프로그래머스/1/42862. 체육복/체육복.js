function solution(n, lost, reserve) {
    const lostArr = Array.from({length : n}).fill(false)
    const reserveArr = Array.from({length : n}).fill(false)
    lost.forEach((v) => {
        lostArr[v-1] = true
    })
    reserve.forEach((v) => {
        reserveArr[v-1] = true
    })
    
    // 잃어버렸는데 여벌이 있다면 잃어버린게 아니고, 여벌 또한 사라짐
    for(let i=0; i<n; i++){
        if(lostArr[i] && reserveArr[i]){
            lostArr[i] = false
            reserveArr[i] = false
        }
    }
    
    // 이제 여벌도 없는데 잃어버린 애들에게 체육복을 빌려줄 수 있는지 체크
    for(let i=0; i<n; i++){
        if(lostArr[i]){
            if(reserveArr[i-1]){
                lostArr[i] = false
                reserveArr[i-1] = false
            }else if(reserveArr[i+1]){
                lostArr[i] = false
                reserveArr[i+1] = false
            }
        }
    }
    
    return lostArr.filter((v) => v === false).length
}