const parseDateTimeString = (dateTimeString: string) => {
  const [datePart, timePart] = dateTimeString.split(", ");
  const [day, month, year] = datePart.split(".").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds);
};

export const checkTimeDifference = (
  createdDate: string,
  setIsEditable: (value: boolean) => void
) => {
  const currentDateTime = new Date();
  const stateDateTime = parseDateTimeString(createdDate);

  const timeDifference = currentDateTime.getTime() - stateDateTime.getTime();
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  if (hoursDifference >= 2) {
    setIsEditable(false);
  } else {
    setIsEditable(true);
  }
};
