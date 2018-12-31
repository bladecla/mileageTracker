export const JSONtoDateString = date => {
  if (typeof date === "string"){
    const [yyyy, mm, dd] = date.slice(0, 11).split('-').map(n => parseInt(n));
    return new Date(yyyy, mm - 1, dd);
  } else return date;
} 

export const processDate = inputDate => {
    if (typeof inputDate === "string") JSONtoDateString(inputDate)
    let weekdays, day, month, date, year;
    weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    day = weekdays[inputDate.getDay()];
    month = inputDate.getMonth() + 1;
    date = inputDate.getDate();
    year = inputDate.getFullYear();
    return `${day} ${month}-${date}-${year}`;
  }
  
export const stringifyDate = date => {
    function doubleDigits(num){
      if (num.toString().length < 2) num = "0" + num;
      return num;
    };
    return date ? `${date.getFullYear()}-${doubleDigits(date.getMonth() + 1)}-${doubleDigits(date.getDate())}` : "";
  }