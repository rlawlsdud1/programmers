function solution(friends, gifts) {
    var answer = 0;
    const countOfFriends = friends.length
    const nameObj = {}
    friends.forEach((name, index) => {
        nameObj[name] = index
    })
    
    const giftTable = Array.from({length:countOfFriends}, ()=>
                                 Array.from({length:countOfFriends}).fill(0)
                                )
    gifts.forEach((v) => {
        const [from, to] = v.split(' ')
        giftTable[nameObj[from]][nameObj[to]] += 1
    })
    
    const giftObj = [] // 선물 지수
    for(let i=0; i<countOfFriends; i++){
        giftObj[i] = [0, 0]
        
        giftObj[i][0] += giftTable[i].reduce((acc, cur) => acc + cur, 0)
    }

    for(let j=0; j<countOfFriends; j++){
        let count = 0
        for(let i=0; i<countOfFriends; i++){
            count += giftTable[i][j]
        }
        giftObj[j][1] = count
    }
    
    for(let i=0; i<countOfFriends; i++){
        giftObj[i] = giftObj[i][0] - giftObj[i][1]
    }
    
    const nextMonthGift = Array.from({length:countOfFriends}).fill(0)
    
    for(let i=0; i<countOfFriends; i++){
        for(let j=i+1; j<countOfFriends; j++){
            const a = giftTable[i][j]
            const b = giftTable[j][i]
            
            if((a>0 || b>0) && a !== b){
                if(a>b){
                    nextMonthGift[i] += 1
                }else if(a<b){
                    nextMonthGift[j] += 1
                }
            }else{
                if(giftObj[i]>giftObj[j]){
                    nextMonthGift[i] += 1
                }else if(giftObj[i]<giftObj[j]){
                    nextMonthGift[j] += 1
            }       
            }
        }
    }

    return Math.max(...nextMonthGift);
}