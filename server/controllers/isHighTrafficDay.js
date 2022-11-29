// https://www.officeholidays.com/countries/usa/2023 

function isHighTraffic(day){
    const holidays = {
        "2022-12-25": "Christmas Day", 
        "2023-01-01": "New Year Day", 
        "2023-05-29": "Memorial Day", 
        "2023-07-04": "July 4th",
        "2023-09-04": "Labor Day", 
        "2023-11-10": "Veterans Day", 
        "2023-11-23": "Thanksgiving Day", 
        "2023-12-25": "Christmas Day"}
      
    dateString = day.getFullYear() + '-' + (day.getMonth()+1) + '-' + day.getDate()

    if (dateString in holidays) {
        return true
    }
    
    let dayOfWeek = day.getDay()
    
    //modify dayOfWeek to match with local time
    if (dayOfWeek == 6) {
        dayOfWeek = 0;
    } else {
        dayOfWeek += 1;
    }

    // check if day is a weekend
    if ((dayOfWeek === 6) || (dayOfWeek  === 0)) return true

    // day is neither holiday nor weekend
    return false 
}

//console.log(isHighTraffic(new Date(2022,11,25,12)))

module.exports = isHighTraffic