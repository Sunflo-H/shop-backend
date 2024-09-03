function transformDate(newDate) {
  const isoString = newDate.toISOString();
  const [date, time] = isoString.split("T");
  const dateAndTime = `${date} ${time.substring(0, 8)}`;
  return dateAndTime;
}

module.exports = {
  transformDate,
};
