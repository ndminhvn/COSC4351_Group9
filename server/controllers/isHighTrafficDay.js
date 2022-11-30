/*
Input: an Date object
Output: return true if day falls within Saturday, Sunday or a holiday.
Holiday dates: https://www.officeholidays.com/countries/usa/2023
*/

function isHighTraffic(dayObj){

    day = dayObj.toDateString()

    holidays = [
        new Date(2023,11,25).toDateString(), //Christmas
        new Date(2023,10,23).toDateString(), //Thanksgiving
        new Date(2023,10,10).toDateString(), //Veteran day
        new Date(2023,8,4).toDateString(),   //Labor Day
        new Date(2023,6,4).toDateString(),   //July 4th
        new Date(2023,4,29).toDateString(),  //Memorial Day
        new Date(2023,0,1).toDateString(),   //New year
        new Date(2022,11,25).toDateString()  //Christmas
    ]

    //check holiday
    if (holidays.includes(day)) {
        return true
    }

    //check weekend
    if(day.substring(0,3) == 'Sat' || day.substring(0,3) == 'Sun') return true 

    //weekday
    return false 
}

module.exports = isHighTraffic