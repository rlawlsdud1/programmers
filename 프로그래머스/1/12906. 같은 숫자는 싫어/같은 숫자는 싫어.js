function solution(arr)
{
    const stack = []
    for(let i = 0; i < arr.length-1; i++){
        // while(stack.at(-1) === arr[i]){
        //     stack.pop()
        // }
        // stack.push(arr[i])
        if(arr[i] !== arr[i+1]) stack.push(arr[i])
    }
    stack.push(arr.at(-1))
    return stack
}