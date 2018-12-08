export const processDate = (inputDate) => {
    let weekdays, day, month, date, year;
    weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    day = weekdays[inputDate.getDay()];
    month = inputDate.getMonth() + 1;
    date = inputDate.getDate();
    year = inputDate.getFullYear();
    return `${day} ${month}-${date}-${year}`;
  }
  
export const stringifyDate = (date) => {
    function doubleDigits(num){
      if (num.toString().length < 2) num = "0" + num;
      return num;
    };
    return date ? `${date.getFullYear()}-${doubleDigits(date.getMonth() + 1)}-${doubleDigits(date.getDate())}` : "";
  }