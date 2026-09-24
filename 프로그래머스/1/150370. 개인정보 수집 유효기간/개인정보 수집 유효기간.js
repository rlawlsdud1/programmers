function solution(today, terms, privacies) {
    function convert_date(date) {
        const [year, month, day] = date.split('.').map(Number)
        
        return (year - 1) * 12 * 28 + (month - 1) * 28 + day
    }
    
    function validate_period(date, today, expiration_period) {
        if(convert_date(today) - convert_date(date) >= expiration_period) return false
        
        return true
    }
    
    const terms_info = {}
    terms.forEach((v) => {
        const [type, month] = v.split(' ')
        terms_info[type] = Number(month) * 28
    })
    
    const answer = [];
    
    privacies.forEach((v, i) => {
        const [date, type] = v.split(' ')
        if(!validate_period(date, today, terms_info[type])) answer.push(i + 1)
    })
    
    
    return answer;
}