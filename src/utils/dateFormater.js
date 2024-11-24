export function convertTo24HourFormat(isoString) {
  const date = new Date(isoString); // Create a Date object from the ISO string

  // Get hours, minutes, and seconds
  let hours = date.getHours(); // 24-hour format
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Format the hours, minutes, and seconds as 2-digit numbers
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  // Combine into the HH:MM:SS format
  return `${hours}:${minutes}`;
}
