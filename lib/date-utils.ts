export const getDay = (dateObj: Date) =>
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dateObj.getDay()];

export const getMonth = (dateObj: Date) =>
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][dateObj.getMonth()];

export const getDate = (dateObj: Date) =>
  dateObj.getDate().toString().padStart(2, "0");

export const getHours = (dateObj: Date, is24Hour: boolean) => {
  const hh = dateObj.getHours();
  return is24Hour
    ? hh.toString().padStart(2, "0")
    : (hh % 12 || 12).toString().padStart(2, "0");
};

export const getMinutes = (dateObj: Date) =>
  dateObj.getMinutes().toString().padStart(2, "0");

export const getAMPM = (dateObj: Date, is24Hour: boolean) => {
  const hh = dateObj.getHours();
  return is24Hour ? "" : hh > 11 ? " PM" : " AM";
};

export const terminalDateFormat = (dateObj: Date) => {
  const is24Hour = false;
  return `${getMonth(dateObj)} ${getDate(dateObj)} ${getHours(
    dateObj,
    is24Hour
  )}:${getMinutes(dateObj)}`;
};
