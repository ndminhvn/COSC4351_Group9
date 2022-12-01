const isHighTraffic = require('./isHighTrafficDay')

//Cases
newYear = new Date(2023,0,1)
christMas2022 = new Date(2022,11,25)
july4 = new Date(2023,6,4)
weekend1 = new Date(2023,11,3) //Saturday
weekend2 = new Date(2023,2,5)  //Sunday
weekday1 = new Date(2022,11,5) //Monday
weekday2 = new Date(2022,11,8) //Thursday
weekday3 = new Date(2023,0,6)  //Friday

test('Checking against New Year', ()=>{
    expect(isHighTraffic(newYear)).toEqual(true)
})
test('Checking Against Christmas', ()=>{ 
    expect(isHighTraffic(christMas2022)).toEqual(true)
})
test('Checking Against July 4th', ()=>{ 
    expect(isHighTraffic(july4)).toEqual(true)
})
test('Checking Against Saturday', ()=>{  
    expect(isHighTraffic(weekend1)).toEqual(true)
})
test('Checking Against Sunday', ()=>{  
    expect(isHighTraffic(weekend2)).toEqual(true)
})
test('Checking Against Monday', ()=>{   
    expect(isHighTraffic(weekday1)).toEqual(false)
})
test('Checking Against Thursday', ()=>{ 
    expect(isHighTraffic(weekday2)).toEqual(false)
})
test('Checking Against Friday', ()=>{
    expect(isHighTraffic(weekday3)).toEqual(false)
})