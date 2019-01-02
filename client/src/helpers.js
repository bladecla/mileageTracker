import { LOGOUT } from './redux/actions/types';

// convert dates from JSON strings used in API to Date object
export const JSONtoDateObject = date => {
  if (typeof date === "string"){
    const [yyyy, mm, dd] = date.slice(0, 11).split('-').map(n => parseInt(n));
    return new Date(yyyy, mm - 1, dd);
  } else return date;
} 

// convert from Date object to string formatted to be displayed
export const processDate = inputDate => {
    if (typeof inputDate === "string") JSONtoDateObject(inputDate)
    let weekdays, day, month, date, year;
    weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    day = weekdays[inputDate.getDay()];
    month = inputDate.getMonth() + 1;
    date = inputDate.getDate();
    year = inputDate.getFullYear();
    return `${day} ${month}-${date}-${year}`;
  }
  
// convert Date object to string formatted to be value for <input type=date/>
export const stringifyDate = date => {
    function doubleDigits(num){
      if (num.toString().length < 2) num = "0" + num;
      return num;
    };
    return date ? `${date.getFullYear()}-${doubleDigits(date.getMonth() + 1)}-${doubleDigits(date.getDate())}` : "";
  }

// format raw JSON trip objects for use in app state
  export const cleanTrips = trips => {
    const cleanTrip = trip => {
      trip.start = +trip.start;
      trip.end = +trip.end;
      trip.date = JSONtoDateObject(trip.date);
      return trip;
    };
    if (Array.isArray(trips)) return trips.map(cleanTrip);
    return cleanTrip(trips);
  }

// catch custom request error responses and logout if auth fails
  export const success = (status, dispatch) => {
    if (!status) return true;
    if (status === 401){
      console.log("dispatching logout")
      dispatch({ type: LOGOUT });
      return false;
    }
    else if (status === 404){
      console.log("Not found")
      return false;
    }
    console.log("Misc. error: ", status)
    return true;
  }