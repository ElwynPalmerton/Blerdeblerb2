
function getDateAgo(current, days) {
  let dateCopy = new Date(current);
  // console.log(dateCopy);
  dateCopy.setDate(current.getDate() - days);
  return dateCopy;
}

function getHoursAgo(current, hours) {
  let dateCopy = new Date(current);
  // console.log(dateCopy);
  dateCopy.setHours(current.getHours() - hours);
  return dateCopy;
}

function getMinutesAgo(current, minutes) {
  let dateCopy = new Date(current);
  // console.log(dateCopy);
  dateCopy.setMinutes(current.getMinutes() - minutes);
  return dateCopy;
}


module.exports = { getDateAgo, getHoursAgo, getMinutesAgo };