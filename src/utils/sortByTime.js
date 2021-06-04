function sortByTime(activity, nextActivity) {
  return Number(activity[0]) - Number(nextActivity[0]);
}

export default sortByTime;
