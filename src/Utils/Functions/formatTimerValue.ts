/** Prepends single digit vals with 0 for display reasons */
export const formatTimerValue = (value: number): string => {
  return value < 10 ? `0${value}` : value.toString();
};
