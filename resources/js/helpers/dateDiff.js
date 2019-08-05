export const dateDiff = (startDate, endDate) => {
  const dims = [1, -2, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1];
  let daysLen = 0;
  if (endDate.getDate() - startDate.getDate() < 0) {
    let month = endDate.getMonth() - 1;
    if (month < 0) month = 11;
    daysLen = dims[month];
    if ((month === 1) && (endDate.getFullYear() % 4 === 0))
      daysLen++;
  }

  const startDays = calcDays(startDate);
  const endDays = calcDays(endDate);

  const diff = endDays - startDays;
  const years = Math.floor(diff / 360);
  let months = Math.floor((diff - years * 360) / 30);
  let days = diff - years * 360 - months * 30 + daysLen;

  if (startDate.getDate() === 1 && endDate.getDate() === 31) {
    months--;
    days = 30;
  }

  function calcDays(date) {
    return date.getFullYear() * 360
      + date.getMonth() * 30
      + date.getDate()
  }

  return { years, months, days };
}