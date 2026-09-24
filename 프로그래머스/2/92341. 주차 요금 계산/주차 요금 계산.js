function solution(fees, records) {
    function convert_time(time) {
        const [hour, minute] = time.split(':').map(Number)
        
        return hour * 60 + minute
    }
    
    function caculate_fee(time, fees) {
        const [default_time, default_fee, unit_time, unit_fee] = fees
        
        if(default_time >= time) {
            return default_fee
        }else {
            return default_fee + Math.ceil((time - default_time) / unit_time) * unit_fee
        }
    }
    
    
    const answer = [];
    
    const cumulative_time = {}
    
    const out_in_record = {}
    
    records.forEach((v) => {
        const [time, car_num, info] = v.split(' ')
        
        if(info === 'OUT') {
            const difference = convert_time(time) - out_in_record[car_num]
            
            cumulative_time[car_num] ? cumulative_time[car_num] += difference : cumulative_time[car_num] = difference
            
            delete out_in_record[car_num]
        }else {
            out_in_record[car_num] = convert_time(time)
        }
    })
    
    const result = []

    Object.entries(out_in_record).forEach(([key, value]) => {
        const last_time = 60 * 23 + 59
        cumulative_time[key] ? cumulative_time[key] += last_time - value : cumulative_time[key] = last_time - value
    })
    
    Object.entries(cumulative_time).forEach(([key, value]) => {
        result.push([key, caculate_fee(value, fees)])
    })
    
    result.sort((a, b) => a[0] - b[0])
    
    return result.map((v) => v[1])
}